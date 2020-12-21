const Schema = use('Schema');

class ProductSchema extends Schema {
  up() {
    this.create('products', (table) => {
      table.increments();
      table.string('datatype').notNullable();
      table.string('description').notNullable();
      table.decimal('price', 20);
      // Relacionamentos
      table
        .integer('image_id')
        .unsigned()
        .references('id')
        .inTable('files')
        .onUpdate('CASCADE')
        .onDelete('SET NULL');

      table.timestamps();
    });
  }

  down() {
    this.drop('products');
  }
}

module.exports = ProductSchema;
