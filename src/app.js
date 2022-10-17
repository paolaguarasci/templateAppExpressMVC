import { RateLimiterMemory } from 'rate-limiter-flexible';
import cookieParser from 'cookie-parser';
import debugLib from 'debug';
import express from 'express';
import { fileURLToPath } from 'url';
import http from 'http';
import indexRouter from './routes/index.js';
import logger from 'morgan';
import path from 'path';

const rateLimiteOptions = {
  points: 1000, // 6 points
  duration: 1 // Per second
};

const rateLimiter = new RateLimiterMemory(rateLimiteOptions);

const app = express();
const debug = debugLib('templateappexrepssmvc:server');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use((req, res, next) => {
  rateLimiter
    .consume(req.ip)
    .then(() => {
      next();
    })
    .catch(() => {
      res.status(429).send('Too Many Requests');
    });
});

app.locals.globalView = {
  example: "thisIsAGlobalVariable"
}

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');


function normalizePort(val) {
  let port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  let bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  let addr = server.address();
  let bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', indexRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

let port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

let server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
