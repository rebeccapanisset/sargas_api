const Route = use('Route');
const ExpireBudgetService = use('App/Services/ExpireBudgetService');
const DiscontinueBudgetService = use('App/Services/DiscontinueBudgetService');

Route.post('/expire-budget', ({ request }) => {
  ExpireBudgetService.expireThis();
});

Route.post('/discontinue-budget', ({ request }) => {
  DiscontinueBudgetService.discontinueThis();
});

// Forgot Password
Route.post('forgotpasswords', 'ForgotPasswordController.store').validator(
  'ForgotPassword'
);
Route.put('forgotpasswords', 'ForgotPasswordController.update').validator(
  'ResetPassword'
);

// Session
Route.post('sessions', 'SessionController.store').validator('Session');

// File
Route.get('files/:id', 'FileController.show');
Route.get('images/:id', 'ImageController.show');

Route.group(() => {
  // Contrato
  Route.post('contracts', 'ContractController.store').validator('Contract');
  // Orçamento
  Route.resource('budgets', 'BudgetController')
    .apiOnly()
    .validator(
      new Map([
        [['budgets.store'], ['Budget']],
        [['budgets.update'], ['Budget']],
      ])
    );
  // Relatório
  Route.get('reports', 'ReportController.index');

  // Negociar Orçamento
  Route.put(
    'negociate-budget/:id',
    'NegociateBudgetController.negociate'
  ).validator('NegociateBudget');

  // Enviar E-mail do Orçamento
  Route.put('send-budget/:id', 'SendBudgetController.send');

  // Arquivar e Desarquivar Orçamento
  Route.put(
    'change-discontinued-budget/:id',
    'ChangeDiscontinuedBudgetController.changeDiscontinued'
  );

  // Produto
  Route.delete('products/:id', 'ProductController.destroy');
  //   Tanque de Combustível
  Route.resource('fuel-tanks', 'FuelTankController')
    .apiOnly()
    .validator(
      new Map([
        [['fuel-tanks.store'], ['FuelTank']],
        [['fuel-tanks.update'], ['FuelTank']],
      ])
    );
  //   Tanque Pipa
  Route.resource('pipa-tanks', 'PipaTankController')
    .apiOnly()
    .validator(
      new Map([
        [['pipa-tanks.store'], ['PipaTank']],
        [['pipa-tanks.update'], ['PipaTank']],
      ])
    );
  //   Tanque Aéreo
  Route.resource('aerial-tanks', 'AerialTankController')
    .apiOnly()
    .validator(
      new Map([
        [['aerial-tanks.store'], ['AerialTank']],
        [['aerial-tanks.update'], ['AerialTank']],
      ])
    );
  //   Caixa D'Água
  Route.resource('water-tanks', 'WaterTankController')
    .apiOnly()
    .validator(
      new Map([
        [['water-tanks.store'], ['WaterTank']],
        [['water-tanks.update'], ['WaterTank']],
      ])
    );
  //   Acessório
  Route.resource('accessories', 'AccessoryController')
    .apiOnly()
    .validator(
      new Map([
        [['accessories.store'], ['Accessory']],
        [['accessories.update'], ['Accessory']],
      ])
    );
  //   Tipos de Tanque
  Route.get('tank-types', 'TankTypeController.index');
  Route.get('tank-types/:id', 'TankTypeController.show');

  // Cliente
  Route.resource('clients', 'ClientController')
    .apiOnly()
    .validator(
      new Map([
        [['clients.store'], ['Client']],
        [['clients.update'], ['Client']],
      ])
    );

  // Telefone
  Route.delete('phones/:id', 'PhoneController.destroy');

  // Caminhão
  Route.resource('trucks', 'TruckController')
    .apiOnly()
    .validator(
      new Map([
        [['trucks.store'], ['Truck']],
        [['trucks.update'], ['Truck']],
      ])
    );

  // File
  Route.post('files', 'FileController.store').validator('File');
  Route.post('images', 'ImageController.store').validator('Image');

  // Usuario
  Route.resource('users', 'UserController')
    .apiOnly()
    .validator(
      new Map([
        [['users.store'], ['User']],
        [['users.update'], ['User']],
      ])
    );

  // Password
  Route.put('passwords', 'PasswordController.update').validator(
    'UpdatePassword'
  );

  // Access
  Route.put('accesses/:id', 'AccessController.update');

  // Configurações
  Route.get('configurations', 'ConfigurationController.index');
  Route.put('configurations', 'ConfigurationController.update').validator(
    'Configuration'
  );
  //   Formas de Pagamento
  Route.delete('payment-methods/:id', 'PaymentMethodController.destroy');
  //   Tipos de Venda
  Route.delete('sale-types/:id', 'SaleTypeController.destroy');
  //   Tipos de Documentos
  Route.get('document-types', 'DocumentTypeController.index');
  Route.get('document-types/:id', 'DocumentTypeController.show');
  //   PDF
  Route.resource('pdfs', 'PdfController')
    .apiOnly()
    .validator(
      new Map([
        [['pdfs.store'], ['Pdf']],
        [['pdfs.update'], ['Pdf']],
      ])
    );
  Route.put('pdf-default/:id', 'PdfDefaultController.update');
  Route.post('pdf-test', 'PdfTestController.store').validator('PdfTest');
}).middleware(['auth']);
