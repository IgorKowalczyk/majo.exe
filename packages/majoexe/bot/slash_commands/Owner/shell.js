const { MessageEmbed } = require("discord.js");
const child = require("child_process");
const config = require("../../../config/main_config");

module.exports = {
 name: "shell",
 description: "👑 Evaluate shell script",
 usage: "/shell <query>",
 category: "Owner",
 default_permission: false,
 permissions: [
  {
   id: config.owner_id,
   type: 2,
   permission: true,
  },
 ],
 options: [
  {
   name: "query",
   description: "Script to run",
   type: 3,
   required: true,
  },
 ],
 run: async (client, interaction, args) => {
  try {
   if (interaction.user.id !== client.config.owner_id) {
    const embed = new MessageEmbed() // Prettier
     .setColor("RED")
     .setDescription(`${client.bot_emojis.error} | You do not have permission to run this command (Only owner of the bot can run this)!`);
    return interaction.followUp({ embeds: [embed] });
   }
   const command = args.join(" ");
   if (!command) {
    const embed = new MessageEmbed() // Prettier
     .setColor("RED")
     .setDescription(`${client.bot_emojis.error} | Please input script to run!`);
    return interaction.followUp({ embeds: [embed] });
   }
   if (command.length > 1024) {
    return client.createSlashError(interaction, `${client.bot_emojis.error} | Command can't be longer than \`1024\` characters!`);
   }
   child.exec(command, (err, res) => {
    if (err) {
     const embed = new MessageEmbed() // Prettier
      .setColor("RED")
      .setDescrption(`\`\`\`${err.toString().slice(0, 1000) || "Unknown error!"}\`\`\``);
     return interaction.followUp({ embeds: [embed] });
    }
    const embed = new MessageEmbed() // Prettier
     .setColor("#4f545c")
     .addField(`${client.bot_emojis.input} Request`, `\`\`\`sh\n${command}\`\`\``)
     .addField(`${client.bot_emojis.output} Server response`, `\`\`\`sh\n${res.slice(0, 1000) || "No response!"}\`\`\``)
     .setFooter({
      text: `Requested by ${interaction.user.username}`,
      iconURL: interaction.user.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      }),
     });
    interaction.followUp({ embeds: [embed] });
   });
  } catch (err) {
   console.log(err);
   return client.createSlashCommandError(interaction, err);
  }
 },
};
