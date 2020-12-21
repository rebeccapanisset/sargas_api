const Budget = use('App/Models/Budget');
const Contract = use('App/Models/Contract');
const Job = use('App/Jobs/ContractEmail');

const Database = use('Database');
const Kue = use('Kue');

const generate = use('App/Utils/PdfGenerator');

class ContractController {
  async store({ auth, request, response }) {
    const {
      budget_id,
      financing_type,
      // Particual
      installments_num, // acho q n precisa
      payment_1, // payment
      payment_2, // payment
      installments, // array de payments
      // FINAME
      private_value,
      finance_value,
      // Financiado
      finance_type,
      // Tipo de PDF
      pdf_type,
    } = request.all();
    // um pagamento será um objeto no formato:
    // payment: { value, due_date }

    const trx = await Database.beginTransaction();

    try {
      const budget = await Budget.find(budget_id);
      const { type_id } = budget;

      const client = await budget.client().fetch();
      const pdf = await budget.pdf().fetch();

      budget.merge({ status: 'A' }, trx);

      await budget.save(trx);

      const contract = await Contract.create(
        {
          budget_id,
          type_id,
          user_id: auth.user.id,
        },
        trx
      );

      // Geração do PDF
      const { fileName, path } = await generate({
        budget,
        pdfTypeId: pdf_type,
        docType: 'contract',
        contract: {
          financing_type,
          installments_num,
          payment_1,
          payment_2,
          installments,
          private_value,
          finance_value,
          finance_type,
        },
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

      // Envia o e-mail
      if (pdf) {
        Kue.dispatch(
          Job.key,
          {
            budget_id,
            email: client.email,
            name: client.name,
            filePath: pdf.file,
          },
          { attempts: 3 } // tenta enviar o e-mail 3 vezes
        );
      } else {
        console.log('File n existe!');
      }

      return contract;
    } catch (error) {
      await trx.rollback();
      return response.status(error.status || 500).send({
        error: {
          message: 'Ocorreu um erro!',
        },
      });
    }
  }
}

module.exports = ContractController;
