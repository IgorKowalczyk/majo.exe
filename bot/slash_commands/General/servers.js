const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
 name: "servers",
 description: "👾 Displays total servers where I'm",
 usage: "/servers",
 category: "General",
 allow_dm: true,
 run: async (client, interaction, args) => {
  try {
   const guilds = client.guilds.cache.size;
   const members = client.guilds.cache.reduce((a, g) => a + g.memberCount, 0);
   const embed = new MessageEmbed() // Prettier
    .setTitle(`${client.bot_emojis.rocket} I'm in \`${guilds}\` servers!`)
    //.addField(`${client.bot_emojis.member} Total users`, `\`${members} members\``, true)
   // .addField(`${client.bot_emojis.channel} Total channels`, `\`${client.channels.cache.size} channels\``, true)
    .setDescription(`> **I serve over \`${client.all_commands}\` commands on \`${guilds}\` servers to \`${members}\` users!**`)
    .setFooter({
     text: `Requested by ${interaction.user.username}`,
     iconURL: interaction.user.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     }),
    })
    .setImage("https://media.discordapp.net/attachments/710425657003212810/884064564034023454/Screenshot_2021-09-05-15-16-44-22_7c6675ada7b05a8d2d5c5ffa2a487337.jpg")
    .setColor("#5865F2")
    .setTimestamp();
   const row = new MessageActionRow() // Prettier
    .addComponents(
     new MessageButton() // Prettier
      .setURL(`https://discord.com/oauth2/authorize/?permissions=${client.config.permissions}&scope=${client.config.scopes}&client_id=${client.user.id}`)
      .setEmoji(client.bot_emojis.channel)
      .setLabel("Invite me!")
      .setStyle("LINK")
    );
   interaction.followUp({ embeds: [embed], components: [row] });
  } catch (err) {
   console.log(err);
   return client.createSlashCommandError(interaction, err);
  }
 },
};
