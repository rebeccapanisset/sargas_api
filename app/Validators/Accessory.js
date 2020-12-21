class Accessory {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      name: 'required',
      price: 'required|number',
      types: 'array|required',
    };
  }

  get messages() {
    return {
      'name.required': 'O nome é obrigatório e está faltando.',
      'price.required': 'O preço é obrigatório e está faltando.',
      'price.number': 'O preço deve ser um número.',
      'types.array':
        'Os tipos de tanque devem ser enviados em formato de array',
      'types.required':
        'É necessário vincular o acessório a pelo menos um tipo de tanque.',
    };
  }
}

module.exports = Accessory;
