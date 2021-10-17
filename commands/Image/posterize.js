const { MessageEmbed, MessageAttachment } = require("discord.js");
const AmeClient = require("amethyste-api");
const AmeAPI = new AmeClient(process.env.AMEAPI);

module.exports = {
 name: "posterize",
 aliases: [],
 description: "Posterize the user avatar",
 category: "Image",
 usage: "posterize <user mention, user id, user name> [number between 2-40]",
 run: async (client, message, args) => {
  try {
   const User = (await message.mentions.members.first()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find((r) => r.user.username.toLowerCase().includes() === args.join(" ").toLocaleLowerCase()) || message.guild.members.cache.find((r) => r.displayName.toLowerCase().includes() === args.join(" ").toLocaleLowerCase());
   const posterize = User ? args[1] : 50;
   if (User) {
    if (args[1] && isNaN(args[1])) {
     return client.createError(message, `${client.bot_emojis.error} | Posterize must be a number!\n\n**Usage:** \`${client.prefix} posterize <user mention, user id, user name> [number between 2-40]\``);
    }
    if (args[1] && args[1].includes("-")) {
     return client.createError(message, `${client.bot_emojis.error} | Posterize cannot be negative!\n\n**Usage:** \`${client.prefix} posterize <user mention, user id, user name> [number between 2-40]\``);
    }
    if (args[1] && args[1] < 2) {
     return client.createError(message, `${client.bot_emojis.error} | Posterize must be higher than \`2\`!\n\n**Usage:** \`${client.prefix} posterize <user mention, user id, user name> [number between 2-40]\``);
    }
    if (args[1] && args[1] > 40) {
     return client.createError(message, `${client.bot_emojis.error} | Posterize must be lower than \`40\`!\n\n**Usage:** \`${client.prefix} posterize <user mention, user id, user name> [number between 2-40]\``);
    }
   } else {
    return client.createError(message, `${client.bot_emojis.error} | Please mention a user!\n\n**Usage:** \`${client.prefix} posterize <user mention, user id, user name> [number between 2-40]\``);
   }
   const wait = new MessageEmbed() // Prettier
    .setColor("#5865f2")
    .setDescription(`${client.bot_emojis.loading} | Please wait... I'm generating your image`);
   message.reply({ embeds: [wait] }).then((msg) => {
    (async () => {
     const buffer = await AmeAPI.generate("posterize", {
      url: User.user.displayAvatarURL({
       format: "png",
       size: 2048,
      }),
      posterize: posterize,
     });
     const attachment = new MessageAttachment(buffer, "posterize.png");
     msg.edit({ embeds: [], files: [attachment] });
    })();
   });
  } catch (err) {
   console.log(err);
   return client.createCommandError(message, err);
  }
 },
};
