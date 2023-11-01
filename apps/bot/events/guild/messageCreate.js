/* eslint-disable complexity */

import prismaClient from "@majoexe/database";
import { cacheGet, cacheSet } from "@majoexe/database/redis";
import { fetchXPSettings } from "@majoexe/util/database";
import { EmbedBuilder, AttachmentBuilder, PermissionsBitField, ButtonBuilder, ChannelType, ActionRowBuilder, ButtonStyle } from "discord.js";
import { createXPCard } from "../../util/images/createXPCard.js";

export async function messageCreate(client, message) {
 if (message.author.bot) return;

 if (message.mentions.users.has(client.user.id)) {
  const embed = new EmbedBuilder()
   .setTitle("👋 Hello!")
   .setDescription(
    `Hello ${message.author}! I'm ${client.user.username}, a multi-purpose Discord bot created for **Memes, Image editing, Giveaway, Moderation, Anime and even more!** 🎉

   **You can find the list of all my commands by typing \`/help\`** ${client.config.dashboard.enabled && client.config.dashboard.url ? `or by visiting [my dashboard](${client.config.dashboard.url}/commands)` : ""}.

   ${client.config.dashboard.enabled && client.config.dashboard.url ? `**If you want to invite me to your server, you can do so by clicking [here](${client.config.dashboard.url})**` : ""}`
   )
   .setColor(client.config.defaultColor)
   .setTimestamp()
   .setFooter({
    text: `Requested by ${message.author.globalName || message.author.username}`,
    iconURL: message.author.displayAvatarURL({ size: 256 }),
   });

  if (client.config.dashboard.enabled && client.config.dashboard.url) {
   const action = new ActionRowBuilder() // prettier
    .addComponents(
     new ButtonBuilder() // prettier
      .setLabel("Dashboard")
      .setStyle(ButtonStyle.Link)
      .setURL(client.config.dashboard.url),
     new ButtonBuilder() // prettier
      .setLabel("Invite")
      .setStyle(ButtonStyle.Link)
      .setURL(`${client.config.dashboard.url}/invite`)
    );

   return message.reply({ embeds: [embed], allowedMentions: { repliedUser: false }, components: [action] });
  } else {
   return message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
  }
 }

 // Only count messages in guild text channels
 if (message.channel.type !== ChannelType.GuildText && message.channel.type !== ChannelType.GuildForum && message.channel.type !== ChannelType.GuildAnnouncement) return;

 const messages = await prismaClient.guildMessage.findFirst({
  where: {
   guildId: message.guild.id,
   date: {
    gte: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
   },
  },
 });

 if (!messages) {
  await prismaClient.guildMessage.create({
   data: {
    guild: {
     connectOrCreate: {
      where: { guildId: message.guild.id },
      create: { guildId: message.guild.id },
     },
    },
    date: new Date(),
    messages: 1,
   },
  });
 } else {
  await prismaClient.guildMessage.update({
   where: {
    id: messages.id,
   },
   data: {
    messages: {
     increment: 1,
    },
   },
  });
 }

 const settings = await fetchXPSettings(message.guild.id);

 if (!settings || !settings.enableXP) return;

 const key = `${message.guild.id}-${message.author.id}`;
 const time = JSON.parse(await cacheGet(key));
 const cooldown = 60000;

 if (time && time.time + cooldown > Date.now()) return;
 const random = Math.floor(Math.random() * 60) + 1;

 const xp = await prismaClient.guildXp.findFirst({
  where: {
   guildId: message.guild.id,
   userId: message.author.id,
  },
 });

 await cacheSet(key, { time: Date.now() }, cooldown);

 if (!xp) {
  await prismaClient.guildXp.create({
   data: {
    guild: {
     connectOrCreate: {
      where: { guildId: message.guild.id },
      create: { guildId: message.guild.id },
     },
    },
    user: {
     connectOrCreate: {
      where: {
       discordId: message.author.id,
      },
      create: {
       discordId: message.author.id,
       name: message.author.username,
       global_name: message.author.username,
       avatar: message.author.avatar || null,
       discriminator: message.author.discriminator,
      },
     },
    },
    xp: random,
   },
  });
  return;
 }

 if (!settings.enableXPLevelUpMessage) return;

 const level = Math.floor(0.1 * Math.sqrt(xp.xp));
 const xpAfter = xp.xp + random;
 const nextLevel = Math.floor(0.1 * Math.sqrt(xpAfter));

 if (level < nextLevel) {
  const permissions = message.channel.permissionsFor(message.guild.members.me);
  if (!permissions.has(PermissionsBitField.Flags.SendMessages) || !permissions.has(PermissionsBitField.Flags.EmbedLinks) || !permissions.has(PermissionsBitField.Flags.AttachFiles)) return;

  message.author.avatar = message.author.displayAvatarURL({ dynamic: false, size: 128 });
  const rank = await createXPCard(message.author, { xp: xpAfter, level: nextLevel, xpNeeded: Math.ceil(Math.pow((nextLevel + 1) / 0.1, 2)) }, "#10B981");

  const attachment = new AttachmentBuilder(rank, {
   name: "rank.png",
  });

  const embed = new EmbedBuilder() // prettier
   .setTitle("🎉 Level up!")
   .setDescription(`Congratulations ${message.author}! You have leveled up to level **${nextLevel}**!`)
   .setColor("#10B981")
   .setTimestamp()
   .setImage("attachment://rank.png");

  await message.channel.send({ embeds: [embed], files: [attachment] });
 }

 await prismaClient.guildXp.updateMany({
  where: {
   guildId: message.guild.id,
   userId: message.author.id,
  },
  data: {
   xp: {
    increment: random,
   },
  },
 });
}
