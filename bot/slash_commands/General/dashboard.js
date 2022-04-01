const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
 name: "dashboard",
 description: "💻 Get the link to your web panel",
 usage: "/dashboard",
 category: "General",
 run: async (client, interaction, args) => {
  try {
   if (!process.env.DOMAIN) {
    const embed = new MessageEmbed() // Prettier
     .setTitle(`${client.bot_emojis.error} Mheh!`)
     .setDescription("Our dashboard is not working at the moment, please try again later! We are sorry...")
     .setTimestamp()
     .setColor("RED")
     .setFooter({
      text: `Requested by ${interaction.user.username}`,
      iconURL: interaction.user.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      }),
     });
    return interaction.followUp({ embeds: [embed] });
   }
   const embed = new MessageEmbed() // Prettier
    .setTitle(`${client.bot_emojis.success} Yay!`)
    .setTimestamp()
    .setColor("#5865F2")
    .setFooter({
     text: `Requested by ${interaction.user.username}`,
     iconURL: interaction.user.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     }),
    });

   const row = new MessageActionRow() // Prettier
    .addComponents(
     new MessageButton() // Prettier
      .setURL(process.env.DOMAIN)
      .setLabel("Dashboard")
      .setStyle("LINK")
    );
   // interaction.followUp({ embeds: [embed] });
   if (interaction.member.permissions.has("MANAGE_GUILD")) {
    embed.setDescription(`${client.bot_emojis.link} | Your server link: ${process.env.DOMAIN}/dashboard/${interaction.guild.id}\n${client.bot_emojis.link} | Dashboard link: ${process.env.DOMAIN}`);
    row.addComponents(
     new MessageButton() // Prettier
      .setURL(`${process.env.DOMAIN}/dashboard/${interaction.guild.id}`)
      .setLabel("Server Dashboard")
      .setStyle("LINK")
    );
   } else {
    embed.setDescription("🔗 Our dashboard link: " + process.env.DOMAIN);
   }
   interaction.followUp({ embeds: [embed], components: [row] });
  } catch (err) {
   console.log(err);
   return client.createSlashCommandError(interaction, err);
  }
 },
};
