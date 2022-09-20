const { RateLimiterMemory } = require("rate-limiter-flexible");

const rateLimiter = new RateLimiterMemory({
 points: 20,
 duration: 1,
});
const ratelimit = (req, res, next) => {
 rateLimiter
  .consume(req.ip)
  .then(() => {
   next();
  })
  .catch(() => {
   res.status(429).json({
    message: "Too Many Requests! Please try again later!",
    code: 429,
    ratelimit: true,
   });
  });
};

module.exports = ratelimit;
