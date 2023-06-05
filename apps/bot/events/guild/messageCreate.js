import prismaClient from "@majoexe/database";
import { fetchProfanity } from "@majoexe/util/database";
import Filter from "bad-words";
import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

const filter = new Filter();
const XPTimeout = new Map();

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
      global_name: message.author.username,
      avatar:
       message.author.displayAvatarURL({
        dynamic: true,
        format: "png",
        size: 2048,
       }) || null,
      discriminator: message.author.discriminator,
      public_flags: message.author.flags?.bitfield,
      flags: message.author.flags?.bitfield,
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
  <@${message.author.id}> message has been deleted for using a bad word.

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
   iconURL: client.user?.displayAvatarURL({
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

export async function messageCreate(client, message) {
 if (!message.content) return;
 const content = message.content.slice(0, 250);
 const profanity = await fetchProfanity(message.guild.id);
 if (profanity > 0) {
  const isProfane = filter.isProfane(content);

  if (isProfane && profanity === 1) {
   return takeAction(client, message);
  }
 }

 if (message.author.bot) return;
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
       avatar:
        message.author.displayAvatarURL({
         dynamic: true,
         format: "png",
         size: 2048,
        }) || null,
       discriminator: message.author.discriminator,
       public_flags: message.author.flags?.bitfield,
       flags: message.author.flags?.bitfield,
      },
     },
    },
    xp: random,
   },
  });
  return;
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
