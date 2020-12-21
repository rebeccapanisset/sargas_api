const Mail = use('Mail');
const Helpers = use('Helpers');
const Env = use('Env');

class BudgetEmail {
  static get concurrency() {
    return 1;
  }

  static get key() {
    return 'BudgetEmail-job';
  }

  async handle({ email, name, filePath }) {
    // Esse console.log() aparece no console de execução dos jobs e serve para
    // indicar que job foi executado - NÃO APAGAR.
    console.log(`Job: ${BudgetEmail.key}`);

    await Mail.send(['emails.budget'], { name }, (message) => {
      message
        .to(email)
        .from(Env.get('CLIENT_EMAIL'), Env.get('CLIENT_NAME'))
        .subject('Pedido de Orçamento - JBS');

      message.attach(Helpers.tmpPath(`uploads/files/${filePath}`), {
        filename: 'Pedido de Orçamento - JBS Tanques.pdf',
      });
    });
  }
}

module.exports = BudgetEmail;
