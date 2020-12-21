const Mail = use('Mail');
const Env = use('Env');

class NewUserEmail {
  static get concurrency() {
    return 1;
  }

  static get key() {
    return 'NewUserEmail-job';
  }

  async handle({ email, name, username, password }) {
    // Esse console.log() aparece no console de execução dos jobs e serve para
    // indicar que job foi executado - NÃO APAGAR.
    console.log(`Job: ${NewUserEmail.key}`);

    await Mail.send(
      ['emails.new_user'],
      { name, username, password },
      (message) => {
        message
          .to(email)
          .from(Env.get('CLIENT_EMAIL'), Env.get('CLIENT_NAME'))
          .subject('Novo acesso para a JBS');
      }
    );
  }
}

module.exports = NewUserEmail;
