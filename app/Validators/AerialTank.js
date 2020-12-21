class AerialTank {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      datatype: 'required',
      description: 'required',
      price: 'required|number',
      volume: 'required|number',
      length: 'required|number',
      diameter: 'required|number',
    };
  }

  get messages() {
    return {
      'datatype.required': 'O tipo do tanque é obrigatório e está faltando.',
      'description.required':
        'A descrição do tanque é obrigatório e está faltando',
      'price.required': 'O preço do acessório é obrigatório e está faltando.',
      'price.number': 'O preço do acessório deve ser um número.',
      'volume.number': 'O preço do acessório deve ser um número.',
      'volume.required': 'O volume é obrigatório e está faltando.',
      'length.number': 'O comprimento deve ser um número.',
      'length.required': 'O comprimento é obrigatório e está faltando.',
      'diameter.number': 'O diâmetro deve ser um número.',
      'diameter.required': 'O diâmetro é obrigatório e está faltando.',
    };
  }
}

module.exports = AerialTank;
