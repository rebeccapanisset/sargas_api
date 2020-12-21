const Env = use('Env');
const Helpers = use('Helpers');
const Mail = use('Mail');

class ContractEmail {
  static get concurrency() {
    return 1;
  }

  static get key() {
    return 'ContractEmail-job';
  }

  async handle({ budget_id, email, name, filePath }) {
    // Esse console.log() aparece no console de execução dos jobs e serve para
    // indicar que job foi executado - NÃO APAGAR.
    console.log(`Job: ${ContractEmail.key}`);

    await Mail.send(['emails.contract'], { budget_id, name }, (message) => {
      message
        .to(email)
        .from(Env.get('CLIENT_EMAIL'), Env.get('CLIENT_NAME'))
        .subject('Contrato de Tanque - JBS');

      message.attach(Helpers.tmpPath(`uploads/files/${filePath}`), {
        filename: `Contrato do Pedido N° ${budget_id} - JBS Tanques.pdf`,
      });
    });
  }
}

module.exports = ContractEmail;
