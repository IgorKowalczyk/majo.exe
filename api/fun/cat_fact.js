const cat_facts = require("../../../../src/json/catfacts.json");

module.exports = {
 name: "/api/v1/fun/cat_fact",
 url: `${process.env.DOMAIN}${process.env.PORT == 8080 ? "" : `:${process.env.PORT}`}/api/v1/fun/cat_fact`,
 version: "v1",
 description: "Returns random fact about cats",
 category: "fun",
 params: null,
 run: async (client, req, res, next) => {
  const random = cat_facts.facts[Math.floor(Math.random() * cat_facts.facts.length)];
  res.json({
   cat_fact: random,
  });
 },
};
