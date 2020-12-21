const Schema = use('Schema');

class RemoveSerialNumberSchema extends Schema {
  up() {
    this.alter('trucks', (table) => {
      table.dropColumn('serial_number');
    });
  }

  down() {
    this.alter('trucks', (table) => {
      table.string('serial_number');
    });
  }
}

module.exports = RemoveSerialNumberSchema;
