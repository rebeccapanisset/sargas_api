const Schema = use('Schema');

class BudgetSchema extends Schema {
  up() {
    this.create('budgets', (table) => {
      table.increments();
      table.boolean('discontinue');
      table.integer('delivery_days');
      // Aguardando - W
      // Enviado - S
      // Negociando sem Enviar - WN
      // Negociando - D
      // Aprovado - A
      table.enu('status', ['W', 'S', 'WN', 'D', 'A']).notNullable();
      table.string('compartment_position');
      table.integer('amount');
      table.string('requester');
      table.decimal('total');
      table.text('notes');
      // Relacionamentos
      table
        .integer('type_id')
        .unsigned()
        .references('id')
        .inTable('tank_types')
        .onUpdate('CASCADE')
        .onDelete('SET NULL');
      table
        .integer('client_id')
        .unsigned()
        .references('id')
        .inTable('clients')
        .onUpdate('CASCADE')
        .onDelete('SET NULL');
      table
        .integer('truck_id')
        .unsigned()
        .references('id')
        .inTable('trucks')
        .onUpdate('CASCADE')
        .onDelete('SET NULL');
      table
        .integer('product_id')
        .unsigned()
        .references('id')
        .inTable('products')
        .onUpdate('CASCADE')
        .onDelete('SET NULL');
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL');
      table
        .integer('pdf_id')
        .unsigned()
        .references('id')
        .inTable('files')
        .onUpdate('CASCADE')
        .onDelete('SET NULL');
      table
        .integer('sale_type_id')
        .unsigned()
        .references('id')
        .inTable('sale_types')
        .onUpdate('CASCADE')
        .onDelete('SET NULL');
      table
        .integer('payment_method_id')
        .unsigned()
        .references('id')
        .inTable('payment_methods')
        .onUpdate('CASCADE')
        .onDelete('SET NULL');
      table.timestamps();
    });
  }

  down() {
    this.drop('budgets');
  }
}

module.exports = BudgetSchema;
