const Schema = use('Schema');

class PaymentMethodSchema extends Schema {
  up() {
    this.create('payment_methods', (table) => {
      table.increments();
      table.string('payment_method').notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('payment_methods');
  }
}

module.exports = PaymentMethodSchema;
