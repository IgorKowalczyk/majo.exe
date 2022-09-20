const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
 name: "contact",
 description: "📝 Provide website link to contact us",
 usage: "/contact",
 category: "General",
 run: async (client, interaction, args) => {
  try {
   if (!process.env.DOMAIN) {
    const embed = new MessageEmbed() // Prettier
     .setTitle(`${client.bot_emojis.error} Mheh!`)
     .setDescription("Our dashboard (and the contact page itself) is not working at the moment, please try again later! We are sorry...")
     .setTimestamp()
     .setColor("RANDOM")
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
    .setDescription(`${client.bot_emojis.link} | Contact Form: ${process.env.DOMAIN}/contact`)
    .setTimestamp()
    .setColor("RANDOM")
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
      .setURL(`${process.env.DOMAIN}/contact`)
      .setLabel("Contact")
      .setStyle("LINK")
    )
    .addComponents(
     new MessageButton() // Prettier
      .setURL(process.env.DOMAIN)
      .setLabel("Dashboard")
      .setStyle("LINK")
    );
   interaction.followUp({ embeds: [embed], components: [row] });
  } catch (err) {
   console.log(err);
   return client.createSlashCommandError(interaction, err);
  }
 },
};
