const Schema = use('Schema');

class SaleTypeSchema extends Schema {
  up() {
    this.create('sale_types', (table) => {
      table.increments();
      table.string('sale_type').notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('sale_types');
  }
}

module.exports = SaleTypeSchema;
