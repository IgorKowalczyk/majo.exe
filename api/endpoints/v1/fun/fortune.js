const fortunes = require("../../../../src/json/fortunes.json");

module.exports = {
 name: "/api/v1/fun/fortunes",
 url: `${process.env.DOMAIN}${process.env.PORT == 8080 ? "" : `:${process.env.PORT}`}/api/v1/fun/fortunes`,
 version: "v1",
 description: "Returns random fortune",
 category: "fun",
 params: null,
 run: async (client, req, res, next) => {
  const answer = fortunes.fortunes[Math.floor(Math.random() * fortunes.fortunes.length)];
  res.json({
   fortune: answer,
  });
 },
};
