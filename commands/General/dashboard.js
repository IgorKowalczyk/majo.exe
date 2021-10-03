const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
 name: "dashboard",
 aliases: [],
 description: "Provide link to the web-dashboard",
 category: "General",
 usage: "dashboard",
 run: async (client, message, args) => {
  try {
   if (!process.env.DOMAIN) {
    const embed = new MessageEmbed() // Prettier
     .setTitle(`${client.bot_emojis.error} Mheh!`)
     .setDescription("Our dashboard is not working at the moment, please try again later! We are sorry...")
     .setTimestamp()
     .setColor("RANDOM")
     .setFooter(
      `Requested by ${message.author.username}`,
      message.author.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      })
     );
    return message.reply({ embeds: [embed] });
   }
   const embed = new MessageEmbed() // Prettier
    .setTitle(`${client.bot_emojis.success} Yay!`)
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter(
     `Requested by ${message.author.username}`,
     message.author.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     })
    );

   const row = new MessageActionRow() // Prettier
    .addComponents(
     new MessageButton() // Prettier
      .setURL(process.env.DOMAIN)
      .setLabel("Dashboard")
      .setStyle("LINK")
    );
   message.reply({ embeds: [embed] });
   if (message.member.permissions.has("MANAGE_GUILD")) {
    embed.setDescription(`${client.bot_emojis.link} | Your server link: ${process.env.DOMAIN}/dashboard/${message.guild.id}\n${client.bot_emojis.link} | Dashboard link: ${process.env.DOMAIN}`);
    row.addComponents(
     new MessageButton() // Prettier
      .setURL(`${process.env.DOMAIN}/dashboard/${message.guild.id}`)
      .setLabel("Server Dashboard")
      .setStyle("LINK")
    );
   } else {
    embed.setDescription("🔗 Our dashboard link: " + process.env.DOMAIN);
   }
   message.reply({ embeds: [embed], components: [row] });
  } catch (err) {
   console.log(err);
   return client.createCommandError(message, err);
  }
 },
};
