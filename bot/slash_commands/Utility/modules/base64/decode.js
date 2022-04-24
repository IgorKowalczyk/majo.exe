const { MessageEmbed } = require("discord.js");

module.exports = async (client, interaction, args) => {
 try {
  if (args[1].toString().length > client.max_input) {
   return client.createSlashError(interaction, `${client.bot_emojis.error} | You must enter a text shorter than \`${client.max_input}\` characters!`);
  }
  const buffer = new Buffer.from(args[1], "base64");
  const base64 = buffer.toString("utf-8");
  const embed = new MessageEmbed()
   .setColor("#5865F2")
   .setFooter({
    text: `Requested by ${interaction.user.username}`,
    iconURL: interaction.user.displayAvatarURL({
     dynamic: true,
     format: "png",
     size: 2048,
    }),
   })
   .setTitle(`${client.bot_emojis.sparkles} Base64 Encode`)
   .addField(`${client.bot_emojis.input} Text to encode`, `\`\`\`${args[1]}\`\`\``)
   .addField(`${client.bot_emojis.output} Encoded text`, `\`\`\`${base64 || "An unknown error ocurred while encoding!"}\`\`\``);
  interaction.followUp({ embeds: [embed] });
 } catch (err) {
  console.log(err);
  return client.createSlashCommandError(interaction, err);
 }
};
