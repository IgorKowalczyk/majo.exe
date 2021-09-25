const { MessageEmbed } = require("discord.js");
const child = require("child_process");

module.exports = {
 name: "shell",
 aliases: ["cmd", "exec", "terminal"],
 description: "Shows informations for developers",
 category: "Owner",
 usage: "shell <script>",
 run: async (client, message, args) => {
  try {
   if (message.author.id !== client.config.owner_id) {
    const embed = new MessageEmed() // Prettier
     .setColor("RED")
     .setDescription(`${client.bot_emojis.error} | You do not have permission to run this command (Only owner of the bot can run this)!`);
    return message.reply({ embeds: [embed] });
   }
   const command = args.join(" ");
   if (!command) {
    const embed = new MessageEmbed() // Prettier
     .setColor("RED")
     .setDescription(`${client.bot_emojis.error} | Please input script to run!\n\n**Usage:** \`${process.env.PREFIX} shell <script>\``);
    return message.reply({ embeds: [embed] });
   }
   child.exec(command, (err, res) => {
    if (err) {
     const embed = new MessageEmbed() // Prettier
      .setColor("RED")
      .setDescrption(`\`\`\`${err.toString().slice(0, 1000) || "Unknown error!"}\`\`\``);
     return message.reply({ embeds: [embed] });
    }
    const embed = new MessageEmbed() // Prettier
     .setColor("#2f3136")
     .addField(`${client.bot_emojis.input} Request`, `\`\`\`sh\n${command}\`\`\``)
     .addField(`${client.bot_emojis.output} Server response`, `\`\`\`sh\n${res.slice(0, 1000) || "No response!"}\`\`\``)
     .setFooter(
      `Requested by ${message.author.username}`,
      message.author.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      })
     );
    message.reply({ embeds: [embed] });
   });
  } catch (err) {
   console.log(err);
   message.reply({ embeds: [client.command_error_embed] });
  }
 },
};
