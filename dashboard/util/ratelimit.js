const { RateLimiterMemory } = require("rate-limiter-flexible");

const rateLimiter = new RateLimiterMemory({
 points: 5,
 duration: 1,
});

const rateLimiterMiddleware = (req, res, next) => {
 rateLimiter
  .consume(req.ip)
  .then(() => {
   next();
  })
  .catch(() => {
   res.status(429).send("[ANTI DDOS] Too Many Requests! Please try again later!");
  });
};

module.exports = rateLimiterMiddleware;
