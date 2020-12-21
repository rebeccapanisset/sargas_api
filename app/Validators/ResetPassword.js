// const Antl = use('Antl');

class ResetPassword {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      token: 'required',
      password: 'required|confirmed',
    };
  }

  get messages() {
    return {
      'token.required': 'O token é obrigatório e está faltando.',
      'password.required': 'A senha é obrigatória e está faltando.',
      'password.confirmed': 'A senha não foi confirmada corretamente.',
    };
  }
}

module.exports = ResetPassword;
