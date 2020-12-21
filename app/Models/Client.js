const Model = use('Model');

class Client extends Model {
  phones() {
    return this.hasMany('App/Models/Phone');
  }
}

module.exports = Client;
