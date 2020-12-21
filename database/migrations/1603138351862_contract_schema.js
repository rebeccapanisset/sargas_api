const Schema = use('Schema');

class ContractSchema extends Schema {
  up() {
    this.create('contracts', (table) => {
      table.increments();
      // Relacionamentos
      table
        .integer('budget_id')
        .unsigned()
        .references('id')
        .inTable('budgets')
        .onUpdate('CASCADE')
        .onDelete('SET NULL');
      table
        .integer('pdf_id')
        .unsigned()
        .references('id')
        .inTable('files')
        .onUpdate('CASCADE')
        .onDelete('SET NULL');
      table.timestamps();
      table
        .integer('type_id')
        .unsigned()
        .references('id')
        .inTable('tank_types')
        .onUpdate('CASCADE')
        .onDelete('SET NULL');
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL');
    });
  }

  down() {
    this.drop('contracts');
  }
}

module.exports = ContractSchema;
