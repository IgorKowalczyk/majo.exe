const Discord = require("discord.js");
const sql = require("../../utilities/database");
const config = require("../../config");
const prefix = process.env.PREFIX;
const Timeout = new Map();
const ms = require("ms");
const timeout = 10800000;

module.exports = {
 name: "reputation",
 aliases: ["rep"],
 description: "Adds, checks or removes reputation for a user",
 category: "Utility",
 usage: "reputation [+ / add or - / remove] <user>",
 run: async (client, message, args) => {
  try {
   const member = (await message.mentions.members.first()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find((r) => r.user.username.toLowerCase().includes() === args.join(" ").toLocaleLowerCase()) || message.guild.members.cache.find((r) => r.displayName.toLowerCase().includes() === args.join(" ").toLocaleLowerCase());
   if (!member) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: "<:error:860884617770303519> | You must mention vaild member!",
     },
    });
   }
   if (args[0] === "+") {
    // Add reputation
    if (member == message.author || member.id == message.author.id) {
     return message.lineReply({
      embed: {
       color: 16734039,
       description: `<:error:860884617770303519> | You can't assign reputation to yourself!`,
      },
     });
    }
    const key = message.author.id + "420$%@&$&@!$!@$@";
    const found = Timeout.get(key);
    if (found) {
     const timePassed = Date.now() - found;
     const timeLeft = timeout - timePassed;
     return message.lineReply({
      embed: {
       color: 16734039,
       description: ` <:error:860884617770303519> | ${message.author} slow down! You have to wait \`${ms(timeLeft)}\` before you can add reputaton again!`,
      },
     });
    }
    const sqlquery = "SELECT rep AS res FROM reputation WHERE memberid = " + member.id;
    sql.query(sqlquery, function (error, results, fields) {
     if (error) return console.log(error);
     if (results[0]) {
      const sum = parseInt(Object.values(JSON.parse(JSON.stringify(results[0])))) + 1;
      const update = "UPDATE reputation SET rep = " + sum + " WHERE memberid = " + member.id;
      sql.query(update, function (error, results2, fields) {
       if (error) console.log(error);
       message.lineReply({
        embed: {
         color: 4779354,
         description: `<:success:860884617820110909> | Success! Reputation added! ${member} now has \`${sum}\` reputation points!`,
        },
       });
      });
     } else {
      const insert = "INSERT INTO `reputation` (`memberid`, `rep`) VALUES (" + member.id + "," + 1 + ");";
      sql.query(insert, function (error, results3, fields) {
       if (error) console.log(error);
       message.lineReply({
        embed: {
         color: 4779354,
         description: `<:success:860884617820110909> | Success! Reputation added! ${member} now has \`1\` reputation points!`,
        },
       });
      });
     }
    });
    Timeout.set(key, Date.now());
    setTimeout(() => {
     Timeout.delete(key);
    }, timeout);
   } else if (args[0] === "-") {
    // Remove reputation
    if (member == message.author || member.id == message.author.id) {
     return message.lineReply({
      embed: {
       color: 16734039,
       description: `<:error:860884617770303519> | You can't assign reputation to yourself!`,
      },
     });
    }
    const key = message.author.id + "420$%@&$&@!$!@$@";
    const found = Timeout.get(key);
    if (found) {
     const timePassed = Date.now() - found;
     const timeLeft = timeout - timePassed;
     return message.lineReply({
      embed: {
       color: 16734039,
       description: ` <:error:860884617770303519> | ${message.author} slow down! You have to wait \`${ms(timeLeft)}\` before you can remove reputaton again!`,
      },
     });
    }
    const sqlquery = "SELECT rep AS res FROM reputation WHERE memberid = " + member.id;
    sql.query(sqlquery, function (error, results, fields) {
     if (error) return console.log(error);
     if (results[0]) {
      const sum = parseInt(Object.values(JSON.parse(JSON.stringify(results[0])))) - 1;
      const update = "UPDATE reputation SET rep = " + sum + " WHERE memberid = " + member.id;
      sql.query(update, function (error, results2, fields) {
       if (error) console.log(error);
       message.lineReply({
        embed: {
         color: 4779354,
         description: `<:success:860884617820110909> | Success! Reputation removed! ${member} now has \`${sum}\` reputation points!`,
        },
       });
      });
     } else {
      const insert = "INSERT INTO `reputation` (`memberid`, `rep`) VALUES (" + member.id + "," + "-1" + ");";
      sql.query(insert, function (error, results3, fields) {
       if (error) console.log(error);
       message.lineReply({
        embed: {
         color: 4779354,
         description: `<:success:860884617820110909> | Success! Reputation removed! ${member} now has \`-1\` reputation points!`,
        },
       });
      });
     }
    });
    Timeout.set(key, Date.now());
    setTimeout(() => {
     Timeout.delete(key);
    }, timeout);
   } else {
    // Check reputation
    const sqlquery = "SELECT rep AS res FROM `reputation` WHERE memberid = " + member.id;
    sql.query(sqlquery, function (error, results, fields) {
     if (error) return console.log(error);
     const embed = new Discord.MessageEmbed()
      .setTitle(`👏 ${member.user.username} Reputation`)
      .setDescription(`✨ ${member} reputation: \`${results[0] ? Object.values(JSON.parse(JSON.stringify(results[0]))) : (rep = 0)}\`\n\n💡 You can add or remove user reputation by using: \`${prefix} reputation [+/-] <member>\``)
      .setTimestamp()
      .setThumbnail(member.user.displayAvatarURL())
      .setColor("RANDOM")
      .setFooter(
       "Requested by " + `${message.author.username}`,
       message.author.displayAvatarURL({
        dynamic: true,
        format: "png",
        size: 2048,
       })
      );
     message.lineReply(embed);
    });
   }
  } catch (err) {
   console.log(err);
   message.lineReply({
    embed: {
     color: 16734039,
     description: "Something went wrong... :cry:",
    },
   });
  }
 },
};
