const Roles = require("../helpers/role.helper");
const mongoose = require("mongoose"),
  Schema = mongoose.Schema;
const WalletSchema = new Schema({
  creation_date: {
    type: Date,
    default: Date.now,
  },
  user_id: { required: true, type: Schema.Types.ObjectId, ref: "User" },
  transactions: [{ type: Schema.Types.ObjectId, ref: "Transcation" }],
});
module.exports = Wallet = mongoose.model("Wallet", WalletSchema);
