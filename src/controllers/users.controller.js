const UsersService = require("../services/users.service");
const { NOT_EXTENDED } = require("http-status");
const WalletController = require("./wallets.controller");

module.exports = class UsersController {
  /**
   * @api {get} /users Get Users list
   * @apiVersion 0.0.1
   * @apiName ListUsers
   * @apiGroup Users
   *
   * @apiSuccess {Boolean} success Specify if request succeded
   * @apiSuccess {Object[]} data Array of users
   * @apiSuccess {String} data.name User's name
   * @apiSuccess {String} data.email User's email
   *
   * @apiSuccessExample Success-Response:
   *     HTTP 200 OK
   *     {
   *       success: true,
   *       data: [{
   *         "name": "John Doe",
   *         "email": "jhon.doe@gmail.com"
   *       }]
   *     }
   */
  static async list(req, res, next) {
    try {
      const users = await UsersService.getAll();

      res.success({ users });
    } catch (error) {
      next(error);
    }
  }

  /**
   * @api {get} /users/:id Get User by id
   * @apiVersion 0.0.1
   * @apiName GetUser
   * @apiGroup Users
   *
   * @apiPermission Admin
   *
   * @apiParam {String} id User's id
   *
   * @apiSuccess {Boolean} success Specify if request succeded
   * @apiSuccess {Object} data User
   * @apiSuccess {String} data.name User's full name
   * @apiSuccess {String} data.email User's email
   *
   * @apiSuccessExample Success-Response:
   *     HTTP 200 OK
   *     {
   *       success: true,
   *       data: {
   *         "name": "John Doe",
   *         "email": "jhon.doe@gmail.com"
   *       }
   *     }
   */
  static async get(req, res, next) {
    try {
      const { id } = req.params;

      const user = await UsersService.getOne(id);

      if (!user) {
        throw "User not found";
      }

      res.success({
        user,
      });
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const { body } = req;

      const user = await UsersService.create(body);
      let wallet = {
        user_id: user._id,
        transactions: [],
      };
      await WalletController.create(wallet);
      res.success({
        user,
      });
    } catch (error) {
      next(error);
    }
  }

  static async edit(req, res, next) {
    try {
      const { id } = req.params;
      const { body } = req;

      let user = await UsersService.getOne(id);

      if (!user) {
        throw "User not found";
      }

      await UsersService.edit(id, body);

      user = await UsersService.getOne(id);

      res.success({
        user,
      });
    } catch (error) {
      next(error);
    }
  }

  static async remove(req, res, next) {
    try {
      const { id } = req.params;

      const user = await UsersService.getOne(id);

      if (!user) {
        throw "User not found";
      }

      await UsersService.remove(id);

      res.success({
        user,
      });
    } catch (error) {
      next(error);
    }
  }
};
