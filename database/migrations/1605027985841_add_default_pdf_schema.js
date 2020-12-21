const Schema = use('Schema');

class AddDefaultPdfSchema extends Schema {
  up() {
    this.alter('pdfs', (table) => {
      table.boolean('default').defaultTo(false);
    });
  }

  down() {
    this.alter('pdfs', (table) => {
      table.dropColumns('default');
    });
  }
}

module.exports = AddDefaultPdfSchema;
