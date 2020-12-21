class File {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      file: 'required',
      type: 'required|in:budget,contract,dealing',
      cpf_cnpj: 'required',
    };
  }

  get messages() {
    return {
      'file.required': 'O arquivo é obrigatório e está faltando.',
      'type.required': 'O tipo é obrigatório e está faltando.',
      'type.in': 'Tipo inválido.',
      'cpf_cnpj.required':
        'O cpf/cnpj do cliente é obrigatório e está faltando.',
    };
  }
}

module.exports = File;
