const DocumentType = use('App/Models/DocumentType');

class DocumentTypeController {
  async index() {
    const types = await DocumentType.all();

    return types;
  }

  async show({ params, response }) {
    try {
      const documentType = await DocumentType.findOrFail(params.id);

      return documentType;
    } catch (error) {
      return response.status(error.status || 500).send({
        error: {
          message: 'Ocorreu um erro! Tipo de Documento não encontrado!',
        },
      });
    }
  }
}

module.exports = DocumentTypeController;
