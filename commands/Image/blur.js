const { MessageEmbed, MessageAttachment } = require("discord.js");
const AmeClient = require("amethyste-api");
const AmeAPI = new AmeClient(process.env.AMEAPI);

module.exports = {
 name: "blur",
 aliases: [],
 description: "Blur the user avatar",
 category: "Image",
 usage: "blur <user mention, user id, user name> [number between 2-30]",
 run: async (client, message, args) => {
  try {
   const User = (await message.mentions.members.first()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find((r) => r.user.username.toLowerCase().includes() === args.join(" ").toLocaleLowerCase()) || message.guild.members.cache.find((r) => r.displayName.toLowerCase().includes() === args.join(" ").toLocaleLowerCase());
   const blur = User ? args[1] : 50;
   if (User) {
    if (args[1] && isNaN(args[1])) {
     return client.createError(message, `${client.bot_emojis.error} | Blur must be a number!\n\n**Usage:** \`${client.prefix} blur <user mention, user id, user name> [number between 2-30]\``);
    }
    if (args[1] && args[1].includes("-")) {
     return client.createError(message, `${client.bot_emojis.error} | Blur cannot be negative!\n\n**Usage:** \`${client.prefix} blur <user mention, user id, user name> [number between 2-30]\``);
    }
    if (args[1] && args[1] < 2) {
     return client.createError(message, `${client.bot_emojis.error} | Blur must be higher than \`2\`!\n\n**Usage:** \`${client.prefix} blur <user mention, user id, user name> [number between 2-30]\``);
    }
    if (args[1] && args[1] > 30) {
     return client.createError(message, `${client.bot_emojis.error} | Blur must be lower than \`30\`!\n\n**Usage:** \`${client.prefix} blur <user mention, user id, user name> [number between 2-30]\``);
    }
   } else {
    return client.createError(message, `${client.bot_emojis.error} | Please mention a user!\n\n**Usage:** \`${client.prefix} blur <user mention, user id, user name> [number between 2-30]\``);
   }
   const wait = new MessageEmbed() // Prettier
    .setColor("#5865f2")
    .setDescription(`${client.bot_emojis.loading} | Please wait... I'm generating your image`);
   message.reply({ embeds: [wait] }).then((msg) => {
    (async () => {
     const buffer = await AmeAPI.generate("blur", {
      url: User.user.displayAvatarURL({
       format: "png",
       size: 2048,
      }),
      blur: blur,
     });
     const attachment = new MessageAttachment(buffer, "blur.png");
     msg.edit({ embeds: [], files: [attachment] });
    })();
   });
  } catch (err) {
   console.log(err);
   return client.createCommandError(message, err);
  }
 },
};
