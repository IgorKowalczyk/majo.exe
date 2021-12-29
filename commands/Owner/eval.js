const Discord = require("discord.js");

module.exports = {
 name: "eval",
 aliases: [],
 description: "Evaluates and runs JavaScript code",
 category: "Owner",
 usage: "eval <code>",
 run: async (client, message, args) => {
  try {
   if (message.author.id !== client.config.owner_id) {
    return client.createError(message, `${client.bot_emojis.error} | You do not have permission to run this command (Only owner of the bot can run this)!`);
   }
   var result = args.join(" ");
   if (!result) {
    return client.createError(message, `${client.bot_emojis.error} | Please input code to evaluate!\n\n**Usage:** \`${client.prefix} eval <code>\``);
   }
   if (result.length > 1024) {
    return client.createError(message, `${client.bot_emojis.error} | Command can't be longer than \`1024\` characters!\n\n**Usage:** \`${client.prefix} shell <script>\``);
   }
   let evaluated = eval(result);
   let type = typeof evaluated;
   console.log("Code to eval: " + result);
   const success = new Discord.MessageEmbed() // Prettier
    .setColor("#4f545c")
    .addField(`${client.bot_emojis.screw_that} Type`, `\`\`\`js\n${type}\`\`\``)
    .addField(`${client.bot_emojis.input} Input`, `\`\`\`js\n${args.join(" ")}\`\`\``)
    .addField(`${client.bot_emojis.output} Output`, `\`\`\`js\n${evaluated}\`\`\``)
    .setFooter({
     text: `Requested by ${message.author.username}`,
     iconURL: message.author.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     }),
    });
   message.reply({ embeds: [success] });
  } catch (err) {
   const errormessage = new Discord.MessageEmbed() // Prettier
    .setColor("RED")
    .setTitle(`${client.bot_emojis.error} An error has occured!`)
    .addField(`Input`, `\`\`\`js\n${result}\`\`\``)
    .addField(`Output`, `\`\`\`js\n${err.message.toString().slice(0, 1000)}\`\`\``)
    .setFooter({
     text: `Requested by ${message.author.username}`,
     iconURL: message.author.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     }),
    });
   return message.reply({ embeds: [errormessage] });
  }
 },
};
