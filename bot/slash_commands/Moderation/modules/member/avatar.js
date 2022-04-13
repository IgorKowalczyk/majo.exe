const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const fetch = require("node-fetch");

module.exports = async (client, interaction, args) => {
 try {
  const user = interaction.guild.members.cache.get(args[1]);
  if (!user) {
   return client.createSlashError(interaction, `${client.bot_emojis.error} | I couldn't find that user!`);
  }
  if (args[2]) {
   const response = await fetch(`https://discord.com/api/guilds/${interaction.guild.id}/members/${user.id}`, {
    headers: {
     Authorization: `Bot ${client.token}`,
    },
   });
   const data = await response.json();
   if (data.avatar) {
    const ext = data.avatar.startsWith("a_") ? ".gif?size=4096" : ".png?size=4096";
    const url = `https://cdn.discordapp.com/guilds/${interaction.guild.id}/users/${user.id}/avatars/${data.avatar}${ext}`;
    const row = new MessageActionRow().addComponents(
     // Prettier
     new MessageButton() // Prettier
      .setLabel("Avatar Link")
      .setStyle("LINK")
      .setURL(url)
    );
    const embed = new MessageEmbed()
     .setColor("RANDOM")
     .setImage(url)
     .setAuthor({ name: `${user.user.username} server avatar`, iconURL: url })
     .setDescription(`> ${client.bot_emojis.link} [Avatar link](${url})`)
     .setTimestamp()
     .setFooter({
      text: `Requested by ${interaction.user.username}`,
      iconURL: interaction.user.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      }),
     });
    return interaction.followUp({ embeds: [embed], components: [row] });
   } else {
    return client.createSlashError(interaction, `${client.bot_emojis.error} | User has no custom avatar!`);
   }
  } else {
   const avatar = user.user.displayAvatarURL({
    dynamic: true,
    format: "png",
    size: 4096,
   });
   const row = new MessageActionRow() // Prettier
    .addComponents(
     // Prettier
     new MessageButton() // Prettier
      .setLabel("Avatar Link")
      .setStyle("LINK")
      .setURL(avatar)
    );
   const embed = new MessageEmbed() // Prettier
    .setColor("#5865f2")
    .setDescription(`${user.user.tag}'s Avatar`)
    .setImage(avatar)
    .setTimestamp()
    .setFooter({
     text: `Requested by ${interaction.user.username}`,
     iconURL: interaction.user.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     }),
    });
   await interaction.followUp({ embeds: [embed], components: [row] });
  }
 } catch (err) {
  console.log(err);
  return client.createSlashCommandError(interaction, err);
 }
};
