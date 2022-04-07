const fetch_stats = require("./fetch");
const moment = require("moment");

module.exports = async (client, guild) => {
 await fetch_stats(client, guild, function (stats) {
  if (!stats) return;
  const joins = JSON.parse(stats.joins);
  joins[`${moment().year()}/${moment().format("MM")}/${moment().date()}`]++;
  client.database.query(`UPDATE guild_stats SET joins = '${JSON.stringify(joins)}', last_updated = '${moment(new Date()).format("YYYY-MM-DD")}' WHERE guild_id = ${guild.id}`);
 });
};
