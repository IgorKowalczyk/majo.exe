const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const figlet = require("figlet");
const { createPaste } = require("hastebin");

module.exports = {
 name: "ascii",
 category: "Utility",
 description: "Convert text to asci format",
 usage: "/ascii <text>",
 options: [
  {
   name: "text",
   description: "Text to convert to ascii",
   type: 3,
   required: true,
  },
 ],
 run: async (client, interaction, args) => {
  try {
   if (!args[0]) {
    return client.createSlashError(interaction, `${client.bot_emojis.error} | Please enter a text to convert!`);
   }
   if (args.join(" ").length > client.max_input) {
    return client.createSlashError(interaction, `${client.bot_emojis.error} | The max length for ascii is \`${client.max_input}\` characters!`);
   }
   figlet(args.join(" "), function (err, data) {
    if (err) {
     return client.createSlashCommandError(interaction, err);
    }
    createPaste(
     data,
     {
      raw: true,
      contentType: "text/plain",
      server: "https://haste.zneix.eu/",
     },
     {}
    )
     .then((paste) => {
      const embed = new MessageEmbed() // Prettier
       .setColor("#5865F2")
       .setTitle(`${client.bot_emojis.success} Your ascii code has been successfully generated!`)
       .setDescription(`> ${client.bot_emojis.link} Link to ascii code paste: ${paste}`)
       .setFooter({
        text: `Requested by ${interaction.member.username}`,
        iconURL: interaction.member.displayAvatarURL({
         dynamic: true,
         format: "png",
         size: 2048,
        }),
       })
       .setTimestamp();
      const row = new MessageActionRow() // Prettier
       .addComponents(
        new MessageButton() // Prettier
         .setURL(paste)
         .setStyle("LINK")
         .setLabel("View ascii code")
       );
      interaction.followUp({ embeds: [embed], components: [row] });
     })
     .catch(() => {
      return client.createError(interaction, `Something went wrong while uploading ascii code to server ${client.bot_emojis.sadness}`);
     });
   });
  } catch (err) {
   console.log(err);
   return client.createSlashCommandError(interaction, err);
  }
 },
};
