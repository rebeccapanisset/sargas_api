const Model = use('Model');

class Configuration extends Model {
  header() {
    return this.hasOne('App/Models/File', 'pdf_header_id', 'id');
  }

  footer() {
    return this.hasOne('App/Models/File', 'pdf_footer_id', 'id');
  }

  watermark() {
    return this.hasOne('App/Models/File', 'pdf_watermark_id', 'id');
  }
}

module.exports = Configuration;
