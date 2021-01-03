const status = require('http-status');
const APIError = require('../helpers/error.helper');
const Roles = require('../helpers/role.helper');

module.exports = class RoleMiddleware {
  // Validate user's role
  static validate(roles) {
    if (typeof roles === 'string') {
      roles = [roles];
    }

    return (req, res, next) => {
      if (req.user) {
        if (req.user.role === Roles.SuperAdmin) {
          return next();
        }
        if (roles.length && roles.includes(req.user.role)) {
          return next();
        }
      }

      return next(new APIError('Permission denied', status.FORBIDDEN));
    };
  }
};
