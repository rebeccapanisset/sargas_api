const Model = use('Model');

class Contract extends Model {
  budget() {
    return this.belongsTo('App/Models/Budget');
  }

  pdf() {
    return this.belongsTo('App/Models/File', 'pdf_id', 'id');
  }

  type() {
    return this.belongsTo('App/Models/TankType', 'type_id', 'id');
  }

  user() {
    return this.belongsTo('App/Models/User');
  }
}

module.exports = Contract;
