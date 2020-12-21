// const Antl = use('Antl');

class Session {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      username: 'required',
      password: 'required',
    };
  }

  get messages() {
    return {
      'username.required': 'O login é obrigatório e está faltando.',
      'password.required': 'A senha é obrigatória e está faltando.',
    };
  }
}

module.exports = Session;
