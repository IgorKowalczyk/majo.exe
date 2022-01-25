const { MessageEmbed } = require("discord.js");

module.exports = {
 name: "base64-decode",
 aliases: ["b64-decode", "base-64-decode"],
 description: "Decode Base64 text to normal",
 category: "Utility",
 usage: "base64-decode <text>",
 run: async (client, message, args) => {
  try {
   if (!args[0]) {
    return client.createError(message, `${client.bot_emojis.error} | You must enter a Base64 code to decode!\n\n**Usage:** \`${client.prefix} base64-decode <text>\``);
   }
   if (args[0].toString().length > client.max_input) {
    return client.createError(message, `${client.bot_emojis.error} | You must enter a Base64 code shorer than \`${client.max_input}\` characters!\n\n**Usage:** \`${client.prefix} base64-decode <text>\``);
   }
   const buffer = new Buffer.from(args.join(" "), "base64");
   const base64 = buffer.toString("utf-8");
   const embed = new MessageEmbed()
    .setColor("RANDOM")
    .setFooter({
     text: `Requested by ${message.author.username}`,
     iconURL: message.author.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     }),
    })
    .setTitle(`${client.bot_emojis.sparkles} Base64 Decoder`)
    .addField(`${client.bot_emojis.input} Text to decode`, `\`\`\`${args.join(" ")}\`\`\``)
    .addField(`${client.bot_emojis.output} Decoded text`, `\`\`\`${base64 || "An unknown error ocurred while decoding!"}\`\`\``);
   message.reply({ embeds: [embed] });
  } catch (err) {
   console.log(err);
   return client.createCommandError(message, err);
  }
 },
};
