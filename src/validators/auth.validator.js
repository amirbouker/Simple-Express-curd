const Joi = require("@hapi/joi");
const { validate } = require("express-validation");
const { environment } = require("../../config");
module.exports = class AuthValidator {
  // POST /api/auth/register
  static register() {
    return validate({
      body: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        name: Joi.string().required(),
      }),
    });
  }
  static registerManager() {
    return validate({
      body: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        name: Joi.string().required(),
        managerKey: Joi.string().required().equal(environment.managerKey),
      }),
    });
  }
  // POST /api/auth/login
  static login() {
    return validate({
      body: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
      }),
    });
  }
};
