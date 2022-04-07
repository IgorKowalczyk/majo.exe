const moment = require("moment");

module.exports = async (client, guild, callback) => {
 /*await client.database.query(`SELECT joins as res, last_updated as ls from guild_stats WHERE guild_id = ${member.guild.id}`, async function (serror, sresults, sfields) {
  if (serror) console.log(serror);
  if (!sresults[0]) {
   const current_month = moment().daysInMonth();
   const stats = {};
   const empty_stats = {};
   for (let i = 1; i <= current_month; i++) {
    empty_stats[`${moment().year()}/${moment().format("MM")}/${i}`] = 0;
    stats[`${moment().year()}/${moment().format("MM")}/${i}`] = 0;
   }
   let current_day = moment().date();
   stats[`${moment().year()}/${moment().format("MM")}/${current_day}`] = 1;
   await client.database.query(`INSERT INTO guild_stats (guild_id, joins, leaves, last_updated) VALUES ('${member.guild.id}', '${JSON.stringify(stats)}', '${JSON.stringify(empty_stats)}', '${moment(new Date()).format("YYYY-MM-DD")}')`, function (sserror, ssresults, ssfields) {
    if (sserror) console.log(sserror);
   });
  } else {
   let array_stats = JSON.parse(sresults[0].res);
   let current_day = moment().date();
   const current_month = moment().daysInMonth();
   let last_updated = sresults[0].ls;
   if (!moment(last_updated).isSame(new Date(), "month")) {
    const empty_stats = {};
    for (let i = 1; i <= current_month; i++) {
     empty_stats[`${moment().year()}/${moment().format("MM")}/${i}`] = 0;
    }
    client.database.query(`UPDATE guild_stats SET leaves = '${JSON.stringify(empty_stats)}', joins = '${JSON.stringify(empty_stats)}', last_updated = '${moment(new Date()).format("YYYY-MM-DD")}' WHERE guild_id = ${member.guild.id}`, function (fixerror, fixresults, fixfields) {
     if (fixerror) console.log(fixerror);
    });
   } else {
    array_stats[`${moment().year()}/${moment().format("MM")}/${current_day}`]++;
    client.database.query(`UPDATE guild_stats SET joins = '${JSON.stringify(array_stats)}', last_updated = '${moment(new Date()).format("YYYY-MM-DD")}' WHERE guild_id = ${member.guild.id}`, function (ferror, fresults, fields) {
     if (ferror) console.log(ferror);
    });
   }
  }
 });*/
 await client.database.query(`SELECT * FROM guild_stats WHERE guild_id = ${guild.id}`, async function (error, results) {
  if (error) return console.log(error);
  if (!results[0]) {
   const empty_stats = {};
   for (let i = 1; i <= moment().daysInMonth(); i++) {
    empty_stats[`${moment().year()}/${moment().format("MM")}/${i}`] = 0;
   }
   await client.database.query(`INSERT INTO guild_stats (guild_id, joins, leaves, last_updated) VALUES ('${guild.id}', '${JSON.stringify(empty_stats)}', '${JSON.stringify(empty_stats)}', '${moment(new Date()).format("YYYY-MM-DD")}')`);
   return callback(empty_stats);
  } else {
   let last_updated = results[0].last_updated;
   if (!moment(last_updated).isSame(new Date(), "month")) {
    const empty_stats = {};
    for (let i = 1; i <= moment().daysInMonth(); i++) {
     empty_stats[`${moment().year()}/${moment().format("MM")}/${i}`] = 0;
    }
    client.database.query(`UPDATE guild_stats SET leaves = '${JSON.stringify(empty_stats)}', joins = '${JSON.stringify(empty_stats)}', last_updated = '${moment(new Date()).format("YYYY-MM-DD")}' WHERE guild_id = ${member.guild.id}`);
   } else {
    callback(results[0]);
   }
  }
 });
};
