const fetch = require("node-fetch");
module.exports = (app, client) => {
 app.get("/api/v1/user/:userID", (req, res, next) => {
  if (!req.params.userID) {
   res.json({
    error: true,
    message: "Invaild user ID!",
   });
  }
  (async () => {
   const request = await fetch(`https://discord.com/api/users/${req.params.userID}`, {
    method: "GET",
    headers: {
     authorization: `Bot ${client.token}`,
    },
   });
   const json = await request.json();
   res.json(json);
  })();
 });
};
