const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const figlet = require("figlet");
const hastebin = require("hastebin");

module.exports = {
 name: "ascii",
 aliases: ["asciiart", "ascii-art"],
 category: "Utility",
 description: "Convert text to asci format",
 usage: "ascii <text>",
 run: async (client, message, args) => {
  try {
   if (!args[0]) {
    return client.createError(message, `${client.bot_emojis.error} | Please enter a text to convert!\n\n**Usage:** \`${client.prefix} ascii <text>\``);
   }
   if (args.join(" ").length > client.max_input) {
    return client.createError(message, `${client.bot_emojis.error} | The max length for ascii is \`${client.max_input}\` characters!\n\n**Usage:** \`${client.prefix} ascii <text>\``);
   }
   figlet(args.join(" "), function (err, data) {
    if (err) {
     return client.createCommandError(message, err);
    }
    hastebin
     .createPaste(
      data,
      {
       raw: true,
       contentType: "text/plain",
       server: "https://haste.zneix.eu/",
      },
      {}
     )
     .then(function (urlToPaste) {
      const embed = new MessageEmbed() // Prettier
       .setColor("RANDOM")
       .setTitle(
        `${client.bot_emojis.success} Success!`,
        message.guild.iconURL({
         dynamic: true,
         format: "png",
        })
       )
       .setDescription(`${client.bot_emojis.tada} Your ascii code is generated! \n${client.bot_emojis.link} Link to ascii code paste: ${urlToPaste}`)
       .setFooter({
        text: `Requested by ${message.author.username}`,
        iconURL: message.author.displayAvatarURL({
         dynamic: true,
         format: "png",
         size: 2048,
        }),
       })
       .setTimestamp();
      const row = new MessageActionRow() // Prettier
       .addComponents(
        new MessageButton() // Prettier
         .setURL(urlToPaste)
         .setStyle("LINK")
         .setLabel("View ascii code")
       );
      message.reply({ embeds: [embed], components: [row] });
     })
     .catch(function (requestError) {
      return client.createError(message, `Something went wrong while uploading ascii code to server ${client.bot_emojis.sadness}`);
     });
   });
  } catch (err) {
   console.log(err);
   return client.createCommandError(message, err);
  }
 },
};
