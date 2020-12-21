// const Antl = use('Antl');

class User {
  get validateAll() {
    return true;
  }

  get rules() {
    const userId = this.ctx.params.id;

    return {
      name: 'required',
      username: `required|unique:users,username,id,${userId || 0}`,
      email: `required|email|unique:users,email,id,${userId || 0}`,
      access: 'required',
    };
  }

  get messages() {
    return {
      'name.required': 'O nome é obrigatório e está faltando.',
      'username.required': 'O login é obrigatório e está faltando.',
      'username.unique': 'Esse login já existe e precisa ser único.',
      'email.required': 'O e-mail é obrigatório e está faltando.',
      'email.email': 'O e-mail deve ser válido.',
      'email.unique': 'Esse e-mail já existe e precisa ser único.',
      'access.required': 'O acesso é obrigatório e está faltando.',
    };
  }
}

module.exports = User;
