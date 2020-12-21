const crypto = require('crypto');

const Job = use('App/Jobs/NewUserEmail');
const User = use('App/Models/User');

const Kue = use('Kue');

class UserController {
  async index({ auth, request }) {
    const { filter = '', page, pagination = 10 } = request.get();

    const user = await auth.getUser();

    const users = await User.query()
      .select('id', 'name', 'username', 'email', 'access')
      .where((builder) => {
        builder
          .where('name', 'ILIKE', `%${filter}%`)
          .orWhere('username', 'ILIKE', `%${filter}%`);
      })
      .whereNot('id', user.id)
      .orderBy('id', 'desc')
      .paginate(page, pagination);

    return users;
  }

  async store({ request }) {
    const data = request.only([
      'name',
      'username',
      'email',
      'access',
      'signature_id',
    ]);

    const password = crypto.randomBytes(4).toString('hex').toUpperCase();

    const user = await User.create({
      ...data,
      signature_id: data.signature_id || 1,
      password,
    });

    Kue.dispatch(
      Job.key,
      {
        email: data.email,
        name: data.name,
        username: data.username,
        password,
      },
      { attempts: 3 } // tenta enviar o e-mail 3 vezes
    );

    return user;
  }

  async show({ params, response }) {
    try {
      const user = await User.findOrFail(params.id);

      await user.load('signature');

      return user;
    } catch (error) {
      return response.status(error.status || 500).send({
        error: {
          message: 'Ocorreu um erro! Usuário não encontrado!',
        },
      });
    }
  }

  async update({ params, request, response }) {
    try {
      const user = await User.findOrFail(params.id);

      const data = request.only([
        'name',
        'username',
        'email',
        'access',
        'signature_id',
      ]);

      user.merge(data);

      await user.save();

      await user.load('signature');

      return user;
    } catch (error) {
      return response.status(error.status || 500).send({
        error: {
          message: 'Ocorreu um erro! Usuário não encontrado!',
        },
      });
    }
  }

  async destroy({ params, response }) {
    try {
      const user = await User.findOrFail(params.id);

      // TODO: Deletar arquivo de assinatura
      // TODO: Deletar assinatura do banco

      await user.delete();
    } catch (error) {
      response.status(error.status || 500).send({
        error: {
          message: 'Ocorreu um erro! Usuário não encontrado!',
        },
      });
    }
  }
}

module.exports = UserController;
