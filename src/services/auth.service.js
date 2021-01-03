const status = require("http-status");

const ApiError = require("../helpers/error.helper");
const Errors = require("../helpers/custom-errors.helper");
const PasswordHelper = require("../helpers/password.helper");
const JwtHelper = require("../helpers/jwt.helper");

const UsersService = require("./users.service");

module.exports = class AuthService {
  static async register(userData) {
    // Hash the password
    const hashedPassword = await PasswordHelper.hash(userData.password);
    const oldPassword = userData.password;
    userData.password = hashedPassword;

    // Create the user
    const user = await UsersService.create(userData);

    // Authenticate the user
    const authData = await this.login(user.email, oldPassword);

    return authData;
  }

  static async login(body) {
    let { email, password } = body;
    if (email) {
      email = email.toLowerCase();
    }

    const user = await UsersService.findOne({
      email,
    });
    // Check password
    const passwordMatch = await PasswordHelper.compare(password, user.password);

    if (!passwordMatch) {
      throw new ApiError(Errors.AUTH.WRONG_PASSWORD, status.UNAUTHORIZED);
    }

    // Create JWT token
    const authData = JwtHelper.sign({
      userId: user.id,
      role: user.role,
    });

    return authData;
  }
};
