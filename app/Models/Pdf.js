const Model = use('Model');

class Pdf extends Model {
  /**
   * Estrutura:
   *
   * id: integer
   * title: string
   * content: text
   * default: boolean
   * type_id: integer -> type: TankType
   * doc_type_id: integer -> documentType: DocumentType
   */

  documentType() {
    return this.hasOne('App/Models/DocumentType', 'doc_type_id', 'id');
  }

  type() {
    return this.hasOne('App/Models/TankType', 'type_id', 'id');
  }
}

module.exports = Pdf;
