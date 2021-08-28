const Discord = require("discord.js");

module.exports = {
 name: "calculator",
 aliases: ["math", "calc", "calculate"],
 description: "Calculator",
 category: "Utility",
 usage: "calculator [math task]",
 run: async (client, message, args) => {
  try {
   try {
    args.toString().replace("--gui", "");
    if (args.length < 1) {
     return message.lineReply({
      embed: {
       color: 16734039,
       description: `${client.bot_emojis.error} | You must provide a equation to be solved on the calculator! (eg. \`9 + 10\`)`,
      },
     });
    }
    const question = args.join(" ");
    if (question == "9 + 10") {
     answer = "21 (XD)";
    } else {
     answer = require("mathjs").evaluate(question);
    }

    const calc = new Discord.MessageEmbed() // Prettier
     .setTitle(`${client.bot_emojis.counting} Calculator`)
     .setColor("RANDOM")
     .addField(`${client.bot_emojis.input} Question`, `\`\`\`${question}\`\`\``)
     .addField(`${client.bot_emojis.output} Answer`, `\`\`\`${answer}\`\`\``)
     .setFooter(
      `Requested by ${message.author.username}`,
      message.author.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      })
     );
    return message.lineReply(calc);
   } catch (err) {
    console.log(err);
    message.lineReply({
     embed: {
      color: 16734039,
      description: "Invalid math equation!",
     },
    });
   }
  } catch (err) {
   console.log(err);
   message.lineReply({
    embed: {
     color: 16734039,
     description: `Something went wrong... ${client.bot_emojis.sadness}`,
    },
   });
  }
 },
};
