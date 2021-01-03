const CompaniesService = require("../services/Companies.service");
const UsersService = require("../services/users.service");

module.exports = class CompaniesController {
  /**
   * @api {get} /Companies Get Companies list
   * @apiVersion 0.0.1
   * @apiName ListCompanies
   * @apiGroup Companies
   *
   * @apiSuccess {Boolean} success Specify if request succeded
   * @apiSuccess {Object[]} data Array of Companies
   * @apiSuccess {String} data.name Company's name
   * @apiSuccess {String} data.email Company's email
   *
   * @apiSuccessExample Success-Response:
   *     HTTP 200 OK
   *     {
   *
   *       data: [{
   *         "name": "John Doe",
   *         "email": "jhon.doe@gmail.com"
   *       }]
   *     }
   */
  static async list(req, res, next) {
    try {
      const companies = await CompaniesService.getAll();

      res.success({
        companies,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * @api {get} /Companies/:id Get Company by id
   * @apiVersion 0.0.1
   * @apiName GetCompany
   * @apiGroup Companies
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
   *
   *       data: {
   *         "name": "John Doe",
   *         "email": "jhon.doe@gmail.com"
   *       }
   *     }
   */
  static async get(req, res, next) {
    try {
      const { id } = req.params;

      const company = await CompaniesService.getOne(id);

      if (!company) {
        throw "Company not found";
      }

      res.success({
        company,
      });
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const { body } = req;
      const manager = await UsersService.findOne(body.manager);
      if (!manager) {
        throw "manager not found";
      }
      const company = await CompaniesService.create(body);

      res.success({
        company,
      });
    } catch (error) {
      next(error);
    }
  }

  static async edit(req, res, next) {
    try {
      const { id } = req.params;
      const { body } = req;

      let company = await CompaniesService.getOne(id);

      if (!company) {
        throw "Company not found";
      }

      await CompaniesService.edit(id, body);

      company = await CompaniesService.getOne(id);

      res.success({
        company,
      });
    } catch (error) {
      next(error);
    }
  }

  static async remove(req, res, next) {
    try {
      const { id } = req.params;

      const company = await CompaniesService.getOne(id);

      if (!company) {
        throw "Company not found";
      }

      await CompaniesService.remove(id);

      res.success({
        company,
      });
    } catch (error) {
      next(error);
    }
  }
};
