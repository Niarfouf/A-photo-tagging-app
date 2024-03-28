const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const HiddenObjectSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  y_coord: { type: Number, required: true },
  x_coord: { type: Number, required: true },
  image_ref: { type: String, required: true },
  object_id: { type: Number, required: true, unique: true },
  game: { type: Schema.Types.ObjectId, ref: "Game" },
});

// Export model
module.exports = mongoose.model("HiddenObject", HiddenObjectSchema);
