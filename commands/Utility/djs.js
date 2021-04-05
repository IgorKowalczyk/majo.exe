const fetch = require("node-fetch").default;

module.exports = {
    name: "djs",
    aliases: ["discordjs", "discord.js"],
    description: "Mostra informações da wiki Discord.js",
    category: "Utilidades",
    usage: "djs <pesquisa>",
run: async (client, message, args) => {
    
    let [query, branch] = args;

    if (!query) return message.channel.send("Por favor inclua uma consulta de pesquisa!");
    if (!branch) branch = "master";

    fetch(`https://djsdocs.sorta.moe/v2/embed?src=${branch}&q=${encodeURIComponent(query)}`)
        .then(res => res.json())
        .then(json => {
            if (!json) return message.channel.send("404 Not found!");

            message.channel.send({ embed: json });
        })
        .catch(() => {
            message.channel.send("Não podia buscar documentos!");
        })

}
}
