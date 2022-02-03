const fetch = require("node-fetch");

module.exports = (app, client) => {
 app.get("/api/v1/guild/:guildID", (req, res, next) => {
  if (!req.params.guildID) {
   return res.json({
    code: 2,
    message: "Invaild guild ID!",
   });
  }
  if (isNaN(req.params.guildID)) {
   return res.json({
    code: 2,
    message: "Invaild guild ID!",
   });
  }
  (async () => {
   const request = await fetch(`https://discord.com/api/guilds/${req.params.guildID}`, {
    method: "GET",
    headers: {
     authorization: `Bot ${client.token}`,
    },
   });
   if (!request.status === 200) {
    return res.json({
     code: 2,
     message: "Invaild guild ID!",
    });
   }
   const json = await request.json();
   return res.json(json);
  })();
 });
};
