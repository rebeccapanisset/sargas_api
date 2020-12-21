const crypto = require('crypto');
const moment = require('moment');

const Job = use('App/Jobs/RecoverPasswordEmail');
const User = use('App/Models/User');

const Kue = use('Kue');

class ForgotPasswordController {
  async store({ request, response }) {
    try {
      const email = request.input('email');
      const user = await User.findByOrFail('email', email);

      user.token = crypto.randomBytes(10).toString('hex');
      user.token_created_at = new Date();

      await user.save();

      Kue.dispatch(
        Job.key,
        {
          email,
          name: user.name,
          token: user.token,
          link: `${request.input('redirect_url')}?token=${user.token}`,
        },
        { attempts: 3 } // tenta enviar o e-mail 3 vezes
      );

      return user;
    } catch (error) {
      return response.status(error.status || 500).send({
        error: {
          message: 'Ocorreu um erro! Esse e-mail existe?',
        },
      });
    }
  }

  async update({ request, response }) {
    try {
      const { token, password } = request.all();

      const user = await User.findByOrFail('token', token);

      const tokenExpired = moment()
        .subtract('2', 'days')
        .isAfter(user.token_created_at);

      if (tokenExpired) {
        return response.status(401).send({
          error: {
            message: 'O token de recuperação está expirado!',
          },
        });
      }

      user.token = null;
      user.token_created_at = null;
      user.password = password;

      await user.save();

      return user;
    } catch (error) {
      return response.status(error.status || 500).send({
        error: {
          message: 'Ocorreu um erro! Não foi passível resetar sua senha.',
        },
      });
    }
  }
}

module.exports = ForgotPasswordController;
