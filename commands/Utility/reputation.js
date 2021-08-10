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
    message.lineReply("Add reputation");
   } else if (args[0] === "-") {
    // Remove reputation
    message.lineReply("Remove reputation");
   } else {
    // Check reputation
    const sqlquery = "SELECT rep AS res FROM `reputation` WHERE memberid = " + member.id;
    sql.query(sqlquery, function (error, results, fields) {
     if (error) return console.log(error);
     const embed = new Discord.MessageEmbed()
      .setTitle("Reputation")
      .setDescription(`${member} reputation: \`${results[0] ? (rep = results[0]) : (rep = 0)}\`\nYou can add or remove reputation by using \`${prefix} reputation [+/-] <member>\``)
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
