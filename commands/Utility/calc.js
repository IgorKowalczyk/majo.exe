const Discord = require("discord.js");
const math = require("math-expression-evaluator");

module.exports = {
 name: "calc",
 aliases: ["math"],
 description: "Discord calculator",
 category: "Utility",
 usage: "calc <task>",
 run: async (client, message, args) => {
  try {
   if (args.length < 1) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: "❌ | You must provide a equation to be solved on the calculator! (eg. 9 + 10)",
     },
    });
   }
   const question = args.join(" ");
   try {
    let answer;
    let footer;
    if (question.indexOf("9 + 10") > -1) {
     answer = "21 (XD!)";
     footer = "You are a idiot | Requested by " + `${message.author.username}`;
    } else {
     answer = math.eval(question);
     footer = "Requested by " + `${message.author.username}`;
    }
    const calc = new Discord.MessageEmbed()
     .setTitle("💡 Calculator")
     .setColor("RANDOM")
     .addField("Question: ", `${question}`)
     .addField("Answer: ", `${answer}`)
     .setFooter(`${footer}`, message.author.displayAvatarURL({ dynamic: true, format: "png", size: 2048 }));
    return message.lineReply(calc);
   } catch (err) {
    message.lineReply({
     embed: {
      color: 16734039,
      description: "Invalid math equation!",
     },
    });
   }
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
