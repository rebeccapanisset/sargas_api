const Schema = use('Schema');

class RemovePhoneSchema extends Schema {
  up() {
    this.alter('clients', (table) => {
      table.dropColumn('phone');
    });
  }

  down() {
    this.alter('clients', (table) => {
      table.string('phone', 20);
    });
  }
}

module.exports = RemovePhoneSchema;
