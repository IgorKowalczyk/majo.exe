const hastebin = require("hastebin-gen");
const config = require("../../config.js")

module.exports = {
    name: "discrim",
    aliases: ["discriminator", "discriminador"],
    description: `Mostra uma lista de pessoas com o mesmo discriminator (#) ex: ${config.prefix}discrim 0001`,
    category: "Utilidades",
    usage: "discrim <4 numeros>",
run: (client, message, args) => {
    const query = args[0];
    if (!query) return message.channel.send("Por favor, inclua um discriminador!");

    const users = client.users.cache.filter(user => user.discriminator === query).map(m => m.tag);
    if (!users.length) return message.channel.send(`No users found with discriminator **#${query}**!`);

    hastebin(users.join("\n"))
        .then(haste => {
            message.channel.send(`${users.length} Usuários encontrados com discriminador **#${query}**!\n${haste}`);
        })
        .catch(e => {
            message.channel.send("Algo deu errado, por favor, tente novamente mais tarde!");
        });
}
}
