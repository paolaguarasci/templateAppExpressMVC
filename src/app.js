import { createErrorMiddleware, errorToView } from "./middleware/error.js";
import { globalForView, normalizePort } from "./config/express.js";

import cookieParser from "cookie-parser";
import express from "express";
import { fileURLToPath } from "url";
import http from "http";
import indexRouter from "./routes/index.js";
import logger from "morgan";
import mongoose from "mongoose";
import passport from "passport";
import passportConfig from "./config/passport.js";
import path from "path";
import { ratelimit } from "./middleware/rateLimit.js";
import session from "express-session";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, { maxPoolSize: 10 })
  .catch((error) => handleError(error));
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(ratelimit);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "twig");
app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));

app.use(
  session({
    name: "session-id",
    secret: "123-456-789",
    saveUninitialized: false,
    resave: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport);

app.locals.globalView = globalForView;
app.locals.logged = false;

app.use("/", indexRouter);

app.use(createErrorMiddleware);
app.use(errorToView);

let port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

let server = http.createServer(app);

server.listen(port, () => {
  console.log(`App is listening to http://localhost:3000`);
});
