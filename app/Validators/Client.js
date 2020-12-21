// const Antl = use('Antl');

class Client {
  get validateAll() {
    return true;
  }

  get rules() {
    const clientId = this.ctx.params.id;

    return {
      name: 'required',
      person_indicator: 'required',
      cpf_cnpj: `required|unique:clients,cpf_cnpj,id,${clientId || 0}`,
      ie: 'required_when:person_indicator,PJ',
      email: 'required|email',
      phones: 'array|required',
      zip_code: 'required',
      address: 'required',
      neighborhood: 'required',
      city: 'required',
      state: 'required|max:2',
    };
  }

  get messages() {
    return {
      'name.required': 'O nome é obrigatório e está faltando.',
      'person_indicator.required':
        'O indicador de pessoa é obrigatório e está faltando.',
      'cpf_cnpj.required': 'O CPF/CNPJ é obrigatório e está faltando.',
      'cpf_cnpj.unique': 'Esse CPF/CNPJ já existe e precisa ser único.',
      'ie.required_when':
        'A inscrição estadual é obrigatória para Pessoa Jurídica (PJ).',
      'email.required': 'O e-mail é obrigatório e está faltando.',
      'email.email': 'O e-mail deve ser válido.',
      'phones.array': 'Os telefones devem ser enviados em formato de array',
      'phones.required':
        'É necessário cadastrar pelo menos um número de telefone.',
      'zip_code.required': 'O CEP é obrigatório e está faltando.',
      'address.required': 'O endereço é obrigatório e está faltando.',
      'neighborhood.required': 'O bairro é obrigatório e está faltando.',
      'city.required': 'A cidade é obrigatória e está faltando.',
      'state.required': 'O estado é obrigatório e está faltando.',
      'state.max': 'O estado não deve ser maior que 2 letras.',
    };
  }
}

module.exports = Client;
