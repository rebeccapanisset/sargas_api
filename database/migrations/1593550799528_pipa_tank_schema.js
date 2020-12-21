/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class PipaTankSchema extends Schema {
  up() {
    this.create('pipa_tanks', (table) => {
      table.increments();
      table.integer('volume');
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
    this.drop('pipa_tanks');
  }
}

module.exports = PipaTankSchema;
