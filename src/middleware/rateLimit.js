import {RateLimiterMemory} from 'rate-limiter-flexible';
import {rateLimiteOptions} from '../config/express.js';
const rateLimiter = new RateLimiterMemory(rateLimiteOptions);

export function ratelimit(req, res, next) {
  rateLimiter
      .consume(req.ip)
      .then(() => {
        next();
      })
      .catch(() => {
        res.status(429).send('Too Many Requests');
      });
}
