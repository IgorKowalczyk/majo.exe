const Discord = require("discord.js");
const sql = require("../../utilities/database");
const config = require("../../config");
const prefix = process.env.PREFIX;

module.exports = {
 name: "reputation",
 aliases: ["rep"],
 description: "Adds, checks or removes reputation for a user",
 category: "Utility",
 usage: "reputation [+ | add / - | remove / * | check] <user>",
 run: async (client, message, args) => {
  try {
   const member =  (await message.mentions.members.first()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find((r) => r.user.username.toLowerCase().includes() === args.join(" ").toLocaleLowerCase()) || message.guild.members.cache.find((r) => r.displayName.toLowerCase().includes() === args.join(" ").toLocaleLowerCase());
   console.log(member.id)
   if (!member) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: "<:error:860884617770303519> | You must mention vaild member!",
     },
    });
   }
   const sqlquery = "SELECT rep AS res FROM `reputation` WHERE memberid = " + member.id;
   sql.query(sqlquery, function (error, results, fields) {
    if (error) return console.log(error);
    if (results[0]) {
     message.lineReply({
      embed: {
       color: 4779354,
       description: `Your reputation: \`${results[0].res}\``,
      },
     });
    } else {
     message.lineReply({
      embed: {
       color: 16734039,
       description: `Your reputation: \`0\``,
      },
     });
    }
   });
  } catch (err) {
   message.lineReply({
    embed: {
     color: 16734039,
     description: "Something went wrong... :cry:",
    },
   });
  }
 },
};
