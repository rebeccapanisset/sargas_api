const Antl = use('Antl');
const Model = use('Model');

class Budget extends Model {
  static get computed() {
    return ['formatedTotal'];
  }

  getFormatedTotal({ total }) {
    return Antl.formatNumber(total, {
      style: 'currency',
      currency: 'brl',
      useGrouping: true,
      minimumFractionDigits: 2,
    });
  }

  type() {
    return this.belongsTo('App/Models/TankType', 'type_id', 'id');
  }

  client() {
    return this.belongsTo('App/Models/Client');
  }

  truck() {
    return this.belongsTo('App/Models/Truck');
  }

  product() {
    return this.belongsTo('App/Models/Product');
  }

  user() {
    return this.belongsTo('App/Models/User');
  }

  pdf() {
    return this.belongsTo('App/Models/File', 'pdf_id', 'id');
  }

  saleType() {
    return this.belongsTo('App/Models/SaleType');
  }

  paymentMethod() {
    return this.belongsTo('App/Models/PaymentMethod');
  }

  accessories() {
    return this.belongsToMany(
      'App/Models/Accessory',
      'budget_id',
      'accessory_id',
      'id',
      'id'
    )
      .pivotTable('accessory_budget')
      .pivotPrimaryKey(false);
  }

  /* getCreatedAt(created_at) {
    return created_at.format('YYYY-MM-DD');
  } */
}

module.exports = Budget;
