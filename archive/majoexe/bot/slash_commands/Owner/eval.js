const Discord = require("discord.js");
const config = require("../../../config/main_config");

module.exports = {
 name: "eval",
 description: "👑 Evaluates and runs JavaScript code",
 usage: "/eval <code>",
 category: "Owner",
 permissions: [
  {
   id: config.owner_id.toString(),
   type: 2,
   permission: true,
  },
 ],
 default_permission: false,
 options: [
  {
   name: "code",
   description: "Script to run",
   type: 3,
   required: true,
  },
 ],
 run: async (client, interaction, args) => {
  try {
   if (interaction.user.id !== client.config.owner_id) {
    return client.createSlashError(interaction, `${client.bot_emojis.error} | You do not have permission to run this command (Only owner of the bot can run this)!`);
   }
   var result = args.join(" ");
   if (!result) {
    return client.createSlashError(interaction, `${client.bot_emojis.error} | Please input code to evaluate!`);
   }
   if (result.length > 3024) {
    return client.createSlashError(interaction, `${client.bot_emojis.error} | Command can't be longer than \`3024\` characters!`);
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
     text: `Requested by ${interaction.user.username}`,
     iconURL: interaction.user.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     }),
    });
   interaction.followUp({ embeds: [success] });
  } catch (err) {
   const errormessage = new Discord.MessageEmbed() // Prettier
    .setColor("RED")
    .setTitle(`${client.bot_emojis.error} An error has occured!`)
    .addField(`Input`, `\`\`\`js\n${result}\`\`\``)
    .addField(`Output`, `\`\`\`js\n${err.message.toString().slice(0, 1000)}\`\`\``)
    .setFooter({
     text: `Requested by ${interaction.user.username}`,
     iconURL: interaction.user.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     }),
    });
   return interaction.followUp({ embeds: [errormessage] });
  }
 },
};
