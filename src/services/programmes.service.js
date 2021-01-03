const Program = require("../models/programmes.model");

module.exports = class ProgrammesService {
  static async getAll() {
    const programmes = await Program.findAll();
    return programmes;
  }

  static async findOne(email) {
    const program = await Program.findOne(email);
    return program;
  }

  static async create(body) {
    const program = await Program.create(body);
    return program;
  }

  static async edit(id, body) {
    const program = Program.updateOne({ id }, { ...body });
    return program;
  }

  static async remove(id) {
    const program = await Program.destroy({
      where: {
        id,
      },
    });
    return program;
  }
};
