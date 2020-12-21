const Schema = use('Schema');

class PdfSchema extends Schema {
  up() {
    this.create('pdfs', (table) => {
      table.increments();
      table.string('title');
      table.text('content');
      // Relacionamentos
      table
        .integer('type_id')
        .unsigned()
        .references('id')
        .inTable('tank_types')
        .onUpdate('CASCADE')
        .onDelete('SET NULL');
      table.timestamps();
    });
  }

  down() {
    this.drop('pdfs');
  }
}

module.exports = PdfSchema;
