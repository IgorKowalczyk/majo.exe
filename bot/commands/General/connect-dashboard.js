const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
 name: "connect-dashboard",
 aliases: [],
 description: "Connect the server to the web dashboard",
 category: "General",
 usage: "connect-dashboard",
 run: async (client, message, args) => {
  try {
   if (process.env.DOMAIN) {
    const wait = new MessageEmbed() // Prettier
     .setColor("#5865f2")
     .setDescription(`${client.bot_emojis.loading} | Please wait... I'm connecting this server to dashboard`);
    message.reply({ embeds: [wait] }).then((msg) => {
     (async () => {
      await message.guild.fetch();
      const embed = new MessageEmbed() // Prettier
       .setColor("GREEN")
       .setTitle(`${client.bot_emojis.success} Connected!`)
       .setDescription(`The server has been connected! Now you can safely return to the dashboard and manage your server. If you have any further issues, please contact us using the [contact form on our dashboard!](${process.env.DOMAIN}/contact)`)
       .setThumbnail(message.guild.iconURL())
       .setFooter({
        text: `Requested by ${message.author.username}`,
        iconURL: message.author.displayAvatarURL({
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
      text: `Requested by ${message.author.username}`,
      iconURL: message.author.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      }),
     });
    return message.reply({ embeds: [embed] });
   }
  } catch (err) {
   console.log(err);
   return client.createCommandError(message, err);
  }
 },
};
