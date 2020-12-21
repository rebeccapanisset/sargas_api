/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class UserSchema extends Schema {
  up() {
    this.create('users', (table) => {
      table.increments(); // id
      table.string('name', 80).notNullable();
      table.string('username', 80).notNullable().unique();
      table.string('email', 254).notNullable().unique();
      table.string('password', 60).notNullable();
      table.enu('access', ['A', 'U']).notNullable();
      table.string('token');
      table.timestamp('token_created_at');
      // Relacionamentos
      table
        .integer('signature_id')
        .unsigned()
        .references('id')
        .inTable('files')
        .onUpdate('CASCADE')
        .onDelete('SET NULL');

      table.timestamps();
    });
  }

  down() {
    this.drop('users');
  }
}

module.exports = UserSchema;
