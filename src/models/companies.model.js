const mongoose = require("mongoose"),
  Schema = mongoose.Schema;
const CompanySchema = new Schema({
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
  address: {
    type: String,
    required: true,
    unique: true,
  },
  programmes: [{ type: Schema.Types.ObjectId, ref: "Program" }],
  manager: { required: true, type: Schema.Types.ObjectId, ref: "User" },
  creation_date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = Company = mongoose.model("Company", CompanySchema);
