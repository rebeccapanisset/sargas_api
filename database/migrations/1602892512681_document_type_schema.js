const Schema = use('Schema');
const Database = use('Database');

class DocumentTypeSchema extends Schema {
  up() {
    this.create('document_types', (table) => {
      table.increments();
      table.string('name').notNullable();
      table.string('type').notNullable();
      table.timestamps();
    });

    this.schedule(async (trx) => {
      await Database.table('document_types')
        .transacting(trx)
        .insert([
          { name: 'Orçamento', type: 'budget' },
          { name: 'Contrato', type: 'contract' },
        ]);
    });
  }

  down() {
    this.drop('document_types');
  }
}

module.exports = DocumentTypeSchema;
