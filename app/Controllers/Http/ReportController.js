const Budget = use('App/Models/Budget');

class ReportController {
  async index({ request }) {
    const {
      discontinued = false,
      expired = false,
      status,
      user = '',
      start_date,
      final_date,
      page,
      pagination = 10,
    } = request.get();

    if (discontinued || expired || status || user || start_date || final_date) {
      const budgets = await Budget.query()
        .select(
          'budgets.id',
          'clients.name as client',
          'budgets.created_at',
          'products.description as product',
          'budgets.status',
          'budgets.discontinued'
        )
        .leftJoin('users', 'budgets.user_id', 'users.id')
        .innerJoin('clients', 'budgets.client_id', 'clients.id')
        .innerJoin('products', 'budgets.product_id', 'products.id')
        .where('users.name', 'ILIKE', `%${user}%`)
        .where((builder) => {
          if (discontinued) {
            builder.where('budgets.discontinued', discontinued);
          }
        })
        .where((builder) => {
          if (expired) {
            builder.where('budgets.expired', expired);
          }
        })
        .where((builder) => {
          if (status) {
            builder.where('budgets.status', status);
          }
        })
        .where((builder) => {
          if (start_date && final_date) {
            builder.whereBetween('budgets.created_at', [
              start_date,
              final_date,
            ]);
          }
        })
        .orderBy('budgets.id', 'desc')
        .paginate(page, pagination);

      return budgets;
    }

    return [];
  }
}

module.exports = ReportController;
