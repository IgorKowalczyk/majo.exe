const fetch = require("node-fetch");
module.exports = (app, client) => {
 app.get("/api/v1/user/:userID", (req, res, next) => {
  if (!req.params.userID) {
   return res.json({
    error: true,
    message: "Invaild user ID!",
   });
  }
  if (isNaN(req.params.userID)) {
   return res.json({
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
   if (!request.status === 200) {
    return res.json({
     error: true,
     message: "Invaild user ID!",
    });
   }
   const json = await request.json();
   return res.json(json);
  })();
 });
};
