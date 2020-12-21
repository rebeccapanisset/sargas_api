const Antl = use('Antl');
const Model = use('Model');

class Accessory extends Model {
  static get computed() {
    return ['formatedPrice'];
  }

  getFormatedPrice({ price }) {
    return Antl.formatNumber(price, {
      style: 'currency',
      currency: 'brl',
      useGrouping: true,
      minimumFractionDigits: 2,
    });
  }

  types() {
    return this.belongsToMany(
      'App/Models/TankType',
      'accessory_id',
      'type_id',
      'id',
      'id'
    )
      .pivotTable('accessory_type')
      .pivotPrimaryKey(false);
  }

  budgets() {
    return this.belongsToMany(
      'App/Models/Budget',
      'accessory_id',
      'budget_id',
      'id',
      'id'
    )
      .pivotTable('accessory_budget')
      .pivotPrimaryKey(false);
  }
}

module.exports = Accessory;
