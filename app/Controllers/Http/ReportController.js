const Budget = use('App/Models/Budget');

class ReportController {
  async index({ request, response }) {
    try {
      const {
        discontinued = false,
        expired = false,
        status,
        user,
        tankType,
        start_date,
        final_date,
        page,
        pagination = 10,
      } = request.get();

      const dis = discontinued === 'true';
      const exp = expired === 'true';

      const startDate = start_date && start_date.substring(0, 10);

      if (
        dis ||
        exp ||
        status ||
        user ||
        tankType ||
        start_date ||
        final_date
      ) {
        const budgets = await Budget.query()
          .select(
            'budgets.id',
            'clients.name as client',
            'budgets.created_at',
            'products.description as product',
            'budgets.status',
            'budgets.discontinued',
            'budgets.pdf_id',
            'tank_types.name as type'
          )
          .leftJoin('users', 'budgets.user_id', 'users.id')
          .innerJoin('clients', 'budgets.client_id', 'clients.id')
          .innerJoin('products', 'budgets.product_id', 'products.id')
          .innerJoin('tank_types', 'budgets.type_id', 'tank_types.id')
          .where((builder) => {
            // eslint-disable-next-line eqeqeq
            if (user && user != 0) {
              builder.where('users.id', user);
            }
          })
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
            if (status && status !== 'AL') {
              builder.where('budgets.status', status);
            }
          })
          .where((builder) => {
            // eslint-disable-next-line eqeqeq
            if (tankType && tankType != 0) {
              builder.where('tank_types.id', tankType);
            }
          })
          .where((builder) => {
            if (start_date && final_date) {
              builder.whereBetween('budgets.created_at', [
                start_date,
                final_date,
              ]);
            } else if (start_date) {
              builder.whereRaw('budgets.created_at::date = ?', [startDate]);
            }
          })
          .orderBy('budgets.id', 'desc')
          .paginate(page, pagination);

        return budgets;
      }

      return [];
    } catch (error) {
      response.status(error.status || 500).send({
        error: {
          message: 'Ocorreu um erro! Não foi possível encontrar os orçamentos!',
          details: error.message,
        },
      });
      return [];
    }
  }
}

module.exports = ReportController;
