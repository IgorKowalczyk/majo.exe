const Discord = require("discord.js");

module.exports = {
 name: "dependencies",
 aliases: [],
 description: "Returns the amount of dependencies that I use",
 category: "General",
 usage: "dependencies",
 run: async (client, message, args) => {
  try {
   const embed = new Discord.MessageEmbed() // Prettier()
    .setTitle("📦 Dependencies")
    .setDescription(client.user.tag + " run on " + Object.keys(require("../package").dependencies).length + " npm dependencies (Javascript power 💪)")
    .setTimestamp()
    .setImage("https://i.redd.it/tfugj4n3l6ez.png")
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
