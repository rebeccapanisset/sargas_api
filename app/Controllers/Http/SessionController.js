const User = use('App/Models/User');

class SessionController {
  async store({ auth, request, response }) {
    try {
      const { username, password } = request.all();

      const user = await User.findByOrFail('username', username);

      await user.load('signature');

      const token = await auth.attempt(username, password);

      return { token, user };
    } catch (error) {
      return response.status(error.status || 500).send({
        error: {
          session: 1,
          message: 'Ocorreu um erro! Usuário ou senha inválidos!',
        },
      });
    }
  }
}

module.exports = SessionController;
