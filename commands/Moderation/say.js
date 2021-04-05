/*const config = require('../../config.js');

module.exports = {
    name: "say",
    aliases: ["falar", "fale", "s", "f"],
    description: "Faça o bot repetir uma mensagem",
    category: "Moderação",
    usage: "say <mensagem>",
run: async (client, message, args) => {
    if (message.author.bot) return;
    if (message.content.startsWith(config.prefix)) {
        let args = message.content.substring(config.prefix.length).split(" ");
        switch (args[0].toLowerCase()){
            case 'say': {
        let sendMessage = message.content.substring(config.prefix.length +args[0].length+ args[1].length + 2); //2 is accounting for the 2 space between prefix and # and prefix and the main content
                setTimeout(()=>{message.delete()},5000)
                let sendChannel = client.channels.cache.get(args[1]); 
                sendChannel.send(sendMessage + `\n <:coffe:828313267800768523> Mensagem enviada por: ${message.author}`)
                break;
            }
        }
    }
    if (message.content.startsWith(otherPrefix))    {
        let args = message.content.substring(otherPrefix.length).split(" ");
        switch (args[0].toLowerCase()){
            case 'say': {
        // Do something else
                break;
            }
        }
    }
}
};*/

module.exports = {
    name: "say",
    description: "Faz o bot repetir sua mensagem.",
    category: "Moderação",
    usage: "say [message]",
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0,

run: (client, message) => {
    let args = message.content.split(" ").slice(1);
    message.delete();
    if (message.content.includes("@everyone")  || message.content.includes("@here")) return message.channel.send("Você não está me fazendo marcar todo mundo néh?");
    message.channel.send(args.join(" ") + `\n\n <:coffe:828313267800768523> Mensagem enviada por: ${message.author}`).cleanContent;
}
};

