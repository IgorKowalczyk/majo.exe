const Jumble = require("jumble-words");
const jumble = new Jumble();

module.exports = {
    name: "jumble",
    aliases: ["embaralhador", "embaralhar"],
    description: "Embaralha uma palavra",
    category: "Diversão",
    usage: "jumble <palavra>",
run: async (client, message, args) => {

    const word = jumble.generate();
    const filter = m => m.author.id === message.author.id;

    console.log(word);
    await message.channel.send(`Sua palavra é **${word[0].jumble}**!`);

    message.channel.awaitMessages(filter, {
        max: 1,
        error: ["time"],
        time: 15000
    })
    .then(collected => {
        const m = collected.first();
        if (m.content.toLowerCase() !== word[0].word.toLowerCase()) return message.channel.send(`❌ | Invalid word! Correct word was **${word[0].word}**!`);
        return message.channel.send(`✅ | Você Adivinhou! A palavra era **${word[0].word}**.`);
    })
    .catch(() => {
        message.channel.send(`❌ | Você não respondeu a tempo. A palavra correta foi **${word[0].word}**!`);
    })
}
}