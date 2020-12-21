// Models
const File = use('App/Models/File');
const Budget = use('App/Models/Budget');

// Adonis Libs
const Database = use('Database');
const Helpers = use('Helpers');

// Node.js Libs
const fs = require('fs');

const generate = use('App/Utils/PdfGenerator');

const productTypes = new Map([
  [1, 'fuelTank'],
  [2, 'pipaTank'],
  [3, 'aerialTank'],
  [4, 'waterTank'],
]);

class BudgetController {
  async index({ request }) {
    const { filter, status, type = '', page, pagination = 10 } = request.get();

    const budgets = await Budget.query()
      .select(
        'budgets.id',
        'clients.name as client',
        'budgets.created_at',
        'products.description as product',
        'budgets.status',
        'budgets.pdf_id'
      )
      .leftJoin('tank_types', 'budgets.type_id', 'tank_types.id')
      .innerJoin('clients', 'budgets.client_id', 'clients.id')
      .innerJoin('products', 'budgets.product_id', 'products.id')
      .where('tank_types.type', 'ILIKE', `%${type}%`)
      .where((builder) => {
        if (filter) {
          builder.where('budgets.id', filter);
        }
      })
      .where((builder) => {
        if (status) {
          builder.where('budgets.status', status);
        }
      })
      .where((builder) => {
        builder.whereNot('budgets.status', 'A');
      })
      .orderBy('budgets.id', 'desc')
      .paginate(page, pagination);

    return budgets;
  }

  async store({ auth, request, response }) {
    const {
      delivery_days,
      compartment_position,
      amount,
      requester,
      total,
      notes,
      type_id,
      client_id,
      product_id,
      truck_id,
      sale_type_id,
      payment_method_id,
      accessories,
      pdf_type_id,
    } = request.all();

    const trx = await Database.beginTransaction();

    try {
      const budget = await Budget.create(
        {
          discontinued: false,
          delivery_days,
          status: 'W',
          compartment_position,
          amount,
          requester,
          total,
          notes,
          type_id,
          client_id,
          product_id,
          truck_id,
          user_id: auth.user.id,
          sale_type_id,
          payment_method_id,
        },
        trx
      );

      await budget.save(trx);

      if (accessories && accessories.length > 0) {
        await budget.accessories().attach(accessories, null, trx);
      }

      // Geração do PDF
      const { fileName, path } = await generate({
        budget,
        accessoriesIds: accessories,
        pdfTypeId: pdf_type_id,
        docType: 'budget',
      });

      const file = await File.create(
        {
          file: `${path}/${fileName}`,
          name: fileName,
          type: 'application',
          subtype: 'pdf',
        },
        trx
      );

      await trx.commit();

      budget.pdf().associate(file);

      return budget;
    } catch (error) {
      // TODO: Excluir o arquivo do PDF criado
      await trx.rollback();
      if (error.detail) {
        if (error.detail.indexOf('client_id') !== -1) {
          return response.status(500).send({
            error: {
              message: 'Ocorreu um erro! O cliente informado não existe!',
            },
          });
        }
        if (error.detail.indexOf('product_id') !== -1) {
          return response.status(500).send({
            error: {
              message: 'Ocorreu um erro! O produto informado não existe!',
            },
          });
        }
        if (error.detail.indexOf('truck_id') !== -1) {
          return response.status(500).send({
            error: {
              message: 'Ocorreu um erro! O caminhão informado não existe!',
            },
          });
        }
        if (error.detail.indexOf('sale_type_id') !== -1) {
          return response.status(500).send({
            error: {
              message: 'Ocorreu um erro! O tipo de venda informado não existe!',
            },
          });
        }
        if (error.detail.indexOf('payment_method_id') !== -1) {
          return response.status(500).send({
            error: {
              message:
                'Ocorreu um erro! A forma de pagamento informada não existe!',
            },
          });
        }
        if (error.detail.indexOf('accessory_id') !== -1) {
          return response.status(500).send({
            error: {
              message:
                'Ocorreu um erro! Um dos acessórios informados não existe!',
            },
          });
        }
      }
      return response.status(error.status || 500).send({
        error: {
          message: 'Ocorreu um erro!',
        },
      });
    }
  }

  async show({ params, response }) {
    try {
      const budget = await Budget.findOrFail(params.id);

      await budget.loadMany([
        'client.phones',
        'truck',
        `product.${productTypes.get(budget.type_id)}`,
        'user',
        'saleType',
        'paymentMethod',
        'accessories',
      ]);

      return budget;
    } catch (error) {
      return response.status(error.status || 500).send({
        error: {
          message: 'Ocorreu um erro! Orçamento não encontrado!',
        },
      });
    }
  }

  async update({ auth, params, request, response }) {
    const {
      delivery_days,
      compartment_position,
      amount,
      requester,
      total,
      notes,
      type_id,
      product_id,
      truck_id,
      sale_type_id,
      payment_method_id,
      accessories,
      pdf_type_id,
    } = request.all();

    const trx = await Database.beginTransaction();

    try {
      // Pega dados do banco
      const budget = await Budget.findOrFail(params.id);
      const pdf = await File.findOrFail(budget.pdf_id);

      const oldPDF = pdf.file;

      await budget.merge(
        {
          delivery_days,
          status: 'W',
          compartment_position,
          amount,
          requester,
          total,
          notes,
          type_id,
          product_id,
          truck_id,
          // user_id: auth.user.id, // Ver a melhor forma de fazer!
          sale_type_id,
          payment_method_id,
        },
        trx
      );

      await budget.save(trx);

      if (accessories && accessories.length > 0) {
        await budget.accessories().sync(accessories, null, trx);
      }

      // Geração do PDF
      const { fileName, path } = await generate({
        budget,
        accessoriesIds: accessories,
        pdfTypeId: pdf_type_id,
        docType: 'budget',
      });

      // Update do PDF
      await pdf.merge(
        {
          file: `${path}/${fileName}`,
          name: fileName,
        },
        trx
      );

      await pdf.save(trx);

      await trx.commit();

      // Deleta o arquivo do PDF antigo
      fs.unlinkSync(Helpers.tmpPath(`/uploads/files/${oldPDF}`));

      return budget;
    } catch (error) {
      // TODO: Excluir o arquivo do PDF criado
      await trx.rollback();
      if (error.detail) {
        if (error.detail.indexOf('product_id') !== -1) {
          return response.status(500).send({
            error: {
              message: 'Ocorreu um erro! O produto informado não existe!',
            },
          });
        }
        if (error.detail.indexOf('truck_id') !== -1) {
          return response.status(500).send({
            error: {
              message: 'Ocorreu um erro! O caminhão informado não existe!',
            },
          });
        }
        if (error.detail.indexOf('sale_type_id') !== -1) {
          return response.status(500).send({
            error: {
              message: 'Ocorreu um erro! O tipo de venda informado não existe!',
            },
          });
        }
        if (error.detail.indexOf('payment_method_id') !== -1) {
          return response.status(500).send({
            error: {
              message:
                'Ocorreu um erro! A forma de pagamento informada não existe!',
            },
          });
        }
        if (error.detail.indexOf('accessory_id') !== -1) {
          return response.status(500).send({
            error: {
              message:
                'Ocorreu um erro! Um dos acessórios informados não existe!',
            },
          });
        }
      }
      return response.status(error.status || 500).send({
        error: {
          message: 'Ocorreu um erro!',
        },
      });
    }
  }

  async destroy({ params, response }) {
    const trx = await Database.beginTransaction();

    try {
      const budget = await Budget.findOrFail(params.id);

      const pdf = await File.findOrFail(budget.pdf_id);

      // Deleta o arquivo de PDF
      fs.unlinkSync(Helpers.tmpPath(`/uploads/files/${pdf.file}`));

      await pdf.delete(trx);

      await budget.delete(trx);
    } catch (error) {
      response.status(error.status || 500).send({
        error: {
          message: 'Ocorreu um erro! Acessório não encontrado!',
        },
      });
    }
  }
}

module.exports = BudgetController;
