const Phone = use('App/Models/Phone');

class PhoneController {
  async destroy({ params, response }) {
    try {
      const phone = await Phone.findOrFail(params.id);

      await phone.delete();
    } catch (error) {
      response.status(error.status || 500).send({
        error: {
          message: 'Ocorreu um erro! Telefone não encontrado!',
        },
      });
    }
  }
}

module.exports = PhoneController;
