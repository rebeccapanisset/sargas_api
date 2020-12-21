class Truck {
  get validateAll() {
    return true;
  }

  get rules() {
    const truckId = this.ctx.params.id;

    return {
      plate: `required|unique:trucks,plate,id,${truckId || 0}`,
      brand: 'required',
      model: 'required',
      year: 'integer',
      axes_number: 'required|integer',
      between_axes: 'required|number',
    };
  }

  get messages() {
    return {
      'plate.required': 'A placa é obrigatória e está faltando.',
      'plate.unique': 'Essa placa já existe e precisa ser única.',
      'brand.required': 'A marca é obrigatória e está faltando.',
      'model.required': 'O modelo é obrigatório e está faltando.',
      'year.integer': 'O ano de fabricação deve ser um número INTEIRO.',
      'axes_number.required':
        'A quantidade de eixos é obrigatória e está faltando.',
      'axes_number.integer':
        'A quantidade de eixos deve ser um número INTEIRO.',
      'between_axes.required':
        'A medida entre eixos é obrigatória e está faltando.',
      'between_axes.number': 'A medida entre eixos deve ser um número.',
    };
  }
}

module.exports = Truck;
