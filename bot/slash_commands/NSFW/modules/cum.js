const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = async (client, interaction, args) => {
 (async () => {
  try {
   if (!interaction.channel.nsfw) {
    const nsfwembed = new MessageEmbed()
     .setColor("RED")
     .setDescription(`${client.bot_emojis.anger} | You can use this command only in an NSFW Channel!`)
     .setFooter({
      text: `Requested by ${interaction.user.username}`,
      iconURL: interaction.user.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      }),
     })
     .setImage("https://media.discordapp.net/attachments/721019707607482409/855827123616481300/nsfw.gif");
    return interaction.followUp({ embeds: [nsfwembed] });
   }
   const response = await fetch("http://api.nekos.fun:8080/api/cum");
   const body = await response.json();
   const embed = new MessageEmbed() // Prettier
    .setTitle(":smirk: Cum")
    .setImage(body.image)
    .setColor("RANDOM")
    .setFooter({
     text: `Requested by ${interaction.user.username}`,
     iconURL: interaction.user.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     }),
    })
    .setTimestamp()
    .setURL(body.image);
   interaction.followUp({ embeds: [embed] });
  } catch (err) {
   console.log(err);
   return client.createSlashCommandError(interaction, err);
  }
 })();
};
