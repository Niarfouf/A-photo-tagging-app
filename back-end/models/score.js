const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ScoreSchema = new Schema({
  player: { type: String, default: "Anonymous", maxLength: 20 },
  time_stamp: { type: Date, default: Date.now },
  score: { type: Number, required: true },
  game: { type: Schema.Types.ObjectId, ref: "Game" },
});

// Export model
module.exports = mongoose.model("Score", ScoreSchema);
