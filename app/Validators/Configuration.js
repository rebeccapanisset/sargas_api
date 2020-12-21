class PaymentMethod {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      expiration: 'required|integer',
      discontinuance: 'required|integer',
      payment_methods: 'array|required',
      sale_types: 'array|required',
    };
  }

  get messages() {
    return {
      'expiration.required':
        'A quantidade de compartimentos é obrigatória e está faltando.',
      'expiration.integer':
        'A quantidade de compartimentos deve ser um número INTEIRO.',
      'discontinuance.required':
        'A quantidade de dias para arquivamento é obrigatória e está faltando.',
      'discontinuance.integer':
        'A quantidade de dias para arquivamento deve ser um número INTEIRO.',
      'payment_methods.array':
        'As formas de pagamento devem ser enviadas em formato de array',
      'payment_methods.required':
        'É necessário cadastrar pelo menos uma forma de pagamento.',
      'sale_types.array':
        'As formas de pagamento devem ser enviadas em formato de array',
      'sale_types.required':
        'É necessário cadastrar pelo menos uma forma de pagamento.',
    };
  }
}

module.exports = PaymentMethod;
