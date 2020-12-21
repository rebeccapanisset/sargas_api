const Schema = use('Schema');

class PdfConfigurationSchema extends Schema {
  up() {
    this.alter('configurations', (table) => {
      table
        .integer('pdf_header_id')
        .unsigned()
        .references('id')
        .inTable('files')
        .onUpdate('CASCADE')
        .onDelete('SET NULL');
      table
        .integer('pdf_footer_id')
        .unsigned()
        .references('id')
        .inTable('files')
        .onUpdate('CASCADE')
        .onDelete('SET NULL');
      table
        .integer('pdf_watermark_id')
        .unsigned()
        .references('id')
        .inTable('files')
        .onUpdate('CASCADE')
        .onDelete('SET NULL');
    });
  }

  down() {
    this.alter('configurations', (table) => {
      table.dropColumn('pdf_header_id');
      table.dropColumn('pdf_footer_id');
      table.dropColumn('pdf_watermark_id');
    });
  }
}

module.exports = PdfConfigurationSchema;
