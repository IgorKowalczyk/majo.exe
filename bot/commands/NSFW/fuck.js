const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
 name: "fuck",
 aliases: [],
 description: "Fuck a user",
 category: "NSFW",
 usage: "fuck <user>",
 run: async (client, message, args) => {
  (async () => {
   try {
    const user = message.mentions.users.first();
    if (!message.channel.nsfw) {
     const nsfwembed = new MessageEmbed()
      .setColor("RED")
      .setDescription(`${client.bot_emojis.anger} | You can use this command only in an NSFW Channel!`)
      .setFooter({
       text: `Requested by ${message.author.username}`,
       iconURL: message.author.displayAvatarURL({
        dynamic: true,
        format: "png",
        size: 2048,
       }),
      })
      .setImage("https://media.discordapp.net/attachments/721019707607482409/855827123616481300/nsfw.gif");
     return message.reply({ embeds: [nsfwembed] });
    }
    if (!user) {
     return client.createError(message, `${client.bot_emojis.error} | You must mention someone to fuck!`);
    }
    if (user == message.author) {
     return client.createError(message, "😁 | You can't fuck yourself but... Ok, I forgot - you can masturbate 😳");
    }
    if (user == client.user) {
     return client.createError(message, "😏 | Oh, you tried to fuck me but u can't... XD Im not real... But I can fuck you, Can I?");
    }
    const response = await fetch("http://api.nekos.fun:8080/api/anal");
    const body = await response.json();
    const embed = new MessageEmbed() // Prettier
     .setTitle(
      user.username + " is being fucked by " + message.author.username,
      message.guild.iconURL({
       dynamic: true,
       format: "png",
      })
     )
     .setImage(body.image)
     .setColor("RANDOM")
     .setFooter({
      text: `Requested by ${message.author.username}`,
      iconURL: message.author.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      }),
     })
     .setTimestamp()
     .setURL(body.image);
    message.reply({ embeds: [embed] });
   } catch (err) {
    console.log(err);
    return client.createCommandError(message, err);
   }
  })();
 },
};
