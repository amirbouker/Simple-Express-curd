const Company = require("../models/companies.model");

module.exports = class CompaniesService {
  static async getAll() {
    const companies = await Company.findAll();
    return companies;
  }

  static async findOne(email) {
    const company = await Company.findOne(email);
    return company;
  }

  static async create(body) {
    const company = await Company.create(body);
    return company;
  }

  static async edit(id, body) {
    const company = Company.updateOne({ id }, { ...body });
    return company;
  }

  static async remove(id) {
    const company = await Company.destroy({
      where: {
        id,
      },
    });
    return company;
  }
};
