const mongoose = require("mongoose"),
  Schema = mongoose.Schema;
const TranscationSchema = new Schema({
  creation_date: {
    type: Date,
    default: Date.now,
  },
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  curency: { type: String, required: true },
  value: { type: Number, required: true },
  company_id: { type: Schema.Types.ObjectId, ref: "Company", required: true },
});
module.exports = Transcation = mongoose.model("Transcation", TranscationSchema);
