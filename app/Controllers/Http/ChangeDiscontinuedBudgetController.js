const Budget = use('App/Models/Budget');

class ChangeDiscontinuedBudgetController {
  async changeDiscontinued({ params, response }) {
    try {
      const budget = await Budget.findOrFail(params.id);

      await budget.merge({
        discontinued: !budget.discontinued,
      });

      await budget.save();

      return budget;
    } catch (error) {
      return response.status(error.status || 500).send({
        error: {
          message: 'Ocorreu um erro! Orçamento não encontrado!',
        },
      });
    }
  }
}

module.exports = ChangeDiscontinuedBudgetController;
