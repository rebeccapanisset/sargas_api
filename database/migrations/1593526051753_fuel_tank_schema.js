const Schema = use('Schema');

class FuelTankSchema extends Schema {
  up() {
    this.create('fuel_tanks', (table) => {
      table.increments();
      table.integer('volume');
      // Relacionamentos
      table
        .integer('product_id')
        .unsigned()
        .references('id')
        .inTable('products')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

      table.timestamps();
    });
  }

  down() {
    this.drop('fuel_tanks');
  }
}

module.exports = FuelTankSchema;
