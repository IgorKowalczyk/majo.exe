const math = require('math-expression-evaluator');
const stripIndents = require('common-tags').stripIndents;
const Discord = require("discord.js");

module.exports.run = (client, message, args) => {

       if(message.guild === null)return;


    if(args.length < 1)
        return message.reply(`You must provide a equation to be solved on the calculator`);

    const question = args.join(' ');

    let answer;
    if(question.indexOf('9 + 10') > -1) {
        answer = '21';
    } else {
        try {
            answer = math.eval(question);
        } catch (err) {
          message.channel.send({embed: {
                color: 16734039,
                title: "Invalid math equation: " + `${err}`
            }});
          return;
        }
    }

  const calc = new Discord.RichEmbed()
              .setTitle("Calculator")
              .setColor(`RANDOM`)
              .addField("Question: ", `${question}`)
              .addField("Answer: ", `${answer}`)
          message.channel.send(calc);
}

module.exports.help = {
    name: "calc",
    description: "Calculator",
    usage: "calc <>",
    type: "Fun" 
}