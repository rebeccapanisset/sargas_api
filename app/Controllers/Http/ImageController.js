const Helpers = use('Helpers');
const File = use('App/Models/File');

const paths = new Map([
  ['signature', 'users/signature/'],
  ['fuel', 'tanks/fuel/'],
  ['pipa', 'tanks/pipa/'],
  ['aerial', 'tanks/aerial/'],
  ['water', 'tanks/water/'],
  ['pdf', 'pdf_config/'],
]);
class ImageController {
  async store({ request, response }) {
    try {
      if (!request.file('file')) {
        return;
      }

      const upload = request.file('file', { size: '2mb' });

      const { type } = request.all();

      const path = paths.get(type);

      const fileName = `${Date.now()}.${upload.subtype}`;

      await upload.move(Helpers.tmpPath(`/uploads/images/${path}`), {
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

      return response.download(Helpers.tmpPath(`/uploads/images/${file.file}`));
    } catch (error) {
      return response.status(error.status || 500).send({
        error: {
          message: 'Ocorreu um erro! Arquivo não encontrado!',
        },
      });
    }
  }
}

module.exports = ImageController;
