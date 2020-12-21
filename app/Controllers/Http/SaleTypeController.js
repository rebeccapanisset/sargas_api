const SaleType = use('App/Models/SaleType');

class SaleTypeController {
  async destroy({ params, response }) {
    try {
      const saleType = await SaleType.findOrFail(params.id);

      await saleType.delete();
    } catch (error) {
      response.status(error.status || 500).send({
        error: {
          message: 'Ocorreu um erro! Tipo de vanda não encontrada!',
        },
      });
    }
  }
}

module.exports = SaleTypeController;
