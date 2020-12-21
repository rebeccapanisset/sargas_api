const Antl = use('Antl');
const Model = use('Model');

class Truck extends Model {
  getBetweenAxes(between_axes) {
    return Antl.formatNumber(between_axes, {
      style: 'decimal',
      useGrouping: true,
      minimumFractionDigits: 2,
    });
  }
}

module.exports = Truck;
