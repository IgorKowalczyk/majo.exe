const fetch = require("node-fetch");

module.exports = {
 name: "/api/v1/info/guild",
 version: "v1",
 description: "Returns info about guild",
 category: "info",
 params: ["guildID"],
 run: async (client, req, res, next, params) => {
  if (!params[0]) {
   return res.json({
    code: 2,
    message: "Invaild guild ID!",
   });
  }
  if (isNaN(params[0])) {
   return res.json({
    code: 2,
    message: "Invaild guild ID!",
   });
  }
  (async () => {
   const request = await fetch(`https://discord.com/api/guilds/${params[0]}`, {
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
 },
};
