const Mail = use('Mail');
const Env = use('Env');

class RecoverPasswordEmail {
  static get concurrency() {
    return 1;
  }

  static get key() {
    return 'RecoverPasswordEmail-job';
  }

  async handle({ email, name, token, link }) {
    // Esse console.log() aparece no console de execução dos jobs e serve para
    // indicar que job foi executado - NÃO APAGAR.
    console.log(`Job: ${RecoverPasswordEmail.key}`);

    await Mail.send(
      ['emails.recover_password'],
      { email, name, token, link },
      (message) => {
        message
          .to(email)
          .from(Env.get('CLIENT_EMAIL'), Env.get('CLIENT_NAME'))
          .subject('Recuperação de Senha');
      }
    );
  }
}

module.exports = RecoverPasswordEmail;
