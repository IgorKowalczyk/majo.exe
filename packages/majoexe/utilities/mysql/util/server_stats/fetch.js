const moment = require("moment");

module.exports = async (client, guild, callback) => {
 await client.database.query(`SELECT * FROM guild_stats WHERE guild_id = ${guild.id}`, async function (error, results) {
  if (error) return console.log(error);
  if (!results[0]) {
   const empty_stats = {};
   for (let i = 1; i <= moment().daysInMonth(); i++) {
    empty_stats[`${moment().year()}/${moment().format("MM")}/${i}`] = 0;
   }
   await client.database.query(`INSERT INTO guild_stats (guild_id, joins, leaves, last_updated) VALUES ('${guild.id}', '${JSON.stringify(empty_stats)}', '${JSON.stringify(empty_stats)}', '${moment(new Date()).format("YYYY-MM-DD")}')`);
   return callback({ guild_id: guild.id, joins: JSON.stringify(empty_stats), leaves: JSON.stringify(empty_stats) });
  } else {
   let last_updated = results[0].last_updated;
   if (!moment(last_updated).isSame(new Date(), "month")) {
    const empty_stats = {};
    for (let i = 1; i <= moment().daysInMonth(); i++) {
     empty_stats[`${moment().year()}/${moment().format("MM")}/${i}`] = 0;
    }
    client.database.query(`UPDATE guild_stats SET leaves = '${JSON.stringify(empty_stats)}', joins = '${JSON.stringify(empty_stats)}', last_updated = '${moment(new Date()).format("YYYY-MM-DD")}' WHERE guild_id = ${guild.id}`);
    return callback({ guild_id: guild.id, joins: JSON.stringify(empty_stats), leaves: JSON.stringify(empty_stats) });
   } else {
    return callback(results[0]);
   }
  }
 });
};
