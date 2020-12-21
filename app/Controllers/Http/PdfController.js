const Pdf = use('App/Models/Pdf');

class PdfController {
  async index({ request }) {
    const {
      filter = '',
      doc_type,
      type,
      page,
      pagination = 10,
    } = request.get();

    const pdfs = await Pdf.query()
      .with('type')
      .with('documentType')
      .where('title', 'ILIKE', `%${filter}%`)
      .where((builder) => {
        if (type) {
          builder.where('type_id', type);
        }
      })
      .where((builder) => {
        if (doc_type) {
          builder.where('doc_type_id', doc_type);
        }
      })
      .orderBy('id', 'desc')
      .paginate(page, pagination);

    return pdfs;
  }

  async store({ request }) {
    const data = request.only([
      'title',
      'content',
      'default',
      'type_id',
      'doc_type_id',
    ]);

    const pdf = Pdf.create(data);

    return pdf;
  }

  async show({ params, response }) {
    try {
      const pdf = await Pdf.findOrFail(params.id);

      return pdf;
    } catch (error) {
      return response.status(error.status || 500).send({
        error: {
          message: 'Ocorreu um erro! PDF não encontrado!',
        },
      });
    }
  }

  async update({ params, request, response }) {
    try {
      const pdf = await Pdf.findOrFail(params.id);

      const data = request.only([
        'title',
        'content',
        'default',
        'type_id',
        'doc_type_id',
      ]);

      pdf.merge(data);

      await pdf.save();

      return pdf;
    } catch (error) {
      return response.status(error.status || 500).send({
        error: {
          message: 'Ocorreu um erro! PDF não encontrado!',
        },
      });
    }
  }

  async destroy({ params, response }) {
    try {
      const pdf = await Pdf.findOrFail(params.id);

      await pdf.delete();
    } catch (error) {
      response.status(error.status).send({
        error: {
          message: 'Ocorreu um erro! PDF não encontrado!',
        },
      });
    }
  }
}

module.exports = PdfController;
