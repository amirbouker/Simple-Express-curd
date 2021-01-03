const TransactionsService = require("../services/Transactions.service");
const { NOT_EXTENDED } = require("http-status");
const UsersService = require("../services/users.service");
const CompaniesService = require("../services/Companies.service");
const WalletsService = require("../services/wallets.service");

module.exports = class TransactionsController {
  /**
   * @api {get} /Transactions Get Transactions list
   * @apiVersion 0.0.1
   * @apiName ListTransactions
   * @apiGroup Transactions
   *
   * @apiSuccess {Boolean} success Specify if request succeded
   * @apiSuccess {Object[]} data Array of Transactions
   * @apiSuccess {String} data.name Transaction's name
   * @apiSuccess {String} data.email Transaction's email
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
      const transactions = await TransactionsService.getAll();

      res.success({
        transactions,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * @api {get} /Transactions/:id Get Transaction by id
   * @apiVersion 0.0.1
   * @apiName GetTransaction
   * @apiGroup Transactions
   *
   * @apiPermission Admin
   *
   * @apiParam {String} id Transaction's id
   *
   * @apiSuccess {Boolean} success Specify if request succeded
   * @apiSuccess {Object} data Transaction
   * @apiSuccess {String} data.name Transaction's name
   * @apiSuccess {String} data.email Transaction's email
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

      const transaction = await TransactionsService.getOne(id);

      if (!transaction) {
        throw "Transaction not found";
      }

      res.success({
        transaction,
      });
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const { body } = req;
      const user = await UsersService.findOne(body.user_id);
      const company = await CompaniesService.findOne(company_id);
      const wallet = await WalletsService.findOne(user.wallet);
      if (!user) {
        throw "user not found";
      }
      if (!company) {
        throw "company not found";
      }
      const transaction = await TransactionsService.create(body);
      wallet.transaction.push(transaction._id);
      await WalletsService.edit(wallet._id, wallet);

      res.success({
        transaction,
      });
    } catch (error) {
      next(error);
    }
  }

  static async edit(req, res, next) {
    try {
      const { id } = req.params;
      const { body } = req;

      let transaction = await TransactionsService.getOne(id);

      if (!transaction) {
        throw "Transaction not found";
      }

      await TransactionsService.edit(id, body);

      transaction = await TransactionsService.getOne(id);

      res.success({
        Transaction,
      });
    } catch (error) {
      next(error);
    }
  }

  static async remove(req, res, next) {
    try {
      const { id } = req.params;

      const transaction = await TransactionsService.getOne(id);

      if (!transaction) {
        throw "Transaction not found";
      }

      await TransactionsService.remove(id);

      res.success({
        Transaction,
      });
    } catch (error) {
      next(error);
    }
  }
};
