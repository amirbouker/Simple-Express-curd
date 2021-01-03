const status = require("http-status");

module.exports = class ResponseMiddleware {
  // Add custom responses
  static setup(req, res, next) {
    res.success = (data) => {
      res.success({
        success: true,
        data,
        status: status.OK,
      });
    };

    next();
  }
};
