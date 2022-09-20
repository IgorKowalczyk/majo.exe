const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const fetch = require("node-fetch");

module.exports = async (client, interaction, args) => {
 try {
  const user = interaction.guild.members.cache.get(args[1]);
  if (!user) {
   return client.createSlashError(interaction, `${client.bot_emojis.error} | I couldn't find that user!`);
  }
  const response = await fetch(`https://discord.com/api/users/${user.id}`, {
   headers: {
    Authorization: `Bot ${client.token}`,
   },
  });
  const data = await response.json();
  if (data.banner) {
   const ext = data.banner.startsWith("a_") ? ".gif?size=4096" : ".png?size=4096";
   const url = `https://cdn.discordapp.com/banners/${user.user.id}/${data.banner}${ext}`;
   const row = new MessageActionRow().addComponents(
    // Prettier
    new MessageButton() // Prettier
     .setLabel("Banner link")
     .setStyle("LINK")
     .setURL(url)
   );
   const embed = new MessageEmbed()
    .setColor("RANDOM")
    .setImage(url)
    .setAuthor({ name: `${user.user.username} Banner`, iconURL: user.user.displayAvatarURL() })
    .setDescription(`> ${client.bot_emojis.link} [Banner link](${url})`)
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
   return client.createSlashError(interaction, `${client.bot_emojis.error} | User has no custom banner!`);
  }
 } catch (err) {
  console.log(err);
  return client.createSlashCommandError(interaction, err);
 }
};
