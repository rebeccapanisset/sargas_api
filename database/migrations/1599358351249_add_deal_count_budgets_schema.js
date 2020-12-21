const Schema = use('Schema');

class AddDealCountBudgetsSchema extends Schema {
  up() {
    this.table('budgets', (table) => {
      table.integer('deal_count').defaultTo(0);
    });
  }

  down() {
    this.table('budgets', (table) => {
      table.dropColumns('deal_count');
    });
  }
}

module.exports = AddDealCountBudgetsSchema;
