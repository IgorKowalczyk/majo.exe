const { MessageEmbed } = require("discord.js");

module.exports = {
 name: "prune",
 aliases: ["clear"],
 description: "Removes up to 100 messages",
 category: "Moderation",
 usage: "prune <amount>",
 run: async (client, message, args) => {
  try {
   if (!message.guild.me.permissions.has("MANAGE_MESSAGES")) {
    return client.createError(message, `${client.bot_emojis.error} | I don't have premission to manage messages!`);
   }
   if (!message.member.permissions.has("MANAGE_MESSAGES")) {
    const error = new MessageEmbed() // Prettier
     .setColor("RED")
     .setDescription(`${client.bot_emojis.error} | You don't have permission to prune messages!`)
     .setFooter({
      text: "This message will be deleted after 10 seconds",
      iconURL: message.author.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      }),
     });
    message.reply({ embeds: [error] }).then((m) =>
     setTimeout(() => {
      if (m.deletable) m.delete();
     }, 10000)
    );
    return setTimeout(() => message.delete(), 10000);
   }
   if (isNaN(args[0])) {
    const error = new MessageEmbed() // Prettier
     .setColor("RED")
     .setDescription(`${client.bot_emojis.error} | Please input a vaild number!\n\n**Usage:** \`${client.prefix} prune <amount>\``)
     .setFooter({
      text: "This message will be deleted after 10 seconds",
      iconURL: message.author.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      }),
     });
    message.reply({ embeds: [error] }).then((m) =>
     setTimeout(() => {
      if (m.deletable) m.delete();
     }, 10000)
    );
    return setTimeout(() => message.delete(), 10000);
   }
   if (args[0] > 99) {
    const error = new MessageEmbed() // Prettier
     .setColor("RED")
     .setDescription(`${client.bot_emojis.error} | Insert the number smaller than \`99\`!\n\n**Usage:** \`${client.prefix} prune <amount>\``)
     .setFooter({
      text: "This message will be deleted after 10 seconds",
      iconURL: message.author.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      }),
     });
    message.reply({ embeds: [error] }).then((m) =>
     setTimeout(() => {
      if (m.deletable) m.delete();
     }, 10000)
    );
    return setTimeout(() => message.delete(), 10000);
   }
   if (args[0] < 2) {
    let error = new MessageEmbed() // Prettier
     .setColor("RED")
     .setDescription(`${client.bot_emojis.error} | Insert number greater than \`1\`!\n\n**Usage:** \`${client.prefix} prune <amount>\``)
     .setFooter({
      text: "This message will be deleted after 10 seconds",
      iconURL: message.author.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      }),
     });
    message.reply({ embeds: [error] }).then((m) =>
     setTimeout(() => {
      if (m.deletable) m.delete();
     }, 10000)
    );
    return setTimeout(() => message.delete(), 10000);
   }
   const wait_embed = new MessageEmbed() // Prettier
    .setColor("#5865f2")
    .setDescription(`${client.bot_emojis.loading} | Deleting messages. Please wait...`);
   message.channel.send({ embeds: [wait_embed] }).then(async (process_message) => {
    const message_count = parseInt(args[0]) + 1; // + one system message
    await message.channel.messages.fetch({ limit: message_count }).then(async (fetched_messages) => {
     try {
      await message.channel.bulkDelete(fetched_messages).then(async (messages) => {
       const success = new MessageEmbed() // Prettier
        .setColor("RANDOM")
        .setDescription(`> ${client.bot_emojis.success} | Deleted \`${messages.size - 1}\`/\`${args[0]}\` messages`) // + one system message
        .setFooter({
         text: `This message will be deleted after 10 seconds`,
         iconURL: message.author.displayAvatarURL({
          dynamic: true,
          format: "png",
          size: 2048,
         }),
        });
       await message.channel.send({ embeds: [success] }).then((m) =>
        setTimeout(() => {
         if (m.deletable) m.delete();
        }, 10000)
       );
      });
     } catch (err) {
      if (process_message.deletable) {
       process_message.delete();
      }
      return client.createError(message, `${client.bot_emojis.error} | You can't delete messages older than \`14\` days!`);
     }
    });
   });
  } catch (err) {
   return client.createCommandError(message, err);
  }
 },
};
