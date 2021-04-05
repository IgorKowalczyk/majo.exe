module.exports = {
    name: "reboot",
    aliases: ["restart", "reiniciar"],
    description: "Reinicia o bot",
    category: "Dono",
    usage: "reboot",
run: (bot, message, args, funcs) => {
    if (message.author.id !== "506505845215985674") return message.channel.send({embed: {
        color: 16734039,
        description: "Apenas o proprietário do Bot pode usar este comando."
       }});
    process.exit(1);
}
};


