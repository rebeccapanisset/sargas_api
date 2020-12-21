class PdfTest {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      html: 'required',
    };
  }

  get messages() {
    return {
      'html.required':
        'Escreva alguma coisa no editor de texto para poder gerar um PDF de teste',
    };
  }
}

module.exports = PdfTest;
