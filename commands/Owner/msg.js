const config = require('../../config.js');
const Discord = require("discord.js");

module.exports = {
  name: "msg",
  aliases: ["mensagem", "message"],
  description: "msg",
  category: "Dono",
  usage: "msg <message>",
run: (client, message, args, sql, Discord) => {
  if(message.author.id !== "506505845215985674") return message.channel.send({embed: {
    color: 16734039,
    description: "Apenas o proprietário do Bot pode usar este comando."
   }});
    let sendTo = args[0];
    let sMessage = args.splice(1);
    client.users.cache.get(sendTo).send(`${sMessage}`);

  }
}
