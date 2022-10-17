import { createErrorMiddleware, errorToView } from './middleware/error.js';
import {
  globalForView,
  normalizePort,
  onError,
  onListening
} from './config/express.js';

import cookieParser from 'cookie-parser';
import express from 'express';
import { fileURLToPath } from 'url';
import http from 'http';
import indexRouter from './routes/index.js';
import logger from 'morgan';
import path from 'path';
import { ratelimit } from './middleware/rateLimit.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(ratelimit);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.locals.globalView = globalForView;

app.use('/', indexRouter);

app.use(createErrorMiddleware);
app.use(errorToView);


let port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

let server = http.createServer(app);

server.listen(port);

// server.on('error', onError);
// server.on('listening', onListening(server, debug));
