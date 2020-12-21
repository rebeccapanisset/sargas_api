const Schema = use('Schema');
const Database = use('Database');

class TankTypeSchema extends Schema {
  up() {
    this.create('tank_types', (table) => {
      table.increments();
      table.string('name').notNullable();
      table.string('type').notNullable();
      table.timestamps();
    });

    this.schedule(async (trx) => {
      await Database.table('tank_types')
        .transacting(trx)
        .insert([
          { name: 'Combustível', type: 'fuel_tank' },
          { name: 'Pipa', type: 'pipa_tank' },
          { name: 'Aéreo', type: 'aerial_tank' },
          { name: "Caixa D'Água", type: 'water_tank' },
        ]);
    });
  }

  down() {
    this.drop('tank_types');
  }
}

module.exports = TankTypeSchema;
