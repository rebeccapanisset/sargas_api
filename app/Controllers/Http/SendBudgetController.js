const Budget = use('App/Models/Budget');
const Job = use('App/Jobs/BudgetEmail');
const Kue = use('Kue');

class SendBudgetController {
  async send({ params, response }) {
    try {
      const budget = await Budget.findOrFail(params.id);

      const client = await budget.client().fetch();

      const file = await budget.pdf().fetch();

      if (file) {
        Kue.dispatch(
          Job.key,
          {
            email: client.email,
            name: client.name,
            filePath: file.file,
          },
          { attempts: 3 } // tenta enviar o e-mail 3 vezes
        );

        const status = 'S';

        const data = { status };

        budget.merge(data);

        await budget.save();

        return budget;
      }

      return response.status(500).send({
        error: {
          message: 'Ocorreu um erro! PDF do orçamento não encontrado!',
        },
      });
    } catch (error) {
      return response.status(error.status || 500).send({
        error: {
          message: 'Ocorreu um erro! Orçamento não encontrado!',
        },
      });
    }
  }
}

module.exports = SendBudgetController;
