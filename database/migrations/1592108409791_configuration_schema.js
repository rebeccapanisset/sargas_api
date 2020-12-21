const Schema = use('Schema');
const Database = use('Database');

class ConfigurationSchema extends Schema {
  up() {
    this.create('configurations', (table) => {
      table.increments();
      table.integer('expiration').notNullable();
      table.integer('discontinuance').notNullable();
      table.timestamps();
    });

    this.schedule(async (trx) => {
      await Database.table('configurations')
        .transacting(trx)
        .insert({ expiration: 30, discontinuance: 180 });
    });
  }

  down() {
    this.drop('configurations');
  }
}

module.exports = ConfigurationSchema;
