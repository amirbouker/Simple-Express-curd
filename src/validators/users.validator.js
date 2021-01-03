const Joi = require("@hapi/joi");
const { validate } = require("express-validation");

module.exports = class UsersValidator {
  // GET /api/users
  static list() {
    return validate({
      query: Joi.object({
        page: Joi.number(),
      }),
    });
  }

  // GET /api/users/:id
  static get() {
    return validate({
      params: Joi.object({
        id: Joi.string(),
      }),
    });
  }

  // POST /api/users
  static create() {
    return validate({
      body: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
      }),
    });
  }

  // PUT /api/users/:id
  static edit() {
    return validate({
      params: Joi.object({
        id: Joi.string(),
      }),
      body: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
      }),
    });
  }

  // DELETE /api/users/:id
  static remove() {
    return validate({
      params: Joi.object({
        id: Joi.string(),
      }),
    });
  }
};
