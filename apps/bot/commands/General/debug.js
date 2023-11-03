import prismaClient from "@majoexe/database";
import { formatNumber } from "@majoexe/util/functions";
import { EmbedBuilder, codeBlock, ApplicationCommandType, version } from "discord.js";
import { cpu as cpuInfo, mem, diskLayout, osInfo, currentLoad } from "systeminformation";

export default {
 name: "debug",
 description: "🔧 Get information about the bot",
 type: ApplicationCommandType.ChatInput,
 cooldown: 3000,
 dm_permission: true,
 usage: "/debug",
 run: async (client, interaction, guildSettings) => {
  try {
   const dbTime = performance.now();
   await prismaClient.user.findUnique({ where: { id: "1" } });
   const dbTiming = performance.now() - dbTime;

   const memory = await mem();
   const cpu = await cpuInfo();
   const drive = await diskLayout();
   const os = await osInfo();
   const load = await currentLoad();

   const driveFields = drive.map((d) => ({
    name: `${client.config.emojis.drive_icon} ${d.name}`,
    value: codeBlock("yaml", `Type: ${d.type}\nSize: ${Math.floor(d.size / 1024 / 1024 / 1024)}GB`),
    inline: true,
   }));

   const wait = new EmbedBuilder().setColor(guildSettings?.embedColor || client.config.defaultColor).setDescription(`${client.config.emojis.loading} | Collecting data...`);

   const messageCreate = await interaction.followUp({ embeds: [wait] });

   const embed = new EmbedBuilder()
    .setTitle(`${client.config.emojis.page} Generic Information`)
    .setColor(guildSettings?.embedColor || client.config.defaultColor)

    .setDescription(`>>> **Bot created with ${client.config.emojis.heart} by [@majonez.exe](https://discord.com/users/544164729354977282) in Poland 🇵🇱**`)

    .setFields([
     {
      name: `${client.config.emojis.discord_logo} Guild Count`,
      value: `>>> \`${formatNumber(client.guilds.cache.size)} guilds\``,
      inline: true,
     },
     {
      name: `${client.config.emojis.member} Users Count`,
      value: `>>> \`${formatNumber(client.guilds.cache.reduce((a, g) => a + g.memberCount, 0))} members\``,
      inline: true,
     },
     {
      name: `${client.config.emojis.channel} Channels Count`,
      value: `>>> \`${formatNumber(client.channels.cache.size)} channels\``,
      inline: true,
     },
     {
      name: `${client.config.emojis.optical_disk} Operating System`,
      value: codeBlock("yaml", `${os.distro} (${os.kernel} ${os.arch})`),
      inline: false,
     },
     {
      name: `${client.config.emojis.package} Tools`,
      value: codeBlock("yaml", `Node.js: ${process.version}\nDiscord.js: ${version}`),
      inline: false,
     },
     {
      name: `${client.config.emojis.ping} Ping`,
      value: codeBlock("yaml", `Client: ${Math.floor(messageCreate.createdTimestamp - interaction.createdTimestamp)}ms\nHost: ${Math.floor(client.ws.ping) > 0 ? `${Math.floor(client.ws.ping)}ms` : "Calculating..."}\nDatabase: ${Math.floor(dbTiming)}ms`),
      inline: false,
     },
     {
      name: `${client.config.emojis.cpu_icon} CPU Usage`,
      value: codeBlock("yaml", `Cores: ${cpu.cores} (${cpu.physicalCores} physical)\nModel: ${cpu.manufacturer} ${cpu.brand}\n${cpu.speed > 0 ? `Speed: ${cpu.speed}GHz\n` : ""}Load: ${Math.floor(load.currentLoad)}% (${Math.floor(load.currentLoadUser)}% user, ${Math.floor(load.currentLoadSystem)}% system, ${Math.floor(load.avgLoad)}% average)`),
      inline: false,
     },

     ...driveFields,

     {
      name: `${client.config.emojis.ram_icon} RAM Usage`,
      value: codeBlock("yaml", `Total: ${Math.floor(memory.total / 1024 / 1024 / 1024)}GB\nUsed: ${Math.floor(memory.used / 1024 / 1024 / 1024)}GB (${Math.floor((memory.used / memory.total) * 100)}%)\nFree: ${Math.floor(memory.free / 1024 / 1024 / 1024)}GB (${Math.floor((memory.free / memory.total) * 100)}%)\nProcess: ${Math.floor(process.memoryUsage().heapUsed / 1024 / 1024)}MB`),
      inline: false,
     },
     {
      name: "💡 Did you know about this?",
      value: ">>> **The stats above are due to our wonderful hosting - [TrestHost](https://dash.tresthost.me/register?ref=majonez.exe)**. Register now and try their __VPS, Node.js, Go, Java and Python hosting!__",
     },
    ])
    .setImage("https://repository-images.githubusercontent.com/678773099/96116fa6-00e7-456d-a05d-d72feeb217a3")
    .setFooter({
     text: `Requested by ${interaction.member.user.globalName || interaction.member.user.username}`,
     iconURL: interaction.member.user.displayAvatarURL({
      size: 256,
     }),
    });

   embed.setTimestamp();
   await messageCreate.edit({ embeds: [embed] });
   return;
  } catch (err) {
   console.log(err);
   client.errorMessages.internalError(interaction, err);
  }
 },
};
