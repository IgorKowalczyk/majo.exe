const Discord = require("discord.js");
require("moment-duration-format");
const moment = require("moment");
module.exports = {
 name: "stat",
 aliases: ["statistics"],
 description: "Mostrar informações do cliente para desenvolvedores",
 category: "Utilidades",
 usage: "stats",
run: (client, message, args, sql) =>{
            const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
            message.channel.send(`= STATISTICS =
• Mem Usage  :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
• Uptime     :: ${duration}
• Users      :: ${client.users.size.toLocaleString()}
• Servers    :: ${client.guilds.size.toLocaleString()}
• Channels   :: ${client.channels.size.toLocaleString()}
• Node       :: ${process.version}`, {code: "asciidoc"});

    }
}