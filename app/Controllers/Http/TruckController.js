const Truck = use('App/Models/Truck');

class TruckController {
  async index({ request }) {
    /* Recupera,  por desestrturação, os dados da requisição - request - filter (se houver),
    page e pagination */
    const { filter = '', page, pagination = 10 } = request.get();
    /* Busca no banco, os dados de clients  onde plate ou brand
    corresponda ao filter. Se filter for vazio busca todos os
    registros */
    const truck = await Truck.query()
      .where('plate', 'ILIKE', `%${filter}%`)
      .orWhere('brand', 'ILIKE', `%${filter}%`)
      .orderBy('id', 'desc')
      .paginate(page, pagination);

    return truck;
  }

  async store({ request }) {
    const data = request.only([
      'plate',
      'brand',
      'model',
      'year',
      'color',
      'chassi',
      'axes_number',
      'between_axes',
    ]);

    const truck = await Truck.create(data);

    return truck;
  }

  async show({ params, response }) {
    try {
      const truck = await Truck.findOrFail(params.id);

      return truck;
    } catch (error) {
      return response.status(error.status || 500).send({
        error: {
          message: 'Ocorreu um erro! Caminhão não encontrado!',
        },
      });
    }
  }

  async update({ params, request, response }) {
    try {
      const truck = await Truck.findOrFail(params.id);

      const data = request.only([
        'plate',
        'brand',
        'model',
        'year',
        'color',
        'chassi',
        'axes_number',
        'between_axes',
      ]);

      truck.merge(data);

      await truck.save();

      return truck;
    } catch (error) {
      return response.status(error.status || 500).send({
        error: {
          message: 'Ocorreu um erro! Caminhão não encontrado!',
        },
      });
    }
  }

  async destroy({ params, response }) {
    try {
      const truck = await Truck.findOrFail(params.id);

      await truck.delete();
    } catch (error) {
      response.status(error.status || 500).send({
        error: {
          message: 'Ocorreu um erro! Caminhão não encontrado!',
        },
      });
    }
  }
}

module.exports = TruckController;
