const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();

module.exports.run = (client, message, args) => {

    if(message.guild === null)return;

    async function work() {

        let owo = (await neko.sfw.catText());
        message.channel.send(owo.cat).catch(error => {
            message.channel.send({embed: {
                color: 16734039,
                description: "Something went wrong... :cry:"
            }})
        });

      }

      work();


};

module.exports.help = {
    name: "cattext",
    description: "Sends a cat text",
    usage: "cattext",
    type: "Fun" 
}