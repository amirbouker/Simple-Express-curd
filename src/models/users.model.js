const Roles = require("../helpers/role.helper");
const mongoose = require("mongoose"),
  Schema = mongoose.Schema;
const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
  creation_date: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    enum: [...Object.values(Roles)],
  },
  wallet: { type: Schema.Types.ObjectId, ref: "Wallet" },
});
module.exports = User = mongoose.model("User", UserSchema);
