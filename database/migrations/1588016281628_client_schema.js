const Schema = use('Schema');

class ClientSchema extends Schema {
  up() {
    this.create('clients', (table) => {
      table.increments(); // id
      table.string('name').notNullable();
      table.enu('person_indicator', ['PF', 'PJ']).notNullable();
      table.string('cpf_cnpj', 20).notNullable();
      table.string('ie');
      table.string('email').notNullable();
      table.string('phone', 20).notNullable();
      table.string('zip_code', 10).notNullable();
      table.string('address').notNullable();
      table.string('neighborhood').notNullable();
      table.string('city').notNullable();
      table.string('state', 2).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('clients');
  }
}

module.exports = ClientSchema;
