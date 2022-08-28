const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { dependencies } = require("../../../../package.json");
const moment = require("moment");
const osu = require("node-os-utils");
const cpu = osu.cpu;
const os = osu.os;
const drive = osu.drive;
const memory = osu.mem;
const fetch = require("node-fetch");

module.exports = async (client, interaction, args) => {
 const client_uptime = new Date().getTime() - Math.floor(client.uptime);
 const date = Math.floor(Date.now() / 10);
 const websocket_ping = Math.floor(client.ws.ping);
 const wait_embed = new MessageEmbed() // Prettier
  .setColor("#5865f2")
  .setDescription(`${client.bot_emojis.loading} | I'm collecting info about myself. Please wait...`);
 interaction.followUp({ embeds: [wait_embed] }).then(async (process_message) => {
  client.database.getConnection(async (err, conn) => {
   await conn.ping(() => {
    database_ping = Math.floor(Date.now() / 10 - date);
   });
  });
  const client_ping = Math.floor(Date.now() / 10 - date);
  Promise.all([
   // Prettier
   cpu.usage(),
   drive.info(),
   os.oos(),
   memory.info(),
   fetch(`https://api.github.com/repos/${client.config.github}/${client.config.github_repo}/commits?per_page=1`),
  ])
   .then(([cpu_info, drive_info, os_info, memory_info, git]) => {
    return Promise.all(
     // Prettier
     [cpu_info, JSON.parse(JSON.stringify(drive_info)), os_info, memory_info, git.json()]
    );
   })
   .then(([cpu_info, drive_info, os_info, memory_info, git]) => {
    const embed = new MessageEmbed() // Prettier
     .setTitle(`${client.bot_emojis.page} Generic Information`)
     .setColor("#5865F2")
     .setThumbnail(
      client.user.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      })
     )
     .setDescription(`>>> **Bot created with ${client.bot_emojis.heart} by [Majonez.exe#2495](https://discord.com/users/544164729354977282) in Poland 🇵🇱**`)
     .addField(`${client.bot_emojis.discord_logo} Guild Count`, `>>> \`${client.guilds.cache.size} guilds\``, true)
     .addField(`${client.bot_emojis.member} Users Count`, `>>> \`${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} members\``, true)
     .addField(`${client.bot_emojis.channel} Channels Count`, `>>> \`${client.channels.cache.size} channels\``, true)
     .addField(`${client.bot_emojis.optical_disk} Operating System`, `\`\`\`${os_info} (${os.platform().capitalize()} ${os.arch()})\`\`\``)
     .addField(`${client.bot_emojis.package} Tools`, `\`\`\`Node.js: ${process.version} | Discord.js: ${dependencies["discord.js"].replace("^", "v")}\`\`\``)
     .addField(`${client.bot_emojis.ping} Ping`, `\`\`\`Client: ${Math.floor(websocket_ping + client_ping)}ms | Host: ${Math.floor(websocket_ping)}ms | MySQL: ${Math.floor(database_ping)}ms\`\`\``)
     .addField(`${client.bot_emojis.cpu_icon} CPU`, `\`\`\`${cpu.model()} (${cpu.count()} cores) [${cpu_info}% used]\`\`\``)
     .addField(`${client.bot_emojis.drive_icon} Drive`, `\`\`\`${drive_info.usedGb}GB/${drive_info.totalGb}GB (${drive_info.freePercentage}% free)\`\`\``)
     .addField(`${client.bot_emojis.ram_icon} RAM Usage`, `\`\`\`Server: ${memory_info.usedMemMb.toFixed()}MB/${memory_info.totalMemMb.toFixed()}MB (${(100 - memory_info.freeMemPercentage).toFixed(2)}% used)\nClient: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB/${memory_info.totalMemMb.toFixed()}MB (${((100 * (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)) / memory_info.totalMemMb.toFixed()).toFixed(2)}% used)\`\`\``)
     .addField(`${client.bot_emojis.uptime} Date launched`, `>>> <t:${moment(client_uptime).unix()}> (<t:${moment(client_uptime).unix()}:R>)\n`)
     .addField(`${client.bot_emojis.octo} Latest commit`, `>>> **Git:** *[${git[0].sha}](${git[0].html_url})*\n**Time:** <t:${moment(git[0].commit.committer.date).unix()}:D> (<t:${moment(git[0].commit.committer.date).unix()}:R>)`)
     .setFooter({
      text: `Requested by ${interaction.user.username}`,
      iconURL: interaction.user.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      }),
     });
    const row = new MessageActionRow() // Prettier
     .addComponents(
      new MessageButton() // Prettier
       .setURL(`${client.config.support_server}`)
       .setEmoji(client.bot_emojis.member)
       .setLabel("Support")
       .setStyle("LINK")
     )
     .addComponents(
      new MessageButton() // Prettier
       .setURL(`https://discord.com/oauth2/authorize/?permissions=${client.config.permissions}&scope=${client.config.scopes}&client_id=${client.user.id}`)
       .setEmoji(client.bot_emojis.channel)
       .setLabel("Invite me")
       .setStyle("LINK")
     );
    if (process.env.DOMAIN) {
     row.addComponents(
      new MessageButton() // Prettier
       .setURL(`${process.env.DOMAIN}`)
       .setEmoji(client.bot_emojis.role)
       .setLabel("Dashboard")
       .setStyle("LINK")
     );
    }
    process_message.edit({ embeds: [embed], components: [row] });
   });
 });
};
