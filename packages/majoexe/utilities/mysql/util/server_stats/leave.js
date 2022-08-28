const fetch_stats = require("./fetch");
const moment = require("moment");

module.exports = async (client, guild) => {
 await fetch_stats(client, guild, function (stats) {
  if (!stats) return;
  const leaves = JSON.parse(stats.leaves);
  leaves[`${moment().year()}/${moment().format("MM")}/${moment().date()}`]++;
  client.database.query(`UPDATE guild_stats SET leaves = '${JSON.stringify(leaves)}', last_updated = '${moment(new Date()).format("YYYY-MM-DD")}' WHERE guild_id = ${guild.id}`);
 });
};
