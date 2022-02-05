module.exports = {
 name: "/api/v1/info/bot_info",
 url: `${process.env.DOMAIN}${process.env.PORT == 8080 ? "" : `:${process.env.PORT}`}/api/v1/info/bot_info`,
 version: "v1",
 description: "Returns info about bot",
 category: "info",
 params: null,
 run: async (client, req, res, next) => {
  const json = {
   guilds: client.guilds.cache.size,
   id: client.id,
   members: client.guilds.cache.reduce((a, g) => a + g.memberCount, 0),
   prefix: process.env.PREFIX,
   channels: client.channels.cache.size,
   uptime: client.uptime,
  };
  res.json(json);
 },
};
