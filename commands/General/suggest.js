const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
 name: "suggest",
 aliases: [],
 description: "Suggest feature in bot",
 category: "General",
 usage: "suggest <suggestion>",
 run: async (client, message, args) => {
  try {
   const suggestion = args.join(" ");
   if (!suggestion) {
    return client.createError(message, `${client.bot_emojis.error} | You need to enter a suggestion!`);
   }
   if (suggestion.lenght > 1000) {
    return client.createError(message, `${client.bot_emojis.error} | Your suggestion can have a maximum of 1000 characters!`);
   }
   const channel = client.channels.cache.get(client.config.suggestions_channel);
   if (channel) {
    const embed = new MessageEmbed() // Prettier
     .setAuthor(`${client.bot_emojis.thinking} ${message.author.username} suggestion!`, message.guild.iconURL())
     .setColor("RANDOM")
     .setDescription(`\`\`\`${suggestion}\`\`\``)
     .addField("Reporter", `<@${message.author.id}> (ID: ${message.author.id})`)
     .addField("User guild", `${message.guild.name} (ID: ${message.guild.id})`)
     .setFooter(
      "Majo.exe",
      message.author.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      })
     )
     .setThumbnail(message.guild.iconURL());
    channel.send({ embeds: [embed] });
    const success = new MessageEmbed() // Prettier
     .setColor("RANDOM")
     .setTitle(
      `${client.bot_emojis.success} Success!
  `
     )
     .setDescription(`${message.author} your suggestion was send, you can view it in Majo.exe Developers server in <#${client.config.suggestions_channel}> channel.`)
     .setFooter(
      client.config.support_server,
      message.author.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      })
     );
    const row = new MessageActionRow() // Prettier
     .addComponents(
      // Prettier
      new MessageButton() // Prettier
       .setURL(client.config.support_server)
       .setLabel("View suggestion")
       .setStyle("LINK")
     );

    message.reply({ embeds: [embed], components: [row] });
   } else {
    return client.createError(message, `${client.bot_emojis.error} | I can't find suggestions channel. Mayby the channel didn't exist. If you are the bot developer please configure it in config.`);
   }
  } catch (err) {
   console.log(err);
   return client.createCommandError(message, err);
  }
 },
};
