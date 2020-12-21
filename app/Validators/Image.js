class Image {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      file: 'required',
      type: 'required|in:signature,fuel,pipa,aerial,water,pdf',
    };
  }

  get messages() {
    return {
      'file.required': 'O arquivo é obrigatório e está faltando.',
      'type.required': 'O tipo é obrigatório e está faltando.',
      'type.in': 'Tipo inválido.',
    };
  }
}

module.exports = Image;
