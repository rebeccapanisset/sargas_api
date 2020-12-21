const Antl = use('Antl');
const Model = use('Model');

class Product extends Model {
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

  image() {
    return this.belongsTo('App/Models/File', 'image_id', 'id');
  }

  fuelTank() {
    return this.hasOne('App/Models/FuelTank');
  }

  pipaTank() {
    return this.hasOne('App/Models/PipaTank');
  }

  aerialTank() {
    return this.hasOne('App/Models/AerialTank');
  }

  waterTank() {
    return this.hasOne('App/Models/WaterTank');
  }
}

module.exports = Product;
