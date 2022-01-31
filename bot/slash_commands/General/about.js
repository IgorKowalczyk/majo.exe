const { MessageEmbed } = require("discord.js");

module.exports = {
 name: "about",
 description: "📝 Info about the bot and developer",
 usage: "/about",
 category: "General",
 run: async (client, interaction, args) => {
  try {
   const embed = new MessageEmbed()
    .setAuthor({ name: client.config.author })
    .setTimestamp()
    .setThumbnail(
     client.user.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     })
    )
    .setColor("RANDOM")
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
    embed.addField(`${client.bot_emojis.owner_crown} About Dev`, "> " + client.config.about_dev);
   }
   interaction.followUp({ embeds: [embed] });
  } catch (err) {
   console.log(err);
   return client.createSlashCommandError(interaction, err);
  }
 },
};
