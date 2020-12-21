const Schema = use('Schema');

class WaterTankSchema extends Schema {
  up() {
    this.create('water_tanks', (table) => {
      table.increments();
      table.integer('volume').notNullable();
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
    this.drop('water_tanks');
  }
}

module.exports = WaterTankSchema;
