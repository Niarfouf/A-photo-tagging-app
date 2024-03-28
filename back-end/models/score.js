const mongoose = require("mongoose");
//const { DateTime } = require("luxon");
const Schema = mongoose.Schema;

const ScoreSchema = new Schema({
  player: { type: String, default: "Anonymous", maxLength: 20 },
  time_stamp: { type: Date, default: Date.now },
  score: { type: Number, required: true },
  game: { type: Schema.Types.ObjectId, ref: "Game" },
});

/*ScoreSchema.virtual("time_stamp_formatted").get(function () {
  return DateTime.fromJSDate(this.time_stamp).toLocaleString(DateTime.DATE_MED);
});*/

// Export model
module.exports = mongoose.model("Score", ScoreSchema);
