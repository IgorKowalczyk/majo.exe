const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const osutils = require("os-utils");
const osu = require("node-os-utils");
const cpu = osu.cpu;
const os = osu.os;
const drive = osu.drive;
const memory = osu.mem;
const { dependencies } = require("../../../package.json");
const fetch = require("node-fetch");

module.exports = {
 name: "debug",
 description: "🎛️ Debug bot",
 usage: "/debug <query>",
 category: "General",
 options: [
  {
   name: "query",
   required: true,
   description: "Thing to debug",
   type: 3,
   choices: [
    {
     name: "Debug permissions (in this server)",
     value: "bot",
    },
    {
     name: "Debug host (where the bot is hosted)",
     value: "host",
    },
    {
     name: "Debug dependencies (NPM packages)",
     value: "dependencies",
    },
   ],
  },
 ],
 run: async (client, interaction, args) => {
  try {
   if (args[0] == "bot") {
    const embed = new MessageEmbed()
     .setTitle(`${client.bot_emojis.discord_logo} ${client.user.username} Debug`)
     .setDescription(
      `These are the bot premissions on this server. If <@${client.user.id}> misses them some commands & functions will be disabled!
     • \`ADMINISTRATOR\`: ${interaction.guild.me.permissions.has("ADMINISTRATOR") ? `${client.bot_emojis.success}` : `${client.bot_emojis.error}`}\n
     • \`MANAGE_MESSAGES\`: ${interaction.guild.me.permissions.has("MANAGE_MESSAGES") ? `${client.bot_emojis.success} Passed!` : `${client.bot_emojis.error} Error!`}
     • \`MANAGE_CHANNELS\`: ${interaction.guild.me.permissions.has("MANAGE_CHANNELS") ? `${client.bot_emojis.success} Passed!` : `${client.bot_emojis.error} Error!`}
     • \`MANAGE_ROLES\`: ${interaction.guild.me.permissions.has("MANAGE_ROLES") ? `${client.bot_emojis.success} Passed!` : `${client.bot_emojis.error} Error!`}
     • \`KICK_MEMBERS\`: ${interaction.guild.me.permissions.has("KICK_MEMBERS") ? `${client.bot_emojis.success} Passed!` : `${client.bot_emojis.error} Error!`}
     • \`BAN_MEMBERS\`: ${interaction.guild.me.permissions.has("BAN_MEMBERS") ? `${client.bot_emojis.success} Passed!` : `${client.bot_emojis.error} Error!`}
     • \`ADD_REACTIONS\`: ${interaction.guild.me.permissions.has("ADD_REACTIONS") ? `${client.bot_emojis.success} Passed!` : `${client.bot_emojis.error} Error!`}
     • \`MANAGE_EMOJIS_AND_STICKERS\`: ${interaction.guild.me.permissions.has("MANAGE_EMOJIS_AND_STICKERS") ? `${client.bot_emojis.success} Passed!` : `${client.bot_emojis.error} Error!`}
     • \`VIEW_AUDIT_LOG\`: ${interaction.guild.me.permissions.has("VIEW_AUDIT_LOG") ? `${client.bot_emojis.success} Passed!` : `${client.bot_emojis.error} Error!`}
     • \`SEND_MESSAGES\`: ${interaction.guild.me.permissions.has("SEND_MESSAGES") ? `${client.bot_emojis.success} Passed!` : `${client.bot_emojis.error} Error!`}
     • \`MANAGE_MESSAGES\`: ${interaction.guild.me.permissions.has("MANAGE_MESSAGES") ? `${client.bot_emojis.success} Passed!` : `${client.bot_emojis.error} Error!`}
     • \`EMBED_LINKS\`: ${interaction.guild.me.permissions.has("EMBED_LINKS") ? `${client.bot_emojis.success} Passed!` : `${client.bot_emojis.error} Error!`}
     • \`ATTACH_FILES\`: ${interaction.guild.me.permissions.has("ATTACH_FILES") ? `${client.bot_emojis.success} Passed!` : `${client.bot_emojis.error} Error!`}
     • \`USE_EXTERNAL_EMOJIS\`: ${interaction.guild.me.permissions.has("USE_EXTERNAL_EMOJIS") ? `${client.bot_emojis.success} Passed!` : `${client.bot_emojis.error} Error!`}
     > ${client.bot_emojis.stopwatch} Ping: ${Math.round(client.ws.ping)}ms`
     )
     .setTimestamp()
     .setColor("#4f545c")
     .setFooter({
      text: `Requested by ${interaction.user.username}`,
      iconURL: interaction.user.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      }),
     });
    interaction.followUp({ embeds: [embed] });
   } else if (args[0] == "dependencies") {
    const embed = new MessageEmbed() // Prettier
     .setTitle(`${client.bot_emojis.package} Dependencies`)
     .setDescription(`> <@${client.user.id}> runs on ${Object.keys(require("../../../package").dependencies).length} [NPM packages](https://www.npmjs.com) (Javascript power ${client.bot_emojis.muscule}!)`)
     .setTimestamp()
     .setImage("https://i.redd.it/tfugj4n3l6ez.png")
     .setColor("#5865F2")
     .setFooter({
      text: `Requested by ${interaction.user.username}`,
      iconURL: interaction.user.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      }),
     });
    interaction.followUp({ embeds: [embed] });
   } else if (args[0] == "host") {
    const client_uptime = new Date().getTime() - Math.floor(client.uptime);
    const wait_embed = new MessageEmbed() // Prettier
     .setColor("#5865f2")
     .setDescription(`${client.bot_emojis.loading} | I'm collecting info about myself. Please wait...`);
    interaction.followUp({ embeds: [wait_embed] }).then((process_message) => {
     Promise.all(// Prettier
      [cpu.usage(), drive.info(), os.oos(), fetch(`https://api.github.com/repos/${client.config.github}/${client.config.github_repo}/commits?per_page=1`)])
      .then(([cpu_info, drive_info, os_info, git]) => {
       return Promise.all( // Prettier
       [cpu_info, JSON.parse(JSON.stringify(drive_info)), os_info, git.json()]);
      })
      .then(([cpu_info, drive_info, os_info, git]) => {
        const embed = new MessageEmbed() // Prettier
         .setTitle(`${client.bot_emojis.page} Generic Information`)
         .setColor("#4f545c")
         .setThumbnail(
          client.user.displayAvatarURL({
           dynamic: true,
           format: "png",
           size: 2048,
          })
         )
         .setDescription(`>>> ${client.bot_emojis.owner_crown} **Bot created with ${client.bot_emojis.heart} by <@${client.config.owner_id}> in Poland 🇵🇱**`)
         .addField(`${client.bot_emojis.discord_logo} Guild Count`, `>>> \`${client.guilds.cache.size} guilds\``, true)
         .addField(`${client.bot_emojis.member} Users Count`, `>>> \`${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} members\``, true)
         .addField(`${client.bot_emojis.channel} Channels Count`, `>>> \`${client.channels.cache.size} channels\``, true)
         .addField(`${client.bot_emojis.optical_disk} Operating System`, `\`\`\`${os_info} (${os.platform().capitalize()} ${os.arch()})\`\`\``)
         .addField(`${client.bot_emojis.package} Tools`, `\`\`\`Node.js: ${process.version} | Discord.js: ${dependencies["discord.js"].replace("^", "v")}\`\`\``)
         .addField(`${client.bot_emojis.ping} Ping`, `\`\`\`Bot: ${Math.round(client.ws.ping)}ms | API: ${(Date.now() - interaction.createdTimestamp).toString().replace(/-/g, "")}ms\`\`\``)
         .addField(`${client.bot_emojis.cpu_icon} CPU`, `\`\`\`${cpu.model()} (${cpu.count()} cores) [${cpu_info}% used]\`\`\``)
         .addField(`${client.bot_emojis.drive_icon} Drive`, `\`\`\`${drive_info.usedGb}GB/${drive_info.totalGb}GB (${drive_info.freePercentage}% free)\`\`\``)
         .addField(`${client.bot_emojis.ram_icon} RAM Usage`, `\`\`\`Server: ${(osutils.totalmem() - osutils.freemem()).toString().split(".")[0] + "." + (osutils.totalmem() - osutils.freemem()).toString().split(".")[1].split("")[0] + (osutils.totalmem() - osutils.freemem()).toString().split(".")[1].split("")[1]}/${osutils.totalmem().toString().split(".")[0] + "." + osutils.totalmem().toString().split(".")[1].split("")[0] + osutils.totalmem().toString().split(".")[1].split("")[1]}MB (${(100 - osutils.freememPercentage() * 100).toString().split(".")[0] + "." + (100 - osutils.freememPercentage() * 100).toString().split(".")[1].split("")[0] + (100 - osutils.freememPercentage() * 100).toString().split(".")[1].split("")[1]}%)\nClient: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB/${osutils.totalmem().toString().split(".")[0] + "." + osutils.totalmem().toString().split(".")[1].split("")[0] + osutils.totalmem().toString().split(".")[1].split("")[1]}MB (${((100 * (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)) / osutils.totalmem().toString().split(".")[0]).toFixed(2)} %)\`\`\``)
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
   }
  } catch (err) {
   console.log(err);
   return client.createSlashCommandError(interaction, err);
  }
 },
};
