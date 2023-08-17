import { createXPCard } from "../../util/images/xpCard.js";
import prismaClient from "@majoexe/database";
//import { fetchProfanity } from "@majoexe/util/database";
//import Filter from "bad-words";
import { EmbedBuilder, AttachmentBuilder } from "discord.js";
// import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

const XPTimeout = new Map();

/*
const filter = new Filter();

const takeAction = async (client, message) => {
 await message.delete();

 const query = await prismaClient.guildLogs.create({
  data: {
   guild: {
    connectOrCreate: {
     where: {
      guildId: message.guild.id,
     },
     create: {
      guildId: message.guild.id,
     },
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
      global_name: message.author.global_name,
      avatar: message.author.avatar || null,
      discriminator: message.author.discriminator,
     },
    },
   },
   content: "Detected and deleted a message because it contained a bad word.",
   type: "profanity",
  },
 });

 const embed = new EmbedBuilder()
  .setTitle("‼️ Bad word detected")
  .setDescription(
   `
  ${message.author} message has been deleted for using a bad word.

  **Message ID**: \`${message.id}\`
  **User ID**: \`${message.author.id}\`
  **Infraction ID**: \`${query.id}\`
  `
  )
  .setColor("#EF4444")
  .setTimestamp()
  .setThumbnail(
   message.author.displayAvatarURL({
    dynamic: true,
    format: "png",
    size: 2048,
   })
  )
  .setFooter({
   iconURL: client.user.displayAvatarURL({
    dynamic: true,
    format: "png",
    size: 2048,
   }),
   text: "The filter was applied because message scanning was enabled on the server!",
  });

 if (client.config.dashboard.enabled && client.config.dashboard.link) {
  const row = new ActionRowBuilder().addComponents(new ButtonBuilder().setLabel("View server logs").setStyle(ButtonStyle.Link).setURL(`${client.config.dashboard.link}/dashboard/${message.guild.id}/logs`));
  return await message.channel.send({ embeds: [embed], components: [row] });
 }

 await message.channel.send({ embeds: [embed] });
};
*/

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
    guildId: message.guild.id,
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

 const xpKey = `${message.guild.id}-${message.author.id}`;

 if (XPTimeout.get(xpKey) && XPTimeout.get(xpKey).cooldown > Date.now()) return;
 const random = Math.floor(Math.random() * 60) + 1;

 const xp = await prismaClient.guildXp.findFirst({
  where: {
   guildId: message.guild.id,
   userId: message.author.id,
  },
 });

 XPTimeout.set(xpKey, {
  cooldown: Date.now() + 60000,
 });

 if (!xp) {
  await prismaClient.guildXp.create({
   data: {
    guild: {
     connectOrCreate: {
      where: {
       guildId: message.guild.id,
      },
      create: {
       guildId: message.guild.id,
      },
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

 const level = Math.floor(0.1 * Math.sqrt(xp.xp));
 const xpAfter = xp.xp + random;
 const nextLevel = Math.floor(0.1 * Math.sqrt(xpAfter));

 if (level < nextLevel) {
  const rank = await createXPCard(message.author, { xp: xpAfter, level: nextLevel, xpNeeded: Math.ceil(Math.pow((nextLevel + 1) / 0.1, 2)) }, "#10B981");

  const attachment = new AttachmentBuilder(rank, {
   name: "rank.png",
  });

  const embed = new EmbedBuilder()
   .setTitle("🎉 Level up!")
   .setDescription(`Congratulations ${message.author}! You have leveled up to level **${nextLevel}**!`)
   .setColor("#10B981")
   .setTimestamp()
   .setImage("attachment://rank.png")

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
