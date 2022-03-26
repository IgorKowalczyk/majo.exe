const eigthball = require("../../../../src/json/eightball.json");

module.exports = {
 name: "/api/v1/fun/eightball",
 url: `${process.env.DOMAIN}${process.env.PORT == 8080 ? "" : `:${process.env.PORT}`}/api/v1/fun/eightball`,
 version: "v1",
 description: "Returns random fact about cats",
 category: "fun",
 params: null,
 run: async (client, req, res, next) => {
  const answer = eigthball.responses[Math.floor(Math.random() * eigthball.responses.length)];
  res.json({
   answer: answer,
  });
 },
};
