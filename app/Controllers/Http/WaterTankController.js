/* Importa a Model WaterTank */
const WaterTank = use('App/Models/WaterTank');
/* Importa a Model Product */
const Product = use('App/Models/Product');
/* Importa a biblioteca Database para utilizar a função Transaction */
const Database = use('Database');

class WaterTankController {
  async index({ request }) {
    /* Recupera,  por desestrturação, os dados da requisição - request - filter (se houver),
    page e pagination */
    const { filter = '', page, pagination = 10 } = request.get();
    /* Busca no banco, os dados de water-tanks relacionados com products onde
    description  corresponda ao filter. Se filter for vazio busca todos os
    registros do relacionamento */
    const tanks = await WaterTank.query()
      .select(
        'water_tanks.id',
        'products.description',
        'products.price',
        'water_tanks.volume',
        'water_tanks.product_id'
      )
      .leftJoin('products', 'water_tanks.product_id', 'products.id')
      .where('products.description', 'ILIKE', `%${filter}%`)
      .orderBy('water_tanks.id', 'desc')
      .paginate(page, pagination);

    return tanks;
  }

  async store({ request, response }) {
    /* Inicia a transação que permitirá inserir dados em water-tanks e
    products com segurança */
    const trx = await Database.beginTransaction();

    try {
      /* Recupera, por desestrturação, os dados passados pela request */
      const { datatype, description, price, image_id, volume } = request.all();
      /* Cria o registro em products */
      const product = await Product.create(
        {
          datatype,
          description,
          price,
          image_id: image_id || null,
        },
        trx
      );
      /* Cria o registro em water-tank por meio do relacionamento waterTank da
      model Product */
      const tank = await product.waterTank().create({ volume }, trx);
      /* Se tudo correu bem, confirma a inserção e finalização a transação */
      await trx.commit();

      return { tank, product };
    } catch (error) {
      /* Se ocorreu algum erro, volta o banco ao estado anterior ao inicio
      da transação e retorna o erro */
      trx.rollback();

      return response.status(error.status || 500).send({
        error: {
          message: 'Ocorreu um erro! Falha ao cadastrar Caixa D`Água!',
        },
      });
    }
  }

  async show({ params, response }) {
    /* recupera a caixa d`água pelo id passado em params e retorna caso
    encontre. Caso não encontre, retorna erro */
    try {
      const tank = await WaterTank.findOrFail(params.id);

      return tank;
    } catch (error) {
      return response.status(error.status || 500).send({
        error: {
          message: 'Ocorreu um erro! Caixa D`Água não encontrada!',
        },
      });
    }
  }

  async update({ params, request, response }) {
    /* Inicia a transação que permitirá alterar dados em water-tanks e
    products com segurança */
    const trx = await Database.beginTransaction();

    try {
      /* Recupera product pelo id  passado por params */
      const product = await Product.findOrFail(params.id);
      /* Recupera, por desestrturação, os dados passado pela request */
      const { datatype, description, price, image_id, volume } = request.all();
      /* Se product não for do datatype water_tank, retorna erro */
      if (product.datatype !== 'water_tank') throw new Error();
      /* Altera os dados em products e salva */
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
      /* Atualiza os dados em water-tanks por meio do relacionamento
        waterTank da model Product */
      const tank = await product.waterTank().update({ volume }, trx);
      /* Se tudo correu bem, confirma a inserção e finalização a transação */
      await trx.commit();

      return { tank, product };
    } catch (error) {
      /* Se ocorreu algum erro, volta o banco ao estado anterior ao inicio
      da transação e retorna o erro */
      await trx.rollback();

      return response.send({
        error: {
          message: 'Ocorreu um erro! Caixa D`Água não encontrada!',
        },
      });
    }
  }
}

module.exports = WaterTankController;
