const status = require('http-status');
const Raven = require('raven');

const { environment } = require('../../config');

Raven
  .config(environment.sentryDSN)
  .install();

module.exports = class ErrorMiddleware {
  // Api global error handler
  // eslint-disable-next-line no-unused-vars
  static handler(error, req, res, next) {
    let { message } = error;

    // Check if error comes from param validation
    if (error.details) {
      error.status = status.BAD_REQUEST;
      if (error.details.body) {
        message = error.details.body[0].message;
      }
      if (error.details.query) {
        message = error.details.query[0].message;
      }
      if (error.details.params) {
        message = error.details.params[0].message;
      }
    }

    const _status = error.status || status.INTERNAL_SERVER_ERROR;

    if (_status === status.INTERNAL_SERVER_ERROR) {
      // Throw error to sentry
      if (environment.env === 'production') {
        Raven.captureException(error);
      }
    }

    res
      .status(_status)
      .json({
        success: false,
        error: message,
        code: error.errorCode || _status,
        status: _status,
        stack: environment.env == 'development' ? error.stack : undefined,
      });
  }
};
