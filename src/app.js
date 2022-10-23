import * as dotenv from 'dotenv'

import { createErrorMiddleware, errorToView } from "./middleware/error.js";
import { globalForView, normalizePort } from "./config/express.js";

import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import express from "express";
import { fileURLToPath } from "url";
import fs from "fs";
import helmet from "helmet";
import hpp from "hpp";
import https from "https";
import indexRouter from "./routes/index.js";
import logger from "morgan";
import mongoose from "mongoose";
import passport from "passport";
import passportConfig from "./config/passport.js";
import path from "path";
import { ratelimit } from "./middleware/rateLimit.js";
import session from "express-session";

dotenv.config()



const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const certPath = path.join(__dirname, "..", "cert");

mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, { maxPoolSize: 10 })
  .catch((error) => {
    throw Error(error)
  });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.disable("x-powered-by");
app.use(ratelimit);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "twig");
app.use(express.urlencoded({ extended: false }));
app.use(hpp());
app.use(express.json());
app.use(logger("dev"));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "script-src": ["'self'", "https://cdn.jsdelivr.net"],
      "style-src": ["'self'", "https://cdn.jsdelivr.net"],
    },
  })
);

app.use(
  session({
    name: process.env.NAME_SESSION,
    secret: process.env.SECRET_SESSION,
    saveUninitialized: false,
    resave: false,
    maxAge: new Date(Date.now() + 3600000),
    store: new MongoStore({
      client: db.getClient(),
      collectionName: "sessions",
    }),
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

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = https.createServer(
  {
    key: fs.readFileSync(path.join(certPath, "localhost.key"), "utf8"),
    cert: fs.readFileSync(path.join(certPath, "localhost.crt"), "utf8"),
  },
  app
);

server.listen(port, () => {
  console.log(`
    App is listening to https://localhost:${port}
  `);
});

export default app;
