/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AerialTankSchema extends Schema {
  up() {
    this.create('aerial_tanks', (table) => {
      table.increments();
      table.integer('volume');
      table.double('length');
      table.double('diameter');
      // Relacionamentos
      table
        .integer('product_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('products')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

      table.timestamps();
    });
  }

  down() {
    this.drop('aerial_tanks');
  }
}

module.exports = AerialTankSchema;
