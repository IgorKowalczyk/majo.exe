const fetch = require("node-fetch");

module.exports = {
 name: "/api/v1/info/user",
 version: "v1",
 description: "Returns info about user",
 category: "info",
 params: ["userID"],
 run: async (client, req, res, next, params) => {
  if (!params[0]) {
   return res.json({
    code: 1,
    message: "Invaild user ID!",
   });
  }
  if (isNaN(params[0])) {
   return res.json({
    code: 1,
    message: "Invaild user ID!",
   });
  }
  (async () => {
   const request = await fetch(`https://discord.com/api/users/${params[0]}`, {
    method: "GET",
    headers: {
     authorization: `Bot ${client.token}`,
    },
   });
   if (!request.status === 200) {
    return res.json({
     code: 1,
     message: "Invaild user ID!",
    });
   }
   const json = await request.json();
   return res.json(json);
  })();
 },
};
