const Schema = use('Schema');

class RenameFieldDiscontinueBudgetSchema extends Schema {
  up() {
    this.alter('budgets', (table) => {
      table.renameColumn('discontinue', 'discontinued');
    });
  }

  down() {
    this.alter('budgets', (table) => {
      table.renameColumn('discontinued', 'discontinue');
    });
  }
}

module.exports = RenameFieldDiscontinueBudgetSchema;
