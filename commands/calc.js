const math = require('math-expression-evaluator');
const stripIndents = require('common-tags').stripIndents;
const Discord = require("discord.js");
const config = require("../config");
const prefix = config.prefix;

module.exports = {
 name: "calc",
 aliases: ["math"],
 description: "Discord calculator",
 category: "Fun",
 usage: "calc <task>",
 run: async (client, message, args) => {
  try {
   if(args.length < 1) {
    return message.channel.send({embed: {
     color: 16734039,
     description: "You must provide a equation to be solved on the calculator! (eg. 9 + 10)"
    }}) 
   }
   const question = args.join(' ');
   let answer;
   if(question.indexOf('9 + 10') > -1) {
    answer = '21 (XD!)';
    const calc = new Discord.MessageEmbed()
     .setTitle("Calculator")
     .setColor("RANDOM")
     .addField("Question: ", `${question}`)
     .addField("Answer: ", `${answer}`)
    return message.channel.send(calc);
   } else {
    try {
     answer = math.eval(question);
     const calc = new Discord.MessageEmbed()
     .setTitle("Calculator")
     .setColor("RANDOM")
     .addField("Question: ", `${question}`)
     .addField("Answer: ", `${answer}`)
    return message.channel.send(calc);
    } catch (err) {
     message.channel.send({embed: {
      color: 16734039,
      description: "Invalid math equation!"
    }});
    }
   }
  } catch (err) {
   message.channel.send({embed: {
    color: 16734039,
    description: "Something went wrong... :cry:"
   }})
  }
 }
}
