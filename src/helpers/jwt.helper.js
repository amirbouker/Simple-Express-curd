const jwt = require('jsonwebtoken');

const { environment } = require('../../config');

module.exports = class JwtHelper {
  static sign(payload) {
    const token = jwt.sign(
      payload,
      environment.jwt.jwtSecret,
      {
        expiresIn: '10 days',
        issuer: environment.jwt.jwtIssuer
      },
    );

    console.log({
      token
    });

    return token;
  }

  static verify(token) {
    const decoded = jwt.verify(
      token,
      environment.jwt.jwtSecret,
    );

    console.log({
      decoded
    });

    return decoded;
  }
};
