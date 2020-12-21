const Budget = use('App/Models/Budget');
const Configuration = use('App/Models/Configuration');

class ExpireBudgetService {
  async expireThis() {
    const configuration = await Configuration.firstOrFail();
    const budgets = await Budget.query().where('expired', 'false').fetch();

    const { expiration } = configuration;

    const today = new Date();

    if (budgets) {
      budgets.rows.forEach(async (budget) => {
        const past = new Date(budget.created_at);
        const diff = Math.abs(today.getTime() - past.getTime());
        const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

        if (days > expiration) {
          budget.merge({ expired: true });

          console.log('Expirado');

          await budget.save();
        }
      });
    }
  }
}
module.exports = new ExpireBudgetService();
