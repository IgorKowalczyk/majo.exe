module.exports = {
 name: "say",
 aliases: [],
 description: "Send a message using bot",
 category: "Moderation",
 usage: "say [channel] <message>",
 run: async (client, message, args) => {
  try {
   if (!message.guild.me.permissions.has("MANAGE_MESSAGES")) {
    return client.createError(message, `${client.bot_emojis.error} | I don't have premission to manage messages!`);
   }
   if (!message.member.permissions.has("MANAGE_MESSAGES")) {
    return client.createError(message, `${client.bot_emojis.error} | You don't have premission to manage messages!`);
   }
   if (!args[0]) {
    return client.createError(message, `${client.bot_emojis.error} | You have to enter a message!\n\n**Usage:** \`${client.prefix} say [channel] <message>\``);
   }
   if (args.toString().length > client.max_input) {
    return client.createError(message, `${client.bot_emojis.error} | Message can't be longer than \`${client.max_input}\` characters!\n\n**Usage:** \`${client.prefix} say [channel] <message>\``);
   }
   const channel = message.mentions.channels.first();
   if (channel && args[0] == `<#${channel.id}>`) {
    message.delete();
    return channel.send({ content: args.join(" ").replace(channel, "") + `\n\n||Message sent by ${message.author}||` });
   }
   const say_message = args.join(" ");
   message.delete();
   message.channel.send({ content: `${say_message}\n\n||Message sent by ${message.author}||` });
  } catch (err) {
   console.log(err);
   return client.createCommandError(message, err);
  }
 },
};
