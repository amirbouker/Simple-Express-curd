const Transaction = require("../models/Transactions.model");

module.exports = class TransactionsService {
  static async getAll() {
    const transactions = await Transaction.findAll();
    return transactions;
  }

  static async findOne(email) {
    const transaction = await Transaction.findOne(email);
    return transaction;
  }

  static async create(body) {
    const transaction = await Transaction.create(body);
    return transaction;
  }

  static async edit(id, body) {
    const transaction = Transaction.updateOne({ id }, { ...body });
    return transaction;
  }

  static async remove(id) {
    const transaction = await Transaction.destroy({
      where: {
        id,
      },
    });
    return transaction;
  }
};
