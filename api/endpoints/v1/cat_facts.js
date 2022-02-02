const cat_facts = require("../../../src/json/catfacts.json");

module.exports = (app, client) => {
 app.get("/api/v1/fun/cat_facts", (req, res, next) => {
  const random = cat_facts.facts[Math.floor(Math.random() * cat_facts.facts.length)];
  res.json({
   cat_fact: random
  })
 });
};
