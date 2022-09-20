const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = async (client, message) => {
 try {
  if (!message) return;
  if (message.guild) {
   if (!message.guild.me.permissions.has("EMBED_LINKS")) return;
   if (!message.guild.me.permissions.has("SEND_MESSAGES")) return;
  }
  if (message.content.toLowerCase() == "get the cross") {
   message.react("🤌");
  }
  if (message.author.bot) return;
  if (message.guild && !message.author.bot && message.embeds.length > 0 && !message.content.includes(`http`)) {
   const sqlquery = "SELECT anti_selfbots AS res FROM `guild_settings` WHERE guildid = " + message.guild.id;
   client.database.query(sqlquery, function (error, results, fields) {
    if (error) return console.log(error);
    if (results[0]) {
     let selfbot = parseInt(Object.values(JSON.parse(JSON.stringify(results[0]))));
     if (selfbot == 1) {
      const error_message = new MessageEmbed().setColor("RED").setDescription(`${message.author} no selfbots in ${message.guild.name} (ID: \`${message.guild.id}\`)!`);
      message.author.send({ embeds: [error_message] });
      return message.delete();
     }
    }
   });
  }
  if (message.content === `<@${client.user.id}>` || message.content === `<@!${client.user.id}>`) {
   const embed = new MessageEmbed() // Prettier
    // .setTitle(`${client.bot_emojis.success} Hi!`, message.guild.iconURL())
    .setColor("GREEN")
    .setAuthor({ name: `${client.bot_emojis.wave} Hello ${message.author.username}`, iconURL: client.user.displayAvatarURL({ dynamic: true, format: "png", size: 2048 }) })
    .setDescription(`> I was pinged by you, here I am - <@${client.user.id}>!\n> To see all  my commands please type \`/help\` (as slash command ${client.bot_emojis.slash_commands})!`)
    .setTimestamp()
    .setThumbnail(client.user.displayAvatarURL({ dynamic: true, format: "png", size: 2048 }))
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
  const embed = new MessageEmbed() // Prettier
   .setDescription(`${client.bot_emojis.error} | Something went wrong! Please try again later!`)
   .setColor("RED");
  return message.reply({ embeds: [embed] });
 }
};
