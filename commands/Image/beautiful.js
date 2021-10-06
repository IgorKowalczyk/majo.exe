const { MessageEmbed, MessageAttachment } = require("discord.js");
const canvacord = require("canvacord");

module.exports = {
 name: "beautiful",
 aliases: [],
 description: "oh this? This is beautiful!",
 category: "Image",
 usage: "beautiful [user mention, user id, user name]",
 run: async (client, message, args) => {
  try {
   const User = (await message.mentions.members.first()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find((r) => r.user.username.toLowerCase().includes() === args.join(" ").toLocaleLowerCase()) || message.guild.members.cache.find((r) => r.displayName.toLowerCase().includes() === args.join(" ").toLocaleLowerCase()) || message.member;
   const wait = new MessageEmbed() // Prettier
    .setColor("#5865f2")
    .setDescription(`${client.bot_emojis.loading} | Please wait... I'm generating your image`);
   message.reply({ embeds: [wait] }).then((msg) => {
    (async () => {
     const beautiful = await canvacord.Canvas.beautiful(
      User.user.displayAvatarURL({
       dynamic: false,
       format: "png",
       size: 2048,
      })
     );
     const attachment = new MessageAttachment(beautiful, "beautiful.png");
     msg.edit({ embeds: [], files: [attachment] });
    })();
   });
  } catch (err) {
   console.log(err);
   return client.createCommandError(message, err);
  }
 },
};
