import prismaClient from "@majoexe/database";
import { EmbedBuilder, time, codeBlock, ApplicationCommandType, version } from "discord.js";
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
    value: codeBlock(`Type: ${d.type}\nSize: ${Math.floor(d.size / 1024 / 1024 / 1024)}GB`),
    inline: true,
   }));

   const wait = new EmbedBuilder().setColor(guildSettings?.embedColor || client.config.defaultColor).setDescription(`${client.config.emojis.loading} | I'm collecting info about myself. Please wait...`);

   const messageCreate = await interaction.followUp({ embeds: [wait] });

   const embed = new EmbedBuilder()
    .setTitle(`${client.config.emojis.page} Generic Information`)
    .setColor(guildSettings?.embedColor || client.config.defaultColor)
    .setThumbnail(
     client.user.displayAvatarURL({
      size: 256,
     })
    )
    .setDescription(`>>> **Bot created with ${client.config.emojis.heart} by [Majonez.exe#2495](https://discord.com/users/544164729354977282) in Poland 🇵🇱**`)

    .setFields([
     {
      name: `${client.config.emojis.discord_logo} Guild Count`,
      value: `>>> \`${client.guilds.cache.size} guilds\``,
      inline: true,
     },
     {
      name: `${client.config.emojis.member} Users Count`,
      value: `>>> \`${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} members\``,
      inline: true,
     },
     {
      name: `${client.config.emojis.channel} Channels Count`,
      value: `>>> \`${client.channels.cache.size} channels\``,
      inline: true,
     },
     {
      name: `${client.config.emojis.optical_disk} Operating System`,
      value: codeBlock(`${os.distro} (${os.kernel} ${os.arch})`),
      inline: false,
     },
     {
      name: `${client.config.emojis.package} Tools`,
      value: codeBlock(`Node.js: ${process.version}\nDiscord.js: ${version}`),
      inline: false,
     },
     {
      name: `${client.config.emojis.ping} Ping`,
      value: codeBlock(`Client: ${Math.floor(messageCreate.createdTimestamp - interaction.createdTimestamp)}ms\nHost: ${Math.floor(client.ws.ping)}ms\nDatabase: ${Math.floor(dbTiming)}ms`),
      inline: false,
     },
     {
      name: `${client.config.emojis.cpu_icon} CPU Usage`,
      value: codeBlock(`Cores: ${cpu.cores} (${cpu.physicalCores} physical)\nModel: ${cpu.manufacturer} ${cpu.brand}\nSpeed: ${cpu.speed}GHz\nLoad: ${Math.floor(load.currentLoad)}% (${Math.floor(load.currentLoadUser)}% user, ${Math.floor(load.currentLoadSystem)}% system, ${Math.floor(load.avgLoad)}% average)`),
      inline: false,
     },

     ...driveFields,

     {
      name: `${client.config.emojis.ram_icon} RAM Usage`,
      value: codeBlock(`Total: ${Math.floor(memory.total / 1024 / 1024 / 1024)}GB\nUsed: ${Math.floor(memory.used / 1024 / 1024 / 1024)}GB (${Math.floor((memory.used / memory.total) * 100)}%)\nFree: ${Math.floor(memory.free / 1024 / 1024 / 1024)}GB (${Math.floor((memory.free / memory.total) * 100)}%)`),
      inline: false,
     },
     {
      name: `${client.config.emojis.uptime} Date launched`,
      value: `>>> ${time(client.readyAt)} (${time(client.readyAt, "R")})`,
      inline: true,
     },
    ])
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
