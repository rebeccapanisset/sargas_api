// const Antl = use('Antl');

class ForgotPassword {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      email: 'required|email',
      redirect_url: 'required|url',
    };
  }

  get messages() {
    return {
      'email.required': 'O e-mail é obrigatório e está faltando.',
      'email.email': 'O e-mail deve ser válido.',
      'redirect_url.required':
        'A URL de redirecionamento é obrigatória e está faltando.',
      'redirect_url.url': 'URL inválida.',
    };
  }
}

module.exports = ForgotPassword;
