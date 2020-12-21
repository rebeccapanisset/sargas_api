const TankType = use('App/Models/TankType');

class TankTypeController {
  async index({ request }) {
    const { filter = '' } = request.get();

    const types = await TankType.query()
      .where('type', 'ILIKE', `%${filter}%`)
      .fetch();

    return types;
  }

  async show({ params, response }) {
    try {
      const type = await TankType.findOrFail(params.id);

      return type;
    } catch (error) {
      return response.status(error.status || 500).send({
        error: {
          message: 'Ocorreu um erro! Tipo de tanque não encontrado!',
        },
      });
    }
  }

  /**
   * async find({ request }) {
   *   const { filter = '' } = request.get();
   *
   *   const type = await TankType.query()
   *     .where('type', 'ILIKE', `%${filter}%`)
   *     .first();
   *
   *   return type;
   * }
   */
}

module.exports = TankTypeController;
