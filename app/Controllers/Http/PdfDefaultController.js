const Database = use('Database');

const Pdf = use('App/Models/Pdf');

class PdfDefaultController {
  async update({ params, response }) {
    const trx = await Database.beginTransaction();

    try {
      const pdf = await Pdf.findOrFail(params.id);

      const defaultPdf = await Pdf.query()
        .where('type_id', pdf.type_id)
        .where('doc_type_id', pdf.doc_type_id)
        .where('default', true)
        .first();

      if (defaultPdf === null) {
        await pdf.merge({ default: true }, trx);
        await pdf.save(trx);
      } else {
        if (defaultPdf.id !== pdf.id) {
          await defaultPdf.merge({ default: false }, trx);
          await defaultPdf.save(trx);
        }

        await pdf.merge({ default: true }, trx);
        await pdf.save(trx);
      }

      await trx.commit();

      return pdf;
    } catch (error) {
      await trx.rollback();

      return response.status(error.status || 500).send({
        error: {
          message:
            'Ocorreu um erro! Não foi possível marcar o template de PDF como principal!',
        },
      });
    }
  }
}

module.exports = PdfDefaultController;
