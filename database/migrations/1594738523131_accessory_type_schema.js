const Schema = use('Schema');

class AccessoryTypeSchema extends Schema {
  up() {
    this.create('accessory_type', (table) => {
      table
        .integer('accessory_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('accessories')
        .onDelete('CASCADE')
        .index('acessory_id');
      table
        .integer('type_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('tank_types')
        .onDelete('CASCADE')
        .index('type_id');
    });
  }

  down() {
    this.drop('accessory_type');
  }
}

module.exports = AccessoryTypeSchema;
