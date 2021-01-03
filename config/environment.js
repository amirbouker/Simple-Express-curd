const Joi = require("@hapi/joi");

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require("dotenv").config();

// define validation for all the env vars
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow("development", "production")
    .default("development"),
  PORT: Joi.number().default(5000),
  JWT_SECRET: Joi.string().required(),
  JWT_ISSUER: Joi.string().required(),
  MAILER_ADDRESS: Joi.string().required(),
  MAILER_PASSWORD: Joi.string().required(),
})
  .unknown()
  .required();

const { error, value: envVars } = envVarsSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  dbUrl: envVars.DB_URL,
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  managerKey: envVars.MANAGER_KEY,
  jwt: {
    jwtSecret: envVars.JWT_SECRET,
    jwtIssuer: envVars.JWT_ISSUER,
  },
  nodeMailer: {
    address: envVars.MAILER_ADDRESS,
    password: envVars.MAILER_PASSWORD,
  },
};

module.exports = config;
