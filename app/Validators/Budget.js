class Budget {
  get validateAll() {
    return true;
  }

  get rules() {
    // O id do orçamento só vai ser válido quando for uma requisição de update
    // por isso usamos ele para diferenciar na hora da validação.
    const budgetId = this.ctx.params.id;

    return {
      client_id: `${budgetId ? `` : `required|`}integer`,
      truck_id: 'required|integer',
      product_id: 'required|integer',
      compartment_position: 'required',
      accessories: 'required|array',
      delivery_days: 'required|integer',
      sale_type_id: 'required|integer',
      requester: 'required',
      payment_method_id: 'required|integer',
      total: 'required|number',
      amount: 'required|integer',
      type_id: 'required|integer',
      pdf_type_id: 'required|integer',
    };
  }

  get messages() {
    return {
      'client_id.required': 'O cliente é obrigatório e está faltando.',
      'client_id.integer': 'O id do cliente deve ser um número inteiro.',
      'truck_id.required': 'O caminhão é obrigatório e está faltando.',
      'truck_id.integer': 'O id do caminhão deve ser um número inteiro.',
      'product_id.required': 'O produto é obrigatório e está faltando.',
      'product_id.integer': 'O id do produto deve ser um número inteiro.',
      'compartment_position.required':
        'A posição dos compartimentos é obrigatória e está faltando.',
      'accessories.required':
        'Os acessórios são obrigatórios e estão faltando.',
      'accessories.array':
        'Os acessórios devem ser enviados em formato de array.',
      'delivery_days.required':
        'O total de dias para a entrega é obrigatório e está faltando.',
      'delivery_days.integer':
        'O total de dias para a estrega deve ser um número inteiro.',
      'sale_type_id.required': 'O tipo de venda é obrigatório e está faltando.',
      'sale_type_id.integer':
        'O id do tipo de venda deve ser um número inteiro.',
      'requester.required':
        'O nome do solicitante é obrigatório e está faltando.',
      'payment_method_id.required':
        'A forma de pagamento é obrigatória e está faltando.',
      'payment_method_id.integer':
        'O id da forma de pagamento deve ser um número inteiro.',
      'total.required': 'O valor total é obrigatório e está faltando.',
      'total.number': 'O valor total deve ser um número.',
      'amount.required': 'A qauntidade é obrigatória e está faltando.',
      'amount.integer': 'A quantidade deve ser um número inteiro.',
      'type_id.required': 'O tipo de orçamento é obrigatório e está faltando.',
      'type_id.integer':
        'O id do tipo de orçamento deve ser um número inteiro.',
      'pdf_type_id.required': 'O tipo de PDF é obrigatório e está faltando.',
      'pdf_type_id.integer':
        'O id do tipo de orçamento deve ser um número inteiro.',
    };
  }
}

module.exports = Budget;
