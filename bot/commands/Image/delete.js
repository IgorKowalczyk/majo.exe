const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const validator = require("validator");

module.exports = {
 name: "delete",
 aliases: [],
 description: "Delete a image",
 category: "Image",
 usage: "delete <user/image url>",
 run: async (client, message, args) => {
  try {
   const User = message.mentions.members.first();
   if (!args[0]) {
    return client.createError(message, `${client.bot_emojis.error} | Mention user or provide the image url!\n\n**Usage:** \`${client.prefix} delete <user/image url>\``);
   }
   if (args[0]) {
    if (args[0].endsWith(".png") && validator.isURL(args[0], { protocols: ["http", "https"], require_protocol: true, disallow_auth: true })) {
     var image = args[0];
    } else if (User) {
     var image = User.user.displayAvatarURL({ format: "png" });
    } else {
     return client.createError(message, `${client.bot_emojis.error} | Mention user or provide the image url!\n\n**Usage:** \`${client.prefix} delete <user/image url>\``);
    }
    const response = await fetch(`https://api.no-api-key.com/api/v2/delete?image=${image.toString()}`);
    if (response.status !== 200) {
     return client.createError(message, `${client.bot_emojis.error} | Please provide vaild image url!\n\n**Usage:** \`${client.prefix} delete <user/image url>\``);
    }
    const embed = new MessageEmbed() // Prettier
     .setTitle(`${client.bot_emojis.trash} Delete this!`)
     .setColor("RANDOM")
     .setImage(response.url)
     .setFooter({
      text: `Requested by ${message.author.username}`,
      iconURL: message.author.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      }),
     })
     .setTimestamp();
    message.reply({ embeds: [embed] });
   }
  } catch (err) {
   console.log(err);
   return client.createCommandError(message, err);
  }
 },
};
