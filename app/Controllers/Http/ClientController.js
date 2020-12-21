const Client = use('App/Models/Client');
const Phone = use('App/Models/Phone');

class ClientController {
  async index({ request }) {
    /* Recupera,  por desestrturação, os dados da requisição - request - filter (se houver),
    page e pagination */
    const { filter = '', page, pagination = 10 } = request.get();
    /* Busca no banco, os dados de clients  onde name ou cpf_cnpj
    corresponda ao filter. Se filter for vazio busca todos os
    registros */
    const clients = await Client.query()
      .with('phones')
      .where('name', 'ILIKE', `%${filter}%`)
      .orWhere('cpf_cnpj', 'ILIKE', `%${filter}%`)
      .orderBy('id', 'desc')
      .paginate(page, pagination);

    return clients;
  }

  async store({ request }) {
    const { phones, ...data } = request.except(['person_indicator']);

    const client = await Client.create(data);

    await client.phones().createMany(phones);

    return client;
  }

  async show({ params, response }) {
    try {
      const client = await Client.findOrFail(params.id);

      await client.load('phones');

      return client;
    } catch (error) {
      return response.status(error.status || 500).send({
        error: {
          message: 'Ocorreu um erro! Cliente não encontrado!',
        },
      });
    }
  }

  async update({ params, request, response }) {
    try {
      const client = await Client.findOrFail(params.id);

      const { phones, ...data } = request.except(['person_indicator']);

      client.merge(data);

      await client.save();

      const phonesResult = await Promise.all(
        phones.map(async (phone) => {
          if (!phone.id) {
            const result = await Phone.create(phone);
            return result;
          }
          return Phone.query()
            .where('id', phone.id)
            .first()
            .then(async (existingPhone) => {
              if (existingPhone) {
                await existingPhone.merge(phone);
                await existingPhone.save();
                return existingPhone;
              }
              const result = await Phone.create(phone);
              return result;
            });
        })
      );

      return { client, phonesResult };
    } catch (error) {
      return response.status(error.status || 500).send({
        error: {
          message: 'Ocorreu um erro! Cliente não encontrado!',
        },
      });
    }
  }

  async destroy({ params, response }) {
    try {
      const client = await Client.findOrFail(params.id);

      await client.phones().delete();

      await client.delete();
    } catch (error) {
      response.status(error.status || 500).send({
        error: {
          message: 'Ocorreu um erro! Cliente não encontrado!',
        },
      });
    }
  }
}

module.exports = ClientController;
