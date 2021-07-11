const Discord = require("discord.js");
const config = require("../../config");

module.exports = {
 name: "repo",
 aliases: ["open-source", "code", "github-repo"],
 description: "Provide link to the github project",
 category: "General",
 usage: "repo",
 run: async (client, message, args) => {
  try {
   if (!config.github && !config.repo) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: "<:error:860884617770303519> | This project is close-source! Sorry!\n||If you are dev check the `config.js` file!||",
     },
    });
   }
   const embed = new Discord.MessageEmbed() // Prettier
    .setTitle("🐙" + client.username + " Github Repo")
    .setDescription("📚 This project is open source, you can check code at: [@" + config.github + "/" + config.repo + "](https://github.com/" + config.github + "/" + config.repo + ")")
    .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: "png", size: 2048 }))
    .setColor("RANDOM")
    .setTimestamp();
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
