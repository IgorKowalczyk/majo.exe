const { MessageEmbed } = require("discord.js");

module.exports = {
 name: "base64",
 aliases: ["b64", "base-64"],
 description: "Encode text to Base64 format",
 category: "Utility",
 usage: "base64 <text>",
 run: async (client, message, args) => {
  try {
   if (!args[0]) {
    return client.createError(message, `${client.bot_emojis.error} | You must enter a text to encode!\n\n**Usage:** \`${client.prefix} base64 <text>\``);
   }
   if (args[0].toString().length > client.max_input) {
    return client.createError(message, `${client.bot_emojis.error} | You must enter a text shorter than \`${client.max_input}\` characters!\n\n**Usage:** \`${client.prefix} base64 <text>\``);
   }
   const buffer = new Buffer.from(args.join(" "), "utf-8");
   const base64 = buffer.toString("base64");
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
    .setTitle(`${client.bot_emojis.sparkles} Base64 Encoder`)
    .addField(`${client.bot_emojis.input} Text to encode`, `\`\`\`${args.join(" ")}\`\`\``)
    .addField(`${client.bot_emojis.output} Encoded text`, `\`\`\`${base64 || "An unknown error ocurred while encoding!"}\`\`\``);
   message.reply({ embeds: [embed] });
  } catch (err) {
   console.log(err);
   return client.createCommandError(message, err);
  }
 },
};
