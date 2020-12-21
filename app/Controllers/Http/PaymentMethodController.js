const PaymentMethod = use('App/Models/PaymentMethod');

class PaymentMethodController {
  async destroy({ params, response }) {
    try {
      const paymentMethod = await PaymentMethod.findOrFail(params.id);

      await paymentMethod.delete();
    } catch (error) {
      response.status(error.status || 500).send({
        error: {
          message: 'Ocorreu um erro! Forma de pagamento não encontrada!',
        },
      });
    }
  }
}

module.exports = PaymentMethodController;
