const Discord = module.require("discord.js");
const prefix = process.env.PREFIX;
const msg = "**Majo.exe**\n\n*All commands*:\n`!majo help` - display this list\n`!majo ping` - display a bot ping";

module.exports.run = async (client, message, args) => {
    await message.channel.send(msg);
}

module.exports.help = {
    name: "help",
    description: "Display a help",
    usage: "help"
}
