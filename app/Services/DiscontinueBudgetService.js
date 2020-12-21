const Budget = use('App/Models/Budget');
const Configuration = use('App/Models/Configuration');

class DiscontinueBudgetService {
  async discontinueThis() {
    const configuration = await Configuration.firstOrFail();
    const budgets = await Budget.query().where('discontinued', 'false').fetch();

    const { discontinuance } = configuration;

    const today = new Date();

    if (budgets) {
      budgets.rows.forEach(async (budget) => {
        const past = new Date(budget.created_at);
        const diff = Math.abs(today.getTime() - past.getTime());
        const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

        if (days > discontinuance) {
          budget.merge({ discontinued: true });

          console.log('Arquivado');

          await budget.save();
        }
      });
    }
  }
}
module.exports = new DiscontinueBudgetService();
