// NodeJs libs
const fs = require('fs');
const Handlebars = require('handlebars');
const PdfGenerator = require('pdf-creator-node');

// Adonis Libs
const Antl = use('Antl');
const Helpers = use('Helpers');

// Models
const Accessory = use('App/Models/Accessory');
const Configuration = use('App/Models/Configuration');
const File = use('App/Models/File');
const PDF = use('App/Models/Pdf');

// Constants
const paths = new Map([
  ['budget', 'orcamentos'],
  ['contract', 'contratos'],
  ['dealing', 'negociando'],
]);

const productTypes = new Map([
  [1, 'fuelTank'],
  [2, 'pipaTank'],
  [3, 'aerialTank'],
  [4, 'waterTank'],
]);

const installmentsHtml =
  '<ol>{{#each installments}}<li>{{this.value}} - {{this.due_date}}</li>{{/each}}</ol>';
const listHtml =
  '<ol>{{#each accessories}}<li>{{this.name}}</li>{{/each}}</ol>';
const tableHtml =
  '<table><thead><tr><th>Nome</th><th>Preço</th></tr></thead><tbody>{{#each accessories}}<tr><td>{{this.name}}</td><td>{{this.formatedPrice}}</td></tr>{{/each}}</tbody></table>';
const signatureHtml =
  '<div class="signature"><strong><img src="file://{{signature}}"><br></strong>{{user.name}}</div>' +
  '<div class="clientSignature"><strong>&nbsp;&nbsp;</strong></div>';

function generatePathName(type, code) {
  let path = code.replace(/[^\d]/g, '');

  path += '/';

  path += paths.get(type);

  return path;
}

async function generate({
  budget,
  accessoriesIds,
  pdfTypeId,
  docType,
  contract,
}) {
  // Pega tudo que precisa do banco
  const pdfTemplate = await PDF.findOrFail(pdfTypeId);
  const config = await Configuration.first();
  let accessories;
  if (accessoriesIds) {
    accessories = await Accessory.query().whereIn('id', accessoriesIds).fetch();
  } else {
    accessories = await budget.accessories().fetch();
  }
  const accessoriesJSON = accessories.toJSON();

  // Carrega dados do orçamento
  await budget.loadMany([
    'type',
    'client',
    'truck',
    `product.${productTypes.get(budget.type_id)}`,
    'user',
    'saleType',
    'paymentMethod',
    'accessories',
  ]);
  const budgetJSON = budget.toJSON();

  const userSignature = budgetJSON.user.signature_id
    ? await File.findOrFail(budgetJSON.user.signature_id)
    : await File.findOrFail(1); // Assinatura default

  // Carrega os relacionamentos da configuração
  const header = config.pdf_header_id ? await config.header().fetch() : null;
  const footer = config.pdf_footer_id ? await config.footer().fetch() : null;
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

  // Gera o caminho e nome do PDF
  const path = generatePathName(docType, budgetJSON.client.cpf_cnpj);
  const fileName = `${Date.now()}.pdf`;

  // Carrega o arquivo de template
  const template = fs.readFileSync(
    Helpers.resourcesPath('/views/pdf/template.html'),
    'utf8'
  );

  // Insere os dados iniciais no template
  const templateHtml = Handlebars.compile(template)({
    number: budgetJSON.id,
    date,
    content: pdfTemplate.content,
    header: headerPath,
    footer: footerPath,
    watermark: watermarkPath,
  });

  // Insere os dados das parcelas
  let installmentsList;
  if (contract) {
    installmentsList = Handlebars.compile(installmentsHtml)({
      installments: contract.installments,
    });
  }

  // Insere os dados dos acessórios
  const accessoriesList = Handlebars.compile(listHtml)({
    accessories: accessoriesJSON,
  });
  const accessoriesTable = Handlebars.compile(tableHtml)({
    accessories: accessoriesJSON,
  });

  // Insere os dados das assinaturas
  const signatures = Handlebars.compile(signatureHtml)({
    signature: signaturePath,
    user: budgetJSON.user,
  });

  let data = {
    ...budgetJSON,
    total: budgetJSON.formatedTotal,
    product: {
      ...budgetJSON.product,
      ...budgetJSON.product[productTypes.get(budget.type_id)],
      price: budgetJSON.product.formatedPrice,
    },
    accessoriesList,
    accessoriesTable,
    signatures,
  };

  if (contract) {
    data = {
      ...data,
      contract: {
        ...contract,
        payment_1: contract.payment_1,
        payment_2: contract.payment_2,
      },
      installmentsList,
    };
  }

  const document = {
    html: templateHtml,
    data,
    path: Helpers.tmpPath(`/uploads/files/${path}/${fileName}`), // onde o arquivo ficará salvo + o nome do arquivo
  };

  // Opções de configuração para gerar o PDF
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

  // TODO: Rever sobre erro quando gerar o PDF.
  await PdfGenerator.create(document, options)
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });

  return { fileName, path };
}

module.exports = generate;
