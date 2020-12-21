const Model = use('Model');

class TankType extends Model {
  accessories() {
    return this.belongsToMany(
      'App/Models/Accessory',
      'type_id',
      'accessory_id',
      'id',
      'id'
    )
      .pivotTable('accessory_type')
      .pivotPrimaryKey(false);
  }
}

module.exports = TankType;
