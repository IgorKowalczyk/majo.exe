const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "leaderboard",
    aliases: [],
    description: "Mostra a leaderboard do servidor",
    category: "Utilidades",
    usage: "leaderboard",
run: async (client, message, args) => {
    let data = client.db.all().filter(i => i.ID.startsWith("xp_")).sort((a, b) => b.data - a.data);
    if (data.length < 1) return message.channel.send("Nenhuma leaderboard");
    let myrank = data.map(m => m.ID).indexOf(`xp_${message.author.id}`) + 1 || "N/A";
    data.length = 20;
    let lb = [];
    for (let i in data)  {
        let id = data[i].ID.split("_")[1];
        let user = await client.users.fetch(id);
        user = user ? user.tag : "Usuário desconhecido#0000";
        let rank = data.indexOf(data[i]) + 1;
        let level = client.db.get(`level_${id}`);
        let xp = data[i].data;
        let xpreq = Math.floor(Math.pow(level / 0.1, 2));
        lb.push({
            user: { id, tag: user },
            rank,
            level,
            xp,
            xpreq
        });
    };

    const embed = new MessageEmbed()
    .setTitle("Leaderboard")
    .setColor("RANDOM")
    lb.forEach(d => {
        embed.addField(`${d.rank}. ${d.user.tag}`, `**Level** - ${d.level}\n**XP** - ${d.xp} / ${d.xpreq}`);
    });
    embed.setFooter(`Sua posição: ${myrank}`);
    return message.channel.send(embed);
}
};


