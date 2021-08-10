const Discord = require("discord.js");
const sql = require("../../utilities/database");
const config = require("../../config");
const prefix = process.env.PREFIX;

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
    const sqlquery = "SELECT rep AS res FROM reputation WHERE memberid = " + member.id;
    sql.query(sqlquery, function (error, results, fields) {
     if (error) return console.log(error);
     if (results[0]) {
      console.log(parseInt(Object.values(JSON.parse(JSON.stringify(results[0])))) + 1)
      const sum = Object.values(JSON.parse(JSON.stringify(results[0]))) + 1;
      const update = "UPDATE reputation SET rep = " + sum + " WHERE memberid = " + member.id;
      sql.query(update, function (error, results, fields) {
       if (error) console.log(error);
       message.lineReply({
        embed: {
         color: 4779354,
         description: `✨ | Success!`,
        },
       });
      });
     } else {
      const insert = "INSERT INTO `reputation` (`memberid`, `rep`) VALUES (" + member.id + "," + 1 + ");";
      sql.query(insert, function (error, results, fields) {
       if (error) console.log(error);
       message.lineReply({
        embed: {
         color: 4779354,
         description: `✨ | Success!`,
        },
       });
      });
     }
    });
   } else if (args[0] === "-") {
    // Remove reputation
    message.lineReply("Remove reputation");
   } else {
    // Check reputation
    const sqlquery = "SELECT rep AS res FROM `reputation` WHERE memberid = " + member.id;
    sql.query(sqlquery, function (error, results, fields) {
     if (error) return console.log(error);
     const embed = new Discord.MessageEmbed()
      .setTitle(`${member.user.username} Reputation`)
      .setDescription(`✨ ${member} reputation: \`${results[0] ? Object.values(JSON.parse(JSON.stringify(results[0]))) : rep = 0}\`\n\n💡 You can add or remove user reputation by using: \`${prefix} reputation [+/-] <member>\``)
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
