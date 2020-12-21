const Schema = use('Schema');

class TruckSchema extends Schema {
  up() {
    this.create('trucks', (table) => {
      table.increments(); // id
      table.string('plate').notNullable();
      table.string('brand').notNullable();
      table.string('model').notNullable();
      table.integer('year');
      table.string('color');
      table.string('chassi');
      table.string('serial_number');
      table.integer('axes_number').notNullable();
      table.decimal('between_axes').notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('trucks');
  }
}

module.exports = TruckSchema;
