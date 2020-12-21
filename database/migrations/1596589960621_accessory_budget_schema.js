const Schema = use('Schema');

class AccessoryBudgetSchema extends Schema {
  up() {
    this.create('accessory_budget', (table) => {
      table
        .integer('accessory_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('accessories')
        .onDelete('CASCADE')
        .index('accessory_id');
      table
        .integer('budget_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('budgets')
        .onDelete('CASCADE')
        .index('budget_id');
    });
  }

  down() {
    this.drop('accessory_budgets');
  }
}

module.exports = AccessoryBudgetSchema;
