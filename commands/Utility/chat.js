module.exports = {
    name: "chat",
    aliases: ["say", "falar"],
    description: "Conversa com o Usuário",
    category: "Utilidades",
    usage: "chat <message>",
run: (client, message, args, api) => {
    let mesg = args.join(" ");
    if (!mesg) return message.channel.send("Por favor, diga alguma coisa.");
   
    client.snowapi.chatbot({ message: mesg }).then(msg => {
        message.channel.send(msg);
    })
  }
}

