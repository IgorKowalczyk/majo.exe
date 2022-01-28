const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
 name: "connect-dashboard",
 description: "🔌 Connect the server to the web dashboard",
 run: async (client, interaction, args) => {
  try {
   if (process.env.DOMAIN) {
    const wait = new MessageEmbed() // Prettier
     .setColor("#5865f2")
     .setDescription(`${client.bot_emojis.loading} | Please wait... I'm connecting this server to dashboard`);
    interaction.followUp({ embeds: [wait] }).then((msg) => {
     (async () => {
      await interaction.guild.fetch();
      const embed = new MessageEmbed() // Prettier
       .setColor("GREEN")
       .setTitle(`${client.bot_emojis.success} Connected!`)
       .setDescription(`The server has been connected! Now you can safely return to the dashboard and manage your server. If you have any further issues, please contact us using the [contact form on our dashboard!](${process.env.DOMAIN}/contact)`)
       .setThumbnail(interaction.guild.iconURL())
       .setFooter({
        text: `Requested by ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL({
         dynamic: true,
         format: "png",
         size: 2048,
        }),
       })
       .setTimestamp();
      const row = new MessageActionRow() // Prettier
       .addComponents(
        new MessageButton() // Prettier
         .setURL(process.env.DOMAIN)
         .setLabel("Dashboard")
         .setStyle("LINK")
       );
      await msg.edit({ embeds: [embed], components: [row] });
     })();
    });
   } else {
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
  } catch (err) {
   console.log(err);
   return client.createSlashCommandError(interaction, err);
  }
 },
};
