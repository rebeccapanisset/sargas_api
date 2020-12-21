const Schema = use('Schema');

class RemovePersonIndicatorSchema extends Schema {
  up() {
    this.alter('clients', (table) => {
      table.dropColumn('person_indicator');
    });
  }

  down() {
    this.alter('remove_person_indicators', (table) => {
      table.enu('person_indicator', ['PF', 'PJ']).notNullable();
    });
  }
}

module.exports = RemovePersonIndicatorSchema;
