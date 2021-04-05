const fs = require("fs");

module.exports = {
    name: "play",
    aliases: ["tocar"],
    description: "Toca um Audio",
    category: "Musica",
    usage: "Play",
run: async (client, message, args) => {

    const voicechannel = message.member.voice.channel;
    if (!voicechannel) return message.channel.send("Por favor, junte-se a um canal de voz!");

    if (!fs.existsSync(`./recorded-${message.author.id}.pcm`)) return message.channel.send("Seu áudio não é gravado!");

    const connection = await message.member.voice.channel.join();
    const stream = fs.createReadStream(`./recorded-${message.author.id}.pcm`);

    const dispatcher = connection.play(stream, {
        type: "converted"
    });

    dispatcher.on("Finalizado", () => {
        message.member.voice.channel.leave();
        return message.channel.send("fim do áudio.");
    })
}
};
