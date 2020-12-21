const Hash = use('Hash');

class PasswordController {
  async update({ auth, request, response }) {
    try {
      const { password, new_password } = request.all();

      const user = await auth.getUser();

      const isSame = await Hash.verify(password, user.password);

      if (!isSame) {
        return response.status(401).send({
          error: {
            session: 1,
            message: 'Ocorreu um erro! Senha inválida!',
          },
        });
      }

      user.password = new_password;

      await user.save();

      return user;
    } catch (error) {
      return response.status(error.status || 500).send({
        error: {
          message: 'Ocorreu um erro! Usuário não encontrado!',
        },
      });
    }
  }
}

module.exports = PasswordController;
