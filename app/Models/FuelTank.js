const Antl = use('Antl');
const Model = use('Model');

class FuelTank extends Model {
  static boot() {
    super.boot();
    this.addHook('afterFind', 'TankProductHook.loadAttributes');
  }

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

  product() {
    return this.belongsTo('App/Models/Product');
  }
}

module.exports = FuelTank;
