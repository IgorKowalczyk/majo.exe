const { MessageEmbed, MessageAttachment } = require("discord.js");
const AmeClient = require("amethyste-api");
const AmeAPI = new AmeClient(process.env.AMEAPI);

module.exports = {
 name: "pixelize",
 aliases: [],
 description: "Pixelize the user avatar",
 category: "Image",
 usage: "pixelize <user mention, user id, user name> [number between 2-40]",
 run: async (client, message, args) => {
  try {
   const User = (await message.mentions.members.first()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find((r) => r.user.username.toLowerCase().includes() === args.join(" ").toLocaleLowerCase()) || message.guild.members.cache.find((r) => r.displayName.toLowerCase().includes() === args.join(" ").toLocaleLowerCase());
   const pixelize = User ? args[1] : 50;
   if (User) {
    if (args[1] && isNaN(args[1])) {
     return client.createError(message, `${client.bot_emojis.error} | Pixelize must be a number!\n\n**Usage:** \`${client.prefix} pixelize <user mention, user id, user name> [number between 2-40]\``);
    }
    if (args[1] && args[1].includes("-")) {
     return client.createError(message, `${client.bot_emojis.error} | Pixelize cannot be negative!\n\n**Usage:** \`${client.prefix} pixelize <user mention, user id, user name> [number between 2-40]\``);
    }
    if (args[1] && args[1] < 2) {
     return client.createError(message, `${client.bot_emojis.error} | Pixelize must be higher than \`2\`!\n\n**Usage:** \`${client.prefix} pixelize <user mention, user id, user name> [number between 2-40]\``);
    }
    if (args[1] && args[1] > 40) {
     return client.createError(message, `${client.bot_emojis.error} | Pixelize must be lower than \`40\`!\n\n**Usage:** \`${client.prefix} pixelize <user mention, user id, user name> [number between 2-40]\``);
    }
   } else {
    return client.createError(message, `${client.bot_emojis.error} | Please mention a user!\n\n**Usage:** \`${client.prefix} pixelize <user mention, user id, user name> [number between 2-40]\``);
   }
   const wait = new MessageEmbed() // Prettier
    .setColor("#5865f2")
    .setDescription(`${client.bot_emojis.loading} | Please wait... I'm generating your image`);
   message.reply({ embeds: [wait] }).then((msg) => {
    (async () => {
     const buffer = await AmeAPI.generate("pixelize", {
      url: User.user.displayAvatarURL({
       format: "png",
       size: 2048,
      }),
      pixelize: pixelize,
     });
     const attachment = new MessageAttachment(buffer, "pixelize.png");
     msg.edit({ embeds: [], files: [attachment] });
    })();
   });
  } catch (err) {
   console.log(err);
   return client.createCommandError(message, err);
  }
 },
};
