const AuthService = require("../services/auth.service");
const UsersService = require("../services/users.service");
module.exports = class AuthController {
  /**
   * @api {post} /register Create user entry
   * @apiVersion 0.0.1
   * @apiName Register
   * @apiGroup Auth
   *
   * @apiSuccess {Boolean} success Specify if request succeded
   * @apiSuccess {String} data.user.name User's name
   * @apiSuccess {String} data.user.email User's email
   * @apiSuccess {String} data.token User's token
   *
   * @apiSuccessExample Success-Response:
   *     HTTP 200 OK
   *     {
   *       success: true,
   *       data: {user:{
   *         "name": "John Doe",
   *         "email": "jhon.doe@gmail.com"
   *       }
   * 	  token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3Mjk4MmQ2My1lNTI2LTQwM2QtOTQxOC0wMmU3NGIzYjYxNmEiLCJpYXQiOjE1OTQyMTEwNzYsImV4cCI6MTU5NjgwMzA3Nn0.6oWVH2XypdJOmSieYbImYsraxk7ZWSiRFuoZ97vFAVA
   * 	  }
   *     }
   */
  static async registerManager(req, res, next) {
    try {
      const { body } = req;
      body.role = "manager";
      const token = await AuthService.register(body);

      const user = await UsersService.findOne({
        email: body.email,
      });

      res.success({
        token,
        user,
      });
    } catch (error) {
      next(error);
    }
  }
  static async register(req, res, next) {
    try {
      const { body } = req;

      const token = await AuthService.register(body);

      const user = await UsersService.findOne({
        email: body.email,
      });

      res.success({
        token,
        user,
      });
    } catch (error) {
      next(error);
    }
  }
  static async login(req, res, next) {
    try {
      const { body } = req;

      const token = await AuthService.login(body);

      const user = await UsersService.findOne({
        email: body.email,
      });

      res.success({
        token,
        user,
      });
    } catch (error) {
      next(error);
    }
  }
};
