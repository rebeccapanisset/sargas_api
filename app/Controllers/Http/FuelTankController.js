const FuelTank = use('App/Models/FuelTank');
const Product = use('App/Models/Product');

const Database = use('Database');

class FuelTankController {
  async index({ request }) {
    const { filter = '', page, pagination = 10 } = request.get();

    const tanks = await FuelTank.query()
      .select(
        'fuel_tanks.id',
        'products.description',
        'products.price',
        'fuel_tanks.volume',
        'fuel_tanks.product_id'
      )
      .leftJoin('products', 'fuel_tanks.product_id', 'products.id')
      .where('products.description', 'ILIKE', `%${filter}%`)
      .orderBy('fuel_tanks.id', 'desc')
      .paginate(page, pagination);

    return tanks;
  }

  async store({ request, response }) {
    const trx = await Database.beginTransaction();

    try {
      const { datatype, description, price, image_id, volume } = request.all();

      const product = await Product.create(
        {
          datatype,
          description,
          price,
          image_id: image_id || null,
        },
        trx
      );

      const tank = await product.fuelTank().create({ volume }, trx);

      await trx.commit();

      return { tank, product };
    } catch (error) {
      trx.rollback();

      return response.status(error.status || 500).send({
        error: {
          message: 'Ocorreu um erro! Falha ao cadastrar o tanque!',
        },
      });
    }
  }

  // Recebe o id do TANQUE
  async show({ params, response }) {
    try {
      const tank = await FuelTank.findOrFail(params.id);

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

      if (product.datatype !== 'fuel_tank') throw new Error();

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

      const tank = await product.fuelTank().update({ volume }, trx);

      await trx.commit();

      return { tank, product };
    } catch (error) {
      await trx.rollback();

      return response.send({
        error: {
          message: 'Ocorreu um erro! Tanque não encontrado!',
        },
      });
    }
  }
}

module.exports = FuelTankController;
