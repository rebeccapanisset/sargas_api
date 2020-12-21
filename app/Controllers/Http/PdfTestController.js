// NodeJs libs
const fs = require('fs');
const PDF = require('pdf-creator-node');
const Handlebars = require('handlebars');

// Adonis libs
const Antl = use('Antl');
const Helpers = use('Helpers');

// Models
const Configuration = use('App/Models/Configuration');
const File = use('App/Models/File');

class PdfTestController {
  async store({ request, response }) {
    try {
      const { html, doc_type } = request.all();

      const budget = {
        id: 445,
        created_at: Date.now(), // dia de criação
        delivery_days: 60, // dias p/ entrega
        compartment_position: '4/4/4/4',
        amount: 1,
        requester: 'Luiz Leandro Gomes',
        total: 'R$ 45.000,00',
        notes:
          'Phasellus semper auctor sem sit amet congue. Pellentesque tincidunt, lacus quis malesuada efficitur, elit tortor consectetur mauris, sit amet tempor leo erat sit amet mi. Sed rutrum mollis sapien. Duis dictum interdum porta. Nullam condimentum erat leo, at vestibulum nulla dignissim id. Maecenas tincidunt sapien quis iaculis dictum. Suspendisse vel consectetur libero. Morbi non lobortis libero.',
        type: {
          name: 'Combustível',
        },
        client: {
          name: 'Transpostes Tanques',
          cpf_cnpj: '63.958.620/0001-58',
          ie: '10.580.047-3',
          email: 'contato@transportes.com.br',
          phone: '(62) 3869-8840',
          zip_code: '74535-380',
          address: 'Rua Duque de Caxias N° 974',
          neighborhood: 'Vila São Jorge',
          city: 'Anápolis',
          state: 'GO',
        },
        truck: {
          plate: 'KBM-6931',
          brand: 'SCANIA',
          model: 'P320',
          year: 2020,
          color: 'Vermelho',
          chassi: '4py Z6WXr0 4m hT5822',
          axes_number: 4,
          between_axes: '5,50',
        },
        product: {
          description: '16.000 / 04 COMP - TOP',
          price: 'R$ 41.000,00',
          volume: 16000,
          length: 4,
          diameter: 1,
        },
        user: {
          name: 'Fernando Braga',
          email: 'fernando_braga91@hotmail.com',
          signature_id: 1,
        },
        saleType: {
          sale_type: 'Rec. Próprio',
        },
        paymentMethod: {
          payment_method: 'À vista',
        },
        accessories: [
          {
            id: 1,
            name: 'GUINCHO ELÉTRICO PARA 500KG COM SUPORTE GIRATÓRIO',
            price: 'R$ 1.000,00',
          },
          {
            id: 2,
            name:
              'BOMBA 12V PARA ABASTECIMENTO - VAZÃO 40L/MIN (BICO, MNAGUEIRA)',
            price: 'R$ 1.000,00',
          },
          {
            id: 3,
            name: 'RESERVATÓRIO INOX PARA ARLA 32 - CAPACIDADE 200 LT',
            price: 'R$ 1.000,00',
          },
          {
            id: 4,
            name: 'KIT ABASTECIMENTO DE ARLA 32 - 12 V',
            price: 'R$ 1.000,00',
          },
        ],
      };

      const contract = {
        installments_num: 2,
        payment_1: {
          value: 'R$ 6.750,00',
          due_date: '10/01/2021',
        },
        payment_2: {
          value: 'R$ 12.750,00',
          due_date: '10/04/2021',
        },
        installments: [
          {
            value: 'R$ 12.750,00',
            due_date: '10/02/2021',
          },
          {
            value: 'R$ 12.750,00',
            due_date: '10/03/2021',
          },
        ],
        private_value: 'R$ 6.750,00',
        finance_value: 'R$ 38.250,00',
        finance_type: 'Banco do Brasil',
      };

      // Pega tudo que precisa do banco
      const config = await Configuration.first();
      const userSignature = await File.findOrFail(budget.user.signature_id);

      // Carrega os relacionamentos da configuração
      const header = config.pdf_header_id
        ? await config.header().fetch()
        : null;
      const footer = config.pdf_footer_id
        ? await config.footer().fetch()
        : null;
      const watermark = config.pdf_watermark_id
        ? await config.watermark().fetch()
        : null;

      // Caminho dos arquivos de imagem
      const headerPath = header
        ? Helpers.tmpPath(`/uploads/images/${header.file}`)
        : '';
      const footerPath = footer
        ? Helpers.tmpPath(`/uploads/images/${footer.file}`)
        : '';
      const watermarkPath = watermark
        ? Helpers.tmpPath(`/uploads/images/${watermark.file}`)
        : '';
      const signaturePath = Helpers.tmpPath(
        `/uploads/images/${userSignature.file}`
      );

      // Formata a data de criação do orçamento para extenso e em português.
      const date = Antl.formatDate(new Date(budget.created_at), {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });

      // Caminho e nome do PDF
      const path = Helpers.tmpPath(`/uploads/tests/orcamento/teste.pdf`);

      // Carrega o arquivo de template
      const template = fs.readFileSync(
        Helpers.resourcesPath('/views/pdf/template.html'),
        'utf8'
      );

      // Insere os dados iniciais no template
      const templateHtml = Handlebars.compile(template)({
        number: budget.id,
        date,
        content: html,
        header: headerPath,
        footer: footerPath,
        watermark: watermarkPath,
      });

      const installmentsHtml =
        '<ol>{{#each installments}}<li>{{this.value}} - {{this.due_date}}</li>{{/each}}</ol>';
      const listHtml =
        '<ol>{{#each accessories}}<li>{{this.name}}</li>{{/each}}</ol>';
      const tableHtml =
        '<table><thead><tr><th>Nome</th><th>Preço</th></tr></thead><tbody>{{#each accessories}}<tr><td>{{this.name}}</td><td>{{this.price}}</td></tr>{{/each}}</tbody></table>';
      const signatureHtml =
        '<div class="signature"><strong><img src="file://{{signature}}"><br></strong>{{user.name}}</div>' +
        '<div class="clientSignature"><strong>&nbsp;&nbsp;</strong></div>';

      // Insere os dados das parcelas
      const installmentsList = Handlebars.compile(installmentsHtml)({
        installments: contract.installments,
      });

      // Insere os dados dos acessórios
      const accessoriesList = Handlebars.compile(listHtml)({
        accessories: budget.accessories,
      });
      const accessoriesTable = Handlebars.compile(tableHtml)({
        accessories: budget.accessories,
      });

      // Insere os dados das assinaturas
      const signatures = Handlebars.compile(signatureHtml)({
        signature: signaturePath,
        user: budget.user,
      });

      const document = {
        html: templateHtml,
        data: {
          ...budget,
          contract: {
            ...contract,
            payment_1: contract.payment_1,
            payment_2: contract.payment_2,
          },
          accessoriesList,
          accessoriesTable,
          installmentsList,
          signatures,
        },
        path,
      };

      const options = {
        format: 'A4',
        border: {
          top: '0px',
          right: '0px',
          bottom: '70px',
          left: '0px',
        },
        header: {
          height: '160px',
        },
        footer: {
          height: '1px',
        },
      };

      const filename = await PDF.create(document, options)
        .then((res) => {
          return res.filename;
        })
        .catch((error) => {
          return null;
        });

      if (filename) return response.download(filename);
      throw Error;
    } catch (error) {
      console.log(error);
    }

    return null;
  }
}

module.exports = PdfTestController;
