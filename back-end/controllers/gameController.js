const asyncHandler = require("express-async-handler");
const HiddenObject = require("../models/hiddenObject");
const Score = require("../models/score");
const Game = require("../models/game");
const { body, param, validationResult } = require("express-validator");

// GET all games info
exports.games_info = asyncHandler(async (req, res, next) => {
  const [games, hiddenObjects] = await Promise.all([
    Game.find({}, "_id game_name small_image_ref game_id").exec(),
    HiddenObject.find({}, "name image_ref object_id game").exec(),
  ]);
  let resObject = {};
  games.forEach((game) => {
    const gameObjects = hiddenObjects.filter((hiddenObject) => {
      return hiddenObject.game == game.id;
    });
    const newGameObjects = gameObjects.map((object) => {
      object.image_ref = "http://localhost:3000/" + object.image_ref;
      return object;
    });
    resObject[game.game_id] = {
      game_id: game.game_id,
      name: game.game_name,
      game_image_url: "http://localhost:3000/" + game.small_image_ref,
      objects: newGameObjects,
    };
  });
  res.json(resObject);
});

// GET all scores
exports.scores_list = asyncHandler(async (req, res, next) => {
  const games = await Game.find().exec();

  const scores = await Score.aggregate([
    {
      $group: {
        _id: "$game",
        data: {
          $topN: { n: 10, output: ["$player", "$score"], sortBy: { score: 1 } },
        },
      },
    },
  ]).exec();
  let gameScores = {};
  games.forEach((game) => {
    const gameScore = scores.find((score) => score._id == game.id);
    gameScores[game.game_name] = gameScore.data;
  });
  res.json(gameScores);
});

// GET one game info
exports.game_info = [
  // Validate and sanitize params
  param("gameid").trim().escape(),
  asyncHandler(async (req, res, next) => {
    const game = await Game.findOne(
      { game_id: req.params.gameid },
      "_id game_name large_image_ref game_id"
    ).exec();
    if (game === null) {
      // No results.
      const err = new Error("Game not found");
      err.status = 404;
      return next(err);
    }
    const hiddenObjects = await HiddenObject.find(
      { game: game.id },
      "name image_ref object_id"
    ).exec();
    const newHiddenObjects = hiddenObjects.map((object) => {
      object.image_ref = "http://localhost:3000/" + object.image_ref;
      return object;
    });
    const resObject = {
      game_id: game.game_id,
      name: game.game_name,
      game_image_url: "http://localhost:3000/" + game.large_image_ref,
      objects: newHiddenObjects,
    };
    res.json(resObject);
  }),
];

// POST to start specific game
exports.game_start = [
  // Validate and sanitize params
  param("gameid").trim().escape(),
  asyncHandler(async (req, res, next) => {
    const game = await Game.findOne({ game_id: req.params.gameid }).exec();
    if (game) {
      const count = await HiddenObject.countDocuments({
        game: game.id,
      }).exec();
      //adding session info to handle game start
      req.session.game = game.game_id;
      req.session.gameObjectId = game.id;
      req.session.hiddenObject = count;
      req.session.foundObject = [];
      req.session.startTime = Date.now();
      res.json({ message: "Game initialized" });
    } else {
      res.status(404).json({ message: "Game not found" });
    }
  }),
];

// POST coordinate to check for a specific game
exports.coordinate_check = [
  // Validate and sanitize params
  param("objectid").trim().escape(),
  asyncHandler(async (req, res, next) => {
    if (req.session.game == req.params.gameid) {
      const object = await HiddenObject.findOne({
        object_id: req.params.objectid,
      }).exec();
      // checking coordinates with delta
      if (
        object.x_coord <= req.body.coordX + 10 &&
        object.x_coord >= req.body.coordX - 10 &&
        object.y_coord <= req.body.coordY + 10 &&
        object.y_coord >= req.body.coordY - 10
      ) {
        {
          req.session.foundObject.push(object);
        }
      } else {
        res.json({ foundCoord: false, message: "Wrong coordinates" });
        return;
      }
      // end game if all objects found
      if (req.session.hiddenObject === req.session.foundObject.length) {
        req.session.endTime = Date.now();
        const score = req.session.endTime - req.session.startTime;
        req.session.score = score;
        res.json({
          x_coord: object.x_coord,
          y_coord: object.y_coord,
          foundCoord: true,
          message: "You win !",
          score: score,
        });
      } else {
        res.json({
          x_coord: object.x_coord,
          y_coord: object.y_coord,
          foundCoord: true,
          message: "You found one hidden char/object",
        });
      }
    } else {
      res.status(401).json({ message: "Game not started" });
    }
  }),
];

// POST new score for a game

exports.score_create = [
  // Validate and sanitize form
  body("player", "player name must be max 20 characters")
    .optional({ values: "falsy" })
    .trim()
    .isLength({ max: 20 })

    .escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    if (!req.session.endTime) {
      res.status(401).json({
        message: "you did not finish the game",
      });
    } else {
      if (!errors.isEmpty()) {
        // There are errors.
        res.json({
          errors: errors.array(),
          message: "wrong player name",
        });
      } else {
        // creating new score from session info
        const serverScore = req.session.score;
        const playerScore = req.body.finalScore;

        const formattedServerScore = Math.round(serverScore / 100) / 10;

        if (
          playerScore >= formattedServerScore - 0.5 &&
          playerScore <= formattedServerScore + 0.5
        ) {
          let newScore;
          req.body.player.length > 0
            ? (newScore = new Score({
                player: req.body.player,
                score: playerScore,
                game: req.session.gameObjectId,
              }))
            : (newScore = new Score({
                score: playerScore,
                game: req.session.gameObjectId,
              }));

          // Data from form is valid.
          // save post
          await newScore.save();
          res.json({ message: "Score saved", score: playerScore });
        } else {
          res.json({ message: "You tried to cheat", score: "0:00.0" });
        }
      }
    }
  }),
];
