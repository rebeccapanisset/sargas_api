const AerialTank = use('App/Models/AerialTank');
const Product = use('App/Models/Product');

const Database = use('Database');

class AerialTankController {
  async index({ request }) {
    const { filter = '', page, pagination = 10 } = request.get();

    const tanks = await AerialTank.query()
      .select(
        'aerial_tanks.id',
        'products.description',
        'products.price',
        'aerial_tanks.volume',
        'aerial_tanks.length',
        'aerial_tanks.diameter',
        'aerial_tanks.product_id'
      )
      .leftJoin('products', 'aerial_tanks.product_id', 'products.id')
      .where('products.description', 'ILIKE', `%${filter}%`)
      .orderBy('aerial_tanks.id', 'desc')
      .paginate(page, pagination);

    return tanks;
  }

  async store({ request, response }) {
    const trx = await Database.beginTransaction();

    try {
      const {
        datatype,
        description,
        price,
        image_id,
        volume,
        length,
        diameter,
      } = request.all();

      const product = await Product.create(
        {
          datatype,
          description,
          price,
          image_id: image_id || null,
        },
        trx
      );

      const tank = await product
        .aerialTank()
        .create({ volume, length, diameter }, trx);

      await trx.commit();
      return {
        tank,
        product,
      };
    } catch (error) {
      await trx.rollback();
      return response.status(error.status || 500).send({
        error: {
          message: 'Ocorreu um erro! Falha ao cadastrar tanque',
        },
      });
    }
  }

  // Recebe o id do Aéreo
  async show({ params, response }) {
    try {
      const tank = await AerialTank.findOrFail(params.id);

      return tank;
    } catch (error) {
      return response.status(error.status || 500).send({
        error: {
          message: 'Ocorreu um erro! Tanque não encontrado!',
        },
      });
    }
  }

  // Recebe o id do PRODUTO
  async update({ params, request, response }) {
    const trx = await Database.beginTransaction();

    try {
      const product = await Product.findOrFail(params.id);
      const { datatype, description, price, image_id, volume } = request.all();

      if (product.datatype !== 'aerial_tank') throw new Error();

      product.merge(
        {
          datatype,
          description,
          price,
          image_id: image_id || null,
        },
        trx
      );
      await product.save();

      const tank = await product.aerialTank().update({ volume }, trx);

      await trx.commit();

      return {
        tank,
        product,
      };
    } catch (error) {
      await trx.rollback();
      return response.status(error.status || 500).send({
        error: {
          message: 'Ocorreu um erro! Tanque não encontrado!',
        },
      });
    }
  }
}

module.exports = AerialTankController;
