const Joi = require("@hapi/joi");
const { validate } = require("express-validation");

module.exports = class CompanyValidator {
  // GET /api/companies
  static list() {
    return validate({
      query: Joi.object({
        page: Joi.number(),
      }),
    });
  }

  // GET /api/companies/:id
  static get() {
    return validate({
      params: Joi.object({
        id: Joi.string(),
      }),
    });
  }

  // POST /api/companies
  static create() {
    return validate({
      body: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        address: Joi.string().min(6).required(),
        programmes: Joi.string().min(6),
        manager: Joi.string().min(6).required(),
      }),
    });
  }

  // PUT /api/companies/:id
  static edit() {
    return validate({
      params: Joi.object({
        id: Joi.string().required(),
      }),
      body: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        address: Joi.string().min(6).required(),
        programmes: Joi.string().min(6),
        manager: Joi.string().min(6).required(),
      }),
    });
  }

  // DELETE /api/companies/:id
  static remove() {
    return validate({
      params: Joi.object({
        id: Joi.string(),
      }),
    });
  }
};
