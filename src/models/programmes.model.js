const mongoose = require("mongoose"),
  ProgramTypes = require("../helpers/program.helper");
const Categories = require("../helpers/category.helper"),
  Schema = mongoose.Schema;
const ProgramSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  companies: [{ type: Schema.Types.ObjectId, ref: "Company" }],
  creation_date: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
    required: true,
  },
  curencyName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: [...Object.values(Categories)],
  },
  type: {
    type: String,
    enum: [...Object.values(ProgramTypes)],
  },
});
module.exports = Program = mongoose.model("Program", ProgramSchema);
