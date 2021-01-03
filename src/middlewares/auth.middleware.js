const status = require('http-status');

const JwtHelper = require('../helpers/jwt.helper');
const APIError = require('../helpers/error.helper');
const Errors = require('../helpers/custom-errors.helper');

const UsersService = require('../services/users.service');

module.exports = class AuthMiddleware {
  // Check if valid JWT
  static check(optional = false) {
    return async (req, res, next) => {
      try {
        // Get token from headers
        const authorization = req.get('Authorization');

        if (!authorization && !optional) {
          throw new APIError(Errors.AUTH.AUTHORIZATION_REQUIRED, status.UNAUTHORIZED);
        }

        if (authorization) {
          // Extract JWT
          const token = authorization.split('Bearer')[1].trim();

          // Verify JWT
          const decoded = JwtHelper.verify(token);

          const user = await UsersService.getOne(decoded.userId);

          req.user = user;
        }

        next();
      } catch (error) {
        next(error);
      }
    };
  }
};
