const { MessageEmbed } = require("discord.js");

module.exports = {
 name: "repo",
 aliases: ["open-source", "code", "github-repo"],
 description: "Provide link to the github project",
 category: "General",
 usage: "repo",
 run: async (client, message, args) => {
  try {
   if (!client.config.github && !client.config.github_repo) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error} | This project is close-source!`,
     },
    });
   }
   function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
   }
   const embed = new MessageEmbed() // Prettier
    .setTitle(`${client.bot_emojis.octo} ${capitalize(client.user.username)} Github Repo`)
    .setDescription(`${client.bot_emojis.book} This project is open source, you can check the code at: [@${client.config.github}/${client.config.github_repo}](https://github.com/${client.config.github}/${client.config.github_repo})`)
    .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: "png", size: 2048 }))
    .setColor("RANDOM")
    .setTimestamp();
   message.reply({ embeds: [embed] });
  } catch (err) {
   console.log(err);
   message.reply({embeds: [client.command_error_embed]})
  }
 },
};
