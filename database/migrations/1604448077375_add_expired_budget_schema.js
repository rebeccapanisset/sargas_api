const Schema = use('Schema');

class AddExpiredBudgetSchema extends Schema {
  up() {
    this.alter('budgets', (table) => {
      table.boolean('expired').defaultTo(false);
    });
  }

  down() {
    this.alter('budgets', (table) => {
      table.dropColumns('expired');
    });
  }
}

module.exports = AddExpiredBudgetSchema;
