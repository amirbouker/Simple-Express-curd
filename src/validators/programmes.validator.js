const Joi = require("@hapi/joi");
const { validate } = require("express-validation");

module.exports = class ProgramValidator {
  // GET /api/programmes
  static list() {
    return validate({
      query: Joi.object({
        page: Joi.number(),
      }),
    });
  }

  // GET /api/programmes/:id
  static get() {
    return validate({
      params: Joi.object({
        id: Joi.string(),
      }),
    });
  }

  // POST /api/programmes
  static create() {
    return validate({
      body: Joi.object({
        name: Joi.string().required(),
        companies: Joi.array().required(),
        description: Joi.string().min(6).required(),
        curencyName: Joi.string().min(6),
        category: Joi.string().min(6).required(),
        type: Joi.string().min(6).required(),
      }),
    });
  }

  // PUT /api/programmes/:id
  static edit() {
    return validate({
      params: Joi.object({
        id: Joi.string().required(),
      }),
      body: Joi.object({
        name: Joi.string().required(),
        companies: Joi.array().required(),
        description: Joi.string().min(6).required(),
        curencyName: Joi.string().min(6),
        category: Joi.string().min(6).required(),
        type: Joi.string().min(6).required(),
      }),
    });
  }

  // DELETE /api/programmes/:id
  static remove() {
    return validate({
      params: Joi.object({
        id: Joi.string(),
      }),
    });
  }
};
