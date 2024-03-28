const express = require("express");
const router = express.Router();

const game_controller = require("../controllers/gameController");

// GET all games info
router.get("/", game_controller.games_info);
// GET all scores.
router.get("/scores", game_controller.scores_list);
// GET one game large image
router.get("/:gameid/", game_controller.game_large_image);
// POST to start specific game
router.post("/:gameid/start", game_controller.game_start);
// POST coordinate to check for a specific game
router.post("/:gameid/check/:objectid", game_controller.coordinate_check);
// POST new score for a game
router.post("/:gameid/score", game_controller.score_create);

module.exports = router;
