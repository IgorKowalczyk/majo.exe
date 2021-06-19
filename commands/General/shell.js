const Discord = require("discord.js");
const config = require("../../config");
const child = require ('child_process');
const { errors } = require("puppeteer");

module.exports = {
 name: "shell",
 aliases: ["cmd", "exec", "terminal"],
 description: "Shows informations for developers",
 category: "General",
 usage: "info",
 run: async (client, message, args) => {
  try {
   if (message.author.id !== config.ownerid) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: "❌ | You do not have permission to run this command (Only owner of the bot can run this)!",
     },
    });
   }
   const command = args.join(" ");
   if (!command) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: "❌ | Please input some string!",
     },
    });
   }
   child.exec(command, (err, res) => {
    if(err) return message.lineReply({
     embed: {
      color: 16734039,
      title: ":x: Error!",
      description: `\`\`\`${err.toString().slice(0, 1000) || "Unknown error!"}\`\`\``,
     },
    });
    const embed = new Discord.MessageEmbed() // Prettier
     .setColor("RANDOM")
     .setTitle("📝 Shell")
     .addField("📤 Request", "```" + command + "```")
     .addField("📥 Server response", `\`\`\`${res.slice(0, 1000) || "No response!"}\`\`\``)
    message.lineReply(embed);
   })
  } catch (err) {
   message.lineReply({
    embed: {
     color: 16734039,
     description: "Something went wrong... :cry:",
    },
   });
  }
 },
};
