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
   if (!config.github && !config.github_repo) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error} | This project is close-source! Sorry!\n||If you are dev check the \`config.js\` file!||`,
     },
    });
   }
   function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
   }
   const embed = new Discord.MessageEmbed() // Prettier
    .setTitle(`${client.bot_emojis.octo} ${capitalize(client.user.username)} Github Repo`)
    .setDescription(`${client.bot_emojis.book} This project is open source, you can check the code at: [@${config.github}/${config.github_repo}](https://github.com/${config.github}/${config.github_repo})`)
    .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: "png", size: 2048 }))
    .setColor("RANDOM")
    .setTimestamp();
   message.lineReply(embed);
  } catch (err) {
   message.lineReply({
    embed: {
     color: 16734039,
     description: `Something went wrong... ${client.bot_emojis.sadness}`,
    },
   });
  }
 },
};
