const Schema = use('Schema');

class AddDocumentTypePdfSchema extends Schema {
  up() {
    this.alter('pdfs', (table) => {
      table
        .integer('doc_type_id')
        .unsigned()
        .references('id')
        .inTable('document_types')
        .onUpdate('CASCADE')
        .onDelete('SET NULL');
    });
  }

  down() {
    this.alter('pdfs', (table) => {
      table.dropColumns('doc_type_id');
    });
  }
}

module.exports = AddDocumentTypePdfSchema;
