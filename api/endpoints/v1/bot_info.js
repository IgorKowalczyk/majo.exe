module.exports = (app, client) => {
 app.get("/api/v1/bot_info", (req, res, next) => {
  const json = {
   guilds: client.guilds.cache.size,
   id: client.id,
   members: client.guilds.cache.reduce((a, g) => a + g.memberCount, 0),
   prefix: process.env.PREFIX,
   channels: client.channels.cache.size,
   uptime: client.uptime,
  };
  res.json(json);
 });
};
