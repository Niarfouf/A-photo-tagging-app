#! /usr/bin/env node

console.log(
  'This script populates some data to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const HiddenObject = require("./models/hiddenObject");
const Game = require("./models/game");

const games = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createGames();
  await createHiddenObjects();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function gameCreate(game_id, game_name, small_image_ref, large_image_ref) {
  const game = new Game({
    game_name,
    small_image_ref,
    large_image_ref,
    game_id,
  });
  await game.save();
  games[index] = game;
  console.log(`Added game: ${game_name}`);
}

async function hiddenObjectCreate(
  name,
  y_coord,
  x_coord,
  image_ref,
  object_id,
  game
) {
  const hiddenObject = new HiddenObject({
    name,
    y_coord,
    x_coord,
    image_ref,
    object_id,
    game,
  });

  await hiddenObject.save();

  console.log(`Added hiddenObject: ${name}`);
}

async function createHiddenObjects() {
  console.log("Adding hiddenObjects");
  await Promise.all([
    hiddenObjectCreate("bee", 520, 621, "images/object1-1.png", 1, games[1]),
    hiddenObjectCreate("mouse", 529, 361, "images/object2-1.png", 2, games[1]),
    hiddenObjectCreate("owl", 79.7, 838.5, "images/object3-1.png", 3, games[1]),
    hiddenObjectCreate(
      "poodle",
      335.2,
      233.9,
      "images/object1-2.png",
      4,
      games[2]
    ),
    hiddenObjectCreate(
      "pigeon",
      3.59,
      455.9,
      "images/object2-2.png",
      5,
      games[2]
    ),
    hiddenObjectCreate(
      "ghost",
      586.8,
      696.6,
      "images/object3-2.png",
      6,
      games[2]
    ),
    hiddenObjectCreate("monkey", 937, 792, "images/object1-3.png", 7, games[3]),
    hiddenObjectCreate(
      "rat",
      324.5,
      766.7,
      "images/object2-3.png",
      8,
      games[3]
    ),
    hiddenObjectCreate(
      "bulldog",
      290.5,
      190.2,
      "images/object3-3.png",
      9,
      games[3]
    ),
  ]);
}

async function createGames() {
  console.log("Adding games");
  await Promise.all([
    gameCreate(
      1,
      "Hotel in the forest",
      "images/game-1-small.jpg",
      "images/game-1.jpg"
    ),
    gameCreate(
      2,
      "London and netflix",
      "images/game-2-small.jpg",
      "images/game-2.jpg"
    ),
    gameCreate(
      3,
      "Dragon and friends",
      "images/game-3-small.jpg",
      "images/game-3.jpg"
    ),
  ]);
}
