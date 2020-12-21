// const Antl = use('Antl');

class UpdatePassword {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      password: 'required',
      new_password: 'required|confirmed',
    };
  }

  get messages() {
    return {
      'password.required': 'A senha é obrigatória e está faltando.',
      'new_password.required': 'A nova senha é obrigatória e está faltando.',
      'new_password.confirmed': 'A nova senha não foi confirmada corretamente.',
    };
  }
}

module.exports = UpdatePassword;
