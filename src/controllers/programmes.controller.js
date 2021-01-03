const ProgrammesService = require("../services/Programmes.service");
const CompaniesService = require("../services/Companies.service");

module.exports = class ProgrammesController {
  /**
   * @api {get} /Programmes Get Programmes list
   * @apiVersion 0.0.1
   * @apiName ListProgrammes
   * @apiGroup Programmes
   *
   * @apiSuccess {Boolean} success Specify if request succeded
   * @apiSuccess {Object[]} data Array of Programmes
   * @apiSuccess {String} data.name Program's name
   * @apiSuccess {String} data.email Program's email
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
      const programmes = await ProgrammesService.getAll();

      res.success({
        programmes,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * @api {get} /Programmes/:id Get Program by id
   * @apiVersion 0.0.1
   * @apiName GetProgramme
   * @apiGroup Programmes
   *
   * @apiPermission Admin
   *
   * @apiParam {String} id Program's id
   *
   * @apiSuccess {Boolean} success Specify if request succeded
   * @apiSuccess {Object} data Program
   * @apiSuccess {String} data.name Program's name
   * @apiSuccess {String} data.email Program's email
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

      const program = await ProgrammesService.getOne(id);

      if (!program) {
        throw "Program not found";
      }

      res.success({
        program,
      });
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const { body } = req;

      const program = await ProgrammesService.create(body);
      const companies = body.companies;
      compaines.forEach(async (company_id) => {
        let Company = await CompaniesService.findOne(company_id);
        if (!Company) {
          throw "company not found";
        }
        if (Company.programmes.indexOf(program._id) === -1) {
          Company.programmes.push(program._id);
          await CompaniesService.edit(company_id, Company);
        }
      });
      res.success({
        program,
      });
    } catch (error) {
      next(error);
    }
  }

  static async edit(req, res, next) {
    try {
      const { id } = req.params;
      const { body } = req;

      let program = await ProgrammesService.getOne(id);

      if (!program) {
        throw "Program not found";
      }

      await ProgrammesService.edit(id, body);

      Program = await ProgrammesService.getOne(id);

      res.success({
        program,
      });
    } catch (error) {
      next(error);
    }
  }

  static async remove(req, res, next) {
    try {
      const { id } = req.params;

      const program = await ProgrammesService.getOne(id);

      if (!program) {
        throw "Program not found";
      }

      await ProgrammesService.remove(id);

      res.success({
        program,
      });
    } catch (error) {
      next(error);
    }
  }
};
