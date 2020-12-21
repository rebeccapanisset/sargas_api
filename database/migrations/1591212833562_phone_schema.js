const Schema = use('Schema');

class PhoneSchema extends Schema {
  up() {
    this.create('phones', (table) => {
      table.increments(); // id
      table.string('number', 20).notNullable();
      // Relacionamentos
      table
        .integer('client_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('clients')
        .onUpdate('CASCADE')
        .onDelete('SET NULL');

      table.timestamps();
    });
  }

  down() {
    this.drop('phones');
  }
}

module.exports = PhoneSchema;
