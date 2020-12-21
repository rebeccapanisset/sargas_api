const PaymentMethod = use('App/Models/PaymentMethod');
const SaleType = use('App/Models/SaleType');
const Configuration = use('App/Models/Configuration');

class ConfigurationController {
  async index({ response }) {
    try {
      const payment_methods = await PaymentMethod.all();

      const sale_types = await SaleType.all();

      const configuration = await Configuration.first();

      if (configuration.pdf_header_id) {
        await configuration.load('header');
      }

      if (configuration.pdf_footer_id) {
        await configuration.load('footer');
      }

      if (configuration.pdf_watermark_id) {
        await configuration.load('watermark');
      }

      return { configuration, payment_methods, sale_types };
    } catch (error) {
      return response.status(error.status || 500).send({
        error: {
          message: 'Ocorreu um erro! As configurações não foram salvas!',
        },
      });
    }
  }

  async update({ request, response }) {
    try {
      const configuration = await Configuration.firstOrFail();

      const { payment_methods, sale_types, ...configData } = request.all();

      await configuration.merge(configData);

      await configuration.save();

      if (configuration.pdf_header_id) {
        await configuration.load('header');
      }

      if (configuration.pdf_footer_id) {
        await configuration.load('footer');
      }

      if (configuration.pdf_watermark_id) {
        await configuration.load('watermark');
      }

      const paymentMethods = await Promise.all(
        payment_methods.map(async (payMethod) => {
          if (!payMethod.id) {
            const result = await PaymentMethod.create(payMethod);
            return result;
          }
          return PaymentMethod.query()
            .where('id', payMethod.id)
            .first()
            .then(async (existingPayMethod) => {
              if (existingPayMethod) {
                await existingPayMethod.merge(payMethod);
                await existingPayMethod.save();
                return existingPayMethod;
              }
              const result = await PaymentMethod.create(payMethod);
              return result;
            });
        })
      );

      const saleTypes = await Promise.all(
        sale_types.map(async (saleType) => {
          if (!saleType.id) {
            const result = await SaleType.create(saleType);
            return result;
          }
          return SaleType.query()
            .where('id', saleType.id)
            .first()
            .then(async (existingSaleType) => {
              if (existingSaleType) {
                await existingSaleType.merge(saleType);
                await existingSaleType.save();
                return existingSaleType;
              }
              const result = await SaleType.create(saleType);
              return result;
            });
        })
      );

      return { configuration, paymentMethods, saleTypes };
    } catch (error) {
      return response.status(error.status || 500).send({
        error: {
          message: 'Ocorreu um erro! As configurações não foram salvas!',
        },
      });
    }
  }
}

module.exports = ConfigurationController;
