class Contract {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      budget_id: 'required|integer',
      financing_type: 'required|in:private,finame,finance',
      // Particual
      installments_num: 'integer|above:0',
      payment_1: 'required_when:financing_type,private',
      payment_2: 'required_when:financing_type,private',
      installments: 'array|required_with_any:installments_num',
      // FINAME
      private_value:
        'required_when:financing_type,finame|' +
        'required_when:financing_type,finance',
      finance_value:
        'required_when:financing_type,finame|' +
        'required_when:financing_type,finance',
      // Financiado
      finance_type: 'required_when:financing_type,finance',
      // Tipo de PDF
      pdf_type: 'required|integer',
    };
  }

  get messages() {
    return {
      'budget_id.required': 'O orçamento é obrigatório e está faltando.',
      'budget_id.integer': 'O id do orçamento deve ser um número inteiro.',
      'financing_type.required':
        'O tipo de financiamento é obrigatório e está faltando.',
      'installments_num.integer':
        'A quantidade de parcelas deve ser um número inteiro.',
      'installments_num.above':
        'A quantidade de parcelas deve ser um número acima de 0.',
      'payment_1.required_when':
        'O 1º pagamento é obrigatório e está faltando.',
      'payment_2.required_when':
        'O 2º pagamento é obrigatório e está faltando.',
      'installments.array':
        'As parcelas devem ser enviadas em formato de array.',
      'installments.required_with_any':
        'As parcelas são obrigatórias e estão faltando.',
      'private_value.required_when':
        'O valor particular é obrigatório e está faltando.',
      'private_value.number': 'O valor particular deve ser um número.',
      'finance_value.required_when':
        'O valor financiado é obrigatório e está faltando.',
      'finance_value.number': 'O valor financiado deve ser um número.',
      'finance_type.required_when':
        'O tipo de financiamento é obrigatório e está faltando.',
      'pdf_type.required': 'O tipo de PDF é obrigatório e está faltando.',
      'pdf_type.integer': 'O id do tipo de PDF deve ser um número inteiro.',
    };
  }
}

module.exports = Contract;
