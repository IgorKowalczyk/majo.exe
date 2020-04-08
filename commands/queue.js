const Discord = module.require("discord.js");

module.exports.run = async (client, message, args) => {

const member = message.member;
const msg = message.content.toLowerCase();
const args = message.content.split(' ').slice(1).join(' ');

var codeblock = '```';
    for (let i = 0; i < guilds[message.guild.id].queueNames.length; i++) {
      let temp = (i + 1) + '. ' + guilds[message.guild.id].queueNames[i] +
      (i === 0 ? ' **(Current Song)**' : '') + '\n';
      if ((codeblock + temp).length <= 2000 - 3) {
        codeblock += temp;
      } else {
        codeblock += '```';
        message.channel.send(codeblock);
        codeblock = '```';
      }
    }

    codeblock += '```';
    message.channel.send(codeblock);
  }
  
module.exports.help = {
    name: "queue",
    description: "Display the queue.",
    usage: "queue",
    type: "Music"   
}