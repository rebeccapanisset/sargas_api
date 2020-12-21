class NegociateBudget {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      total: 'required|number',
    };
  }

  get messages() {
    return {
      'total.required': 'O valor total é obrigatório e está faltando.',
      'total.number': 'O valor total deve ser um número.',
    };
  }
}

module.exports = NegociateBudget;
