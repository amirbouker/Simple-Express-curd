const Joi = require("@hapi/joi");
const { validate } = require("express-validation");

module.exports = class TransactionValidator {
  // GET /api/transactions
  static list() {
    return validate({
      query: Joi.object({
        page: Joi.number(),
      }),
    });
  }

  // GET /api/transactions/:id
  static get() {
    return validate({
      params: Joi.object({
        id: Joi.string(),
      }),
    });
  }

  // POST /api/transactions
  static create() {
    return validate({
      body: Joi.object({
        user_id: Joi.string().required(),
        curency: Joi.string().required(),
        value: Joi.number().required(),
        company_id: Joi.string().required(),
      }),
    });
  }

  // PUT /api/transactions/:id
  static edit() {
    return validate({
      params: Joi.object({
        id: Joi.string().required(),
      }),
      body: Joi.object({
        user_id: Joi.string().required(),
        curency: Joi.string().required(),
        value: Joi.number().required(),
        company_id: Joi.string().required(),
      }),
    });
  }

  // DELETE /api/transactions/:id
  static remove() {
    return validate({
      params: Joi.object({
        id: Joi.string(),
      }),
    });
  }
};
