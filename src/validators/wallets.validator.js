const Joi = require("@hapi/joi");
const { validate } = require("express-validation");

module.exports = class WalletValidator {
  // GET /api/wallets
  static list() {
    return validate({
      query: Joi.object({
        page: Joi.number(),
      }),
    });
  }

  // GET /api/wallets/:id
  static get() {
    return validate({
      params: Joi.object({
        id: Joi.string(),
      }),
    });
  }

  // POST /api/wallets
  static create() {
    return validate({
      body: Joi.object({
        user_id: Joi.string().required(),
        transactions: Joi.array().required(),
      }),
    });
  }

  // PUT /api/wallets/:id
  static edit() {
    return validate({
      params: Joi.object({
        id: Joi.string().required(),
      }),
      body: Joi.object({
        user_id: Joi.string().required(),
        transactions: Joi.array().required(),
      }),
    });
  }

  // DELETE /api/wallets/:id
  static remove() {
    return validate({
      params: Joi.object({
        id: Joi.string(),
      }),
    });
  }
};
