const Schema = use('Schema');

class AccessorySchema extends Schema {
  up() {
    this.create('accessories', (table) => {
      table.increments();
      table.string('name').notNullable();
      table.decimal('price').notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('accessories');
  }
}

module.exports = AccessorySchema;
