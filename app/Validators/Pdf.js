class Pdf {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      title: 'required',
      content: 'required',
      doc_type_id: 'required|integer',
      type_id: 'required|integer',
    };
  }

  get messages() {
    return {
      'title.required': 'O título é obrigatório e está faltando.',
      'content.required': 'O conteúdo é obrigatório e está faltando.',
      'doc_type_id.required':
        'O tipo de documento é obrigatório e está faltando.',
      'doc_type_id.integer':
        'O id do tipo de documento deve ser um número inteiro.',
      'type_id.required': 'O tipo de tanque é obrigatório e está faltando.',
      'type_id.integer': 'O id do tipo de tanque deve ser um número inteiro.',
    };
  }
}

module.exports = Pdf;
