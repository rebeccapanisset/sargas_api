const Helpers = use('Helpers');
const File = use('App/Models/File');

const paths = new Map([
  ['budget', 'orcamentos/'],
  ['contract', 'contratos/'],
  ['dealing', 'negociando/'],
]);

function generatePathName(type, code) {
  let path = code.replace(/[^\d]/g, '');

  path += '/';

  path += paths.get(type);

  return path;
}
class FileController {
  async store({ request, response }) {
    try {
      if (!request.file('file')) {
        return;
      }

      const upload = request.file('file', { size: '2mb' });

      const { type, cpf_cnpj } = request.all();

      const path = generatePathName(type, cpf_cnpj);

      const fileName = `${Date.now()}.${upload.subtype}`;

      await upload.move(Helpers.tmpPath(`/uploads/files/${path}`), {
        name: fileName,
      });

      if (!upload.moved()) {
        throw upload.error();
      }

      const file = await File.create({
        file: `${path}${fileName}`,
        name: upload.clientName,
        type: upload.type,
        subtype: upload.subtype,
      });

      return file;
    } catch (error) {
      return response.status(error.status || 500).send({
        error: {
          message:
            'Ocorreu um erro! Não foi passivel realizar o upload do arquivo.',
        },
      });
    }
  }

  async show({ params, response }) {
    try {
      const file = await File.findOrFail(params.id);

      return response.download(Helpers.tmpPath(`/uploads/files/${file.file}`));
    } catch (error) {
      return response.status(error.status || 500).send({
        error: {
          message: 'Ocorreu um erro! Arquivo não encontrado!',
        },
      });
    }
  }
}

module.exports = FileController;
