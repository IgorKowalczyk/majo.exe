const Discord = require("discord.js");
const config = require("../../config");
const child = require("child_process");

module.exports = {
 name: "shell",
 aliases: ["cmd", "exec", "terminal"],
 description: "Shows informations for developers",
 category: "Owner",
 usage: "shell <script>",
 run: async (client, message, args) => {
  try {
   if (message.author.id !== config.owner_id) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error} | You do not have permission to run this command (Only owner of the bot can run this)!`,
     },
    });
   }
   const command = args.join(" ");
   if (!command) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error} | Please input some string!`,
     },
    });
   }
   child.exec(command, (err, res) => {
    if (err)
     return message.lineReply({
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
     .addField("📥 Server response", `\`\`\`${res.slice(0, 1000) || "No response!"}\`\`\``);
    message.lineReply(embed);
   });
  } catch (err) {
   message.lineReply({
    embed: {
     color: 16734039,
     description: `Something went wrong... ${client.bot_emojis.sadness}`,
    },
   });
  }
 },
};
