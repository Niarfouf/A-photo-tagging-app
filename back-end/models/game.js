const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GameSchema = new Schema({
  game_name: { type: String, required: true },
  small_image_ref: { type: String, required: true },
  large_image_ref: { type: String, required: true },
  game_id: { type: Number, required: true, unique: true },
});

module.exports = mongoose.model("Game", GameSchema);
