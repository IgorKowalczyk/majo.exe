const fs = require("fs");

module.exports = {
    name: "record",
    aliases: ["gravar"],
    description: "Grava um Audio",
    category: "Musica",
    usage: "record",
run: async (client, message, args) => {

    const voicechannel = message.member.voice.channel;
    if (!voicechannel) return message.channel.send("Por favor, junte-se a um canal de voz primeiro!");

    const connection = await message.member.voice.channel.join();
    const receiver = connection.receiver.createStream(message.member, {
        mode: "pcm",
        end: "silence"
    });

    const writer = receiver.pipe(fs.createWriteStream(`./recorded-${message.author.id}.pcm`));
    writer.on("finish", () => {
        message.member.voice.channel.leave();
        message.channel.send("Terminou de escrever áudio.");
    });
}
}


