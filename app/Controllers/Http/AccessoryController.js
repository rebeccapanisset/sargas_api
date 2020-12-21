const Accessory = use('App/Models/Accessory');

class AccessoryController {
  async index({ request }) {
    const { filter = '', type, page, pagination = 10 } = request.get();

    const accessories = await Accessory.query()
      .distinct()
      .select('accessories.id', 'accessories.name', 'accessories.price')
      .innerJoin(
        'accessory_type',
        'accessories.id',
        'accessory_type.accessory_id'
      )
      .with('types')
      .where((builder) => {
        if (type) {
          builder
            .where('accessories.name', 'ILIKE', `%${filter}%`)
            .where('accessory_type.type_id', type);
        } else {
          builder.where('accessories.name', 'ILIKE', `%${filter}%`);
        }
      })
      .orderBy('accessories.id', 'desc')
      .paginate(page, pagination);

    return accessories;
  }

  async store({ request }) {
    const { name, price, types } = request.all();

    const accessory = await Accessory.create({ name, price });

    if (types && types.length > 0) {
      await accessory.types().attach(types);
      accessory.types = await accessory.types().fetch();
    }

    return accessory;
  }

  async show({ params, response }) {
    try {
      const accessory = await Accessory.findOrFail(params.id);

      await accessory.load('types');

      return accessory;
    } catch (error) {
      return response.status(error.status || 500).send({
        error: {
          message: 'Ocorreu um erro! Acessório não encontrado!',
        },
      });
    }
  }

  async update({ params, request, response }) {
    try {
      const accessory = await Accessory.findOrFail(params.id);

      const { name, price, types } = request.all();

      accessory.merge({ name, price });

      await accessory.save();

      if (types && types.length > 0) {
        await accessory.types().sync(types);
        accessory.types = await accessory.types().fetch();
      }

      return accessory;
    } catch (error) {
      return response.status(error.status || 500).send({
        error: {
          message: 'Ocorreu um erro! Acessório não encontrado!',
        },
      });
    }
  }

  async destroy({ params, response }) {
    try {
      const accessory = await Accessory.findOrFail(params.id);

      await accessory.delete();
    } catch (error) {
      response.status(error.status || 500).send({
        error: {
          message: 'Ocorreu um erro! Acessório não encontrado!',
        },
      });
    }
  }
}

module.exports = AccessoryController;
