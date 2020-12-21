const Sentry = require('@sentry/node');

const Config = use('Config');
const Env = use('Env');
const Youch = use('youch');
const BaseExceptionHandler = use('BaseExceptionHandler');

class ExceptionHandler extends BaseExceptionHandler {
  async handle(error, { request, response }) {
    if (error.name === 'ValidationException') {
      return response.status(error.status || 500).send(error.messages);
    }

    if (Env.get('NODE_ENV') === 'development') {
      const youch = new Youch(error, request.request);
      const errorJSON = await youch.toJSON();
      return response.status(error.status || 500).send(errorJSON);
    }

    return response.status(error.status || 500);
  }

  async report(error) {
    Sentry.init(Config.get('services.sentry'));
    Sentry.captureException(error);
  }
}

module.exports = ExceptionHandler;
