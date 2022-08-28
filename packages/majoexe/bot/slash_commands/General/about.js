const { MessageEmbed } = require("discord.js");

module.exports = {
 name: "about",
 description: "🏷️ View info about me bot and developer",
 usage: "/about",
 category: "General",
 run: async (client, interaction, args) => {
  try {
   const embed = new MessageEmbed()
    .setAuthor({ name: `${client.user.username} is developed by: Majonez.exe#2495` })
    .setThumbnail(
     client.user.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     })
    )
    .setColor("#5865f2")
    .setFooter({
     text: `Requested by ${interaction.user.username}`,
     iconURL: interaction.user.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     }),
    })
    .addField(`${client.bot_emojis.discord_logo} About ${client.user.username}`, "> " + client.config.about_bot);
   if (client.config.about_dev) {
    embed.addField(`${client.bot_emojis.owner} About Developer (Majonez.exe#2495)`, "> " + client.config.about_dev);
   }
   interaction.followUp({ embeds: [embed] });
  } catch (err) {
   console.log(err);
   return client.createSlashCommandError(interaction, err);
  }
 },
};
