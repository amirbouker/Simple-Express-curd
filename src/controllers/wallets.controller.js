const WalletService = require("../services/wallets.service");
const UsersService = require("../services/users.service");

module.exports = class WalletController {
  /**
   * @api {get} /Wallet Get Wallet list
   * @apiVersion 0.0.1
   * @apiName ListWallet
   * @apiGroup Wallet
   *
   * @apiSuccess {Boolean} success Specify if request succeded
   * @apiSuccess {Object[]} data Array of Wallet
   * @apiSuccess {String} data.name Company's name
   * @apiSuccess {String} data.email Company's email
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
      const wallet = await WalletService.getAll();

      res.success({
        data: Wallet,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * @api {get} /Wallet/:id Get Company by id
   * @apiVersion 0.0.1
   * @apiName GetCompany
   * @apiGroup Wallet
   *
   * @apiPermission Admin
   *
   * @apiParam {String} id Company's id
   *
   * @apiSuccess {Boolean} success Specify if request succeded
   * @apiSuccess {Object} data Company
   * @apiSuccess {String} data.name Company's name
   * @apiSuccess {String} data.email Company's email
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

      const wallet = await WalletService.getOne(id);

      if (!wallet) {
        throw "wallet not found";
      }

      res.success({
        wallet,
      });
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const { body } = req;
      const user = await UsersService.findOne(body.user_id);
      if (!user) {
        throw "user not found";
      }
      const wallet = await WalletService.create(body);

      res.success({
        wallet,
      });
    } catch (error) {
      next(error);
    }
  }

  static async edit(req, res, next) {
    try {
      const { id } = req.params;
      const { body } = req;

      let wallet = await WalletService.getOne(id);

      if (!wallet) {
        throw "wallet not found";
      }

      await WalletService.edit(id, body);

      wallet = await WalletService.getOne(id);

      res.success({
        wallet,
      });
    } catch (error) {
      next(error);
    }
  }

  static async remove(req, res) {
    try {
      const { id } = req.params;

      const wallet = await WalletService.getOne(id);

      if (!wallet) {
        throw "Company not found";
      }

      await WalletService.remove(id);

      res.success({
        wallet,
      });
    } catch (error) {
      next(error);
    }
  }
};
