class FuelTank {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      datatype: 'required',
      description: 'required',
      price: 'required|number',
      volume: 'required|integer',
    };
  }

  get messages() {
    return {
      'datatype.required': 'O tipo do tanque é obrigatório e está faltando.',
      'description.required': 'A descrição é obrigatória e está faltando',
      'price.required': 'O preço é obrigatório e está faltando.',
      'price.number': 'O preço deve ser um número.',
      'volume.integer': 'O preço deve ser um número inteiro.',
      'volume.required': 'O volume é obrigatório e está faltando.',
    };
  }
}

module.exports = FuelTank;
