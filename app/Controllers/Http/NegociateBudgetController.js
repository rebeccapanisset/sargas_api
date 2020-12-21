const Budget = use('App/Models/Budget');

const Database = use('Database');

const generate = use('App/Utils/PdfGenerator');

class NegociateBudgetController {
  async negociate({ params, request, response }) {
    const { total, pdf_type_id } = request.all();

    const trx = await Database.beginTransaction();

    try {
      const budget = await Budget.findOrFail(params.id);
      const pdf = await budget.pdf().fetch();

      const deal_count = budget.deal_count + 1;

      const status = 'WN';

      const data = {
        total,
        deal_count,
        status,
      };

      await budget.merge(data, trx);

      await budget.save(trx);

      // Geração do PDF
      const { fileName, path } = await generate({
        budget,
        pdfTypeId: pdf_type_id,
        docType: 'dealing',
      });

      // Update do PDF
      await pdf.merge(
        {
          file: `${path}/${fileName}`,
          name: fileName,
        },
        trx
      );

      await pdf.save(trx);

      await trx.commit();

      return budget;
    } catch (error) {
      await trx.rollback();

      return response.status(error.status || 500).send({
        error: {
          message: 'Ocorreu um erro! Orçamento não encontrado!',
        },
      });
    }
  }
}
module.exports = NegociateBudgetController;
