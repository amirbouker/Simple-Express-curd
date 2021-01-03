const Wallet = require("../models/Wallets.model");

module.exports = class WalletsService {
  static async getAll() {
    const wallets = await Wallet.findAll();
    return wallets;
  }

  static async findOne(email) {
    const wallet = await Wallet.findOne(email);
    return wallet;
  }

  static async create(body) {
    const wallet = await Wallet.create(body);
    return wallet;
  }

  static async edit(id, body) {
    const wallet = Wallet.updateOne({ id }, { ...body });
    return wallet;
  }

  static async remove(id) {
    const wallet = await Wallet.destroy({
      where: {
        id,
      },
    });
    return user;
  }
};
