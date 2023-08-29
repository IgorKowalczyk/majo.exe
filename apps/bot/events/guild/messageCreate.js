import prismaClient from "@majoexe/database";
import { cacheGet, cacheSet } from "@majoexe/database/redis";
import { fetchXPSettings } from "@majoexe/util/database";
import { EmbedBuilder, AttachmentBuilder } from "discord.js";
import { createXPCard } from "../../util/images/createXPCard.js";

export async function messageCreate(client, message) {
 if (message.author.bot) return;
 if (message.channel.type === "DM") return;

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
