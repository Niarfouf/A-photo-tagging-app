const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const compression = require("compression");
const helmet = require("helmet");
const cors = require("cors");
const MongoDBStore = require("connect-mongodb-session")(session);
const dotenv = require("dotenv");
dotenv.config();

// import router
const gameRouter = require("./routes/games");

const app = express();

// Set up rate limiter: maximum of twenty requests per minute
const RateLimit = require("express-rate-limit");
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 60,
});
// Apply rate limiter to all requests
app.use(limiter);

// allow CORS request for front end
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

// Set up mongoose connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGO_URI;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

const store = new MongoDBStore({
  uri: process.env.MONGO_URI_SESSION,
  collection: "session",
});

const secret = process.env.SESSION_SECRET;

// add middleware

app.use(
  session({
    secret: secret,
    name: "playerSession",
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
    store: store,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use(compression()); // Compress all routes
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// add games route
app.use("/games", gameRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // return error
  res.status(err.status || 500);
  res.json({ message: err.message });
});

module.exports = app;
