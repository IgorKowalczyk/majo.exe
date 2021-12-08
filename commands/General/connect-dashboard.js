const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
 name: "connect-dashboard",
 aliases: [],
 description: "Connect the server to the web dashboard",
 category: "General",
 usage: "connect-dashboard",
 run: async (client, message, args) => {
  try {
   message.guild.fetch();
   message.guild.members.fetch();
   if (process.env.DOMAIN) {
   const embed = new MessageEmbed() // Prettier
    .setColor("GREEN")
    .setTitle(`${client.bot_emojis.success} Connected!`)
    .setDescription(`The server has been connected! Now you can safely return to the dashboard and manage your server. If you have any further issues, please contact us using the [contact form on our dashboard!](${process.env.DOMAIN}/contact)`)
    .setThumbnail(message.guild.iconURL())
    .setFooter(
     `Requested by ${message.author.username}`,
     message.author.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     })
    )
    .setTimestamp();
    const row = new MessageActionRow() // Prettier
    .addComponents(
     new MessageButton() // Prettier
      .setURL(process.env.DOMAIN)
      .setLabel("Dashboard")
      .setStyle("LINK")
    );
   message.reply({ embeds: [embed], components: [row] });
    } else {
     const embed = new MessageEmbed() // Prettier
     .setTitle(`${client.bot_emojis.error} Mheh!`)
     .setDescription("Our dashboard is not working at the moment, please try again later! We are sorry...")
     .setTimestamp()
     .setColor("RED")
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
  } catch (err) {
   console.log(err);
   return client.createCommandError(message, err);
  }
 },
};
