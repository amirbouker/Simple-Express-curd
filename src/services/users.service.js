const User = require("../models/users.model");

module.exports = class UsersService {
  static async getAll() {
    const users = await User.findAll();
    return users;
  }

  static async findOne(email) {
    const user = await User.findOne(email);
    return user;
  }

  static async create(body) {
    const user = await User.create(body);
    return user;
  }

  static async edit(id, body) {
    const user = User.updateOne({ id }, { ...body });
    return user;
  }

  static async remove(id) {
    const user = await User.destroy({
      where: {
        id,
      },
    });
    return user;
  }
};
