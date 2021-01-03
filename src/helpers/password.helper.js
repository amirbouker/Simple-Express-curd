const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = class PasswordHelper {
  // Hash password
  static async hash(password) {
    const hashed = await bcrypt.hash(password, saltRounds);

    return hashed;
  }

  // Compare hash to password
  static async compare(password, hashed) {
    const match = await bcrypt.compare(password, hashed);

    return match;
  }
};
