const User = use('App/Models/User');

class AccessController {
  async update({ params, request, response }) {
    try {
      const user = await User.findOrFail(params.id);

      const access = request.input('access');

      user.access = access;

      user.save();

      return user;
    } catch (error) {
      return response.status(error.status || 500).send({
        error: {
          message: 'Ocorreu um erro! O usuário não encontrado!',
        },
      });
    }
  }
}

module.exports = AccessController;
