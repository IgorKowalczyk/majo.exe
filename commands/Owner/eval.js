const { MessageEmbed } = require("discord.js");

module.exports = {
 name: "eval",
 aliases: [],
 description: "Evaluates and runs JavaScript code",
 category: "Owner",
 usage: "eval <code>",
 run: async (client, message, args) => {
  try {
   if (message.author.id !== client.config.owner_id) {
    const embed = new MessageEmbed() // Prettier
     .setColor("RED")
     .setDescription(`${client.bot_emojis.error} | You do not have permission to run this command (Only owner of the bot can run this)!`);
    return message.reply({ embeds: [embed] });
   }
   var result = args.join(" ");
   if (!result) {
    const embed = new MessageEmbed() // Prettier
     .setColor("RED")
     .setDescription(`${client.bot_emojis.error} | Please input code to evaluate!\n\n**Usage:** \`${process.env.PREFIX} eval <code>\``);
    return message.reply({ embeds: [embed] });
   }
   let evaluated = eval(result);
   let type = typeof evaluated;
   console.log("Code to eval: " + result);
   const success = new MessageEmbed() // Prettier
    .setColor("#2f3136")
    .addField(`${client.bot_emojis.screw_that} Type`, `\`\`\`js\n${type}\`\`\``)
    .addField(`${client.bot_emojis.input} Input`, `\`\`\`js\n${args.join(" ")}\`\`\``)
    .addField(`${client.bot_emojis.output} Output`, `\`\`\`js\n${evaluated}\`\`\``)
    .setFooter(
     `Requested by ${message.author.username}`,
     message.author.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     })
    );
   message.reply({ embeds: [success] });
  } catch (err) {
   const errormessage = new MessageEmbed() // Prettier
    .setColor("#e31212")
    .setTitle(`${client.bot_emojis.error} An error has occured!`)
    .addField(`Input`, `\`\`\`js\n${result}\`\`\``)
    .addField(`Output`, `\`\`\`js\n${err.message}\`\`\``)
    .setFooter(
     `Requested by ${message.author.username}`,
     message.author.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     })
    );
   return message.reply({ embeds: [errormessage] });
  }
 },
};
