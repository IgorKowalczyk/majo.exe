module.exports = {
 name: "/api/v1/info/bot",
 url: `${process.env.DOMAIN}${process.env.PORT == 8080 ? "" : `:${process.env.PORT}`}/api/v1/info/bot`,
 version: "v1",
 description: "Returns info about bot",
 category: "info",
 params: null,
 run: async (client, req, res, next) => {
  const json = {
   guilds: client.guilds.cache.size,
   id: client.application.id,
   members: client.guilds.cache.reduce((a, g) => a + g.memberCount, 0),
   channels: {
    total: client.channels.cache.size,
    voice: client.channels.cache.filter((c) => c.type === "GUILD_VOICE").size,
    text: client.channels.cache.filter((c) => c.type === "GUILD_TEXT").size,
    category: client.channels.cache.filter((c) => c.type === "GUILD_CATEGORY").size,
    news: client.channels.cache.filter((c) => c.type === "GUILD_NEWS").size,
    stage: client.channels.cache.filter((c) => c.type === "GUILD_STAGE_VOICE").size,
    unknown: client.channels.cache.filter((c) => c.type === "UNKNOWN").size,
   },
   uptime: client.uptime,
  };
  res.json(json);
 },
};
