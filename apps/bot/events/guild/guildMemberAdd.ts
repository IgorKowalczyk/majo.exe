import prismaClient from "@majoexe/database";
import { shortenText } from "@majoexe/util/functions/util";
import { EmbedBuilder, AttachmentBuilder, PermissionsBitField, type GuildMember } from "discord.js";
import type { Majobot } from "../../index.js";
import { createUserGuildCard } from "../../util/images/createUserGuildCard.js";

export async function guildMemberAdd(client: Majobot, member: GuildMember): Promise<void> {
 if (!member || !member.user || !member.guild || !member.guild.available) return;

 const guild = await prismaClient.guild.upsert({
  where: {
   guildId: member.guild.id,
  },
  update: {},
  create: {
   guildId: member.guild.id,
  },
  include: {
   guildWelcomeMessage: true,
  },
 });

 if (guild.guildWelcomeMessage && guild.guildWelcomeMessage.enabled) {
  try {
   const welcomeChannel = member.guild.channels.cache.get(guild.guildWelcomeMessage.channelId);

   if (!welcomeChannel) return;
   if (!welcomeChannel.isTextBased()) return;

   if (!member.guild.members.me) return;
   if (!member.guild.members.me.permissions.has(PermissionsBitField.Flags.SendMessages)) return;
   if (!member.guild.members.me.permissions.has(PermissionsBitField.Flags.EmbedLinks)) return;
   if (!member.guild.members.me.permissions.has(PermissionsBitField.Flags.AttachFiles)) return;
   if (!member.guild.members.me.permissions.has(PermissionsBitField.Flags.ViewChannel)) return;

   if (!welcomeChannel.permissionsFor(member.guild.members.me).has(PermissionsBitField.Flags.SendMessages)) return;
   if (!welcomeChannel.permissionsFor(member.guild.members.me).has(PermissionsBitField.Flags.EmbedLinks)) return;
   if (!welcomeChannel.permissionsFor(member.guild.members.me).has(PermissionsBitField.Flags.AttachFiles)) return;
   if (!welcomeChannel.permissionsFor(member.guild.members.me).has(PermissionsBitField.Flags.ViewChannel)) return;

   member.user.avatar = member.displayAvatarURL({
    size: 128,
   });

   const welcomeImage = await createUserGuildCard(member.user, member.guild);

   const attachment = new AttachmentBuilder(welcomeImage, {
    name: "welcome.png",
   });

   const userName = member.user.globalName || member.user.username;
   const guildName = member.guild.name;

   const embedTitle = guild.guildWelcomeMessage.title.replaceAll(/{user}/g, userName).replaceAll(/{guild}/g, guildName);
   const embedDescription = guild.guildWelcomeMessage.description.replaceAll(/{user}/g, userName).replaceAll(/{guild}/g, guildName);

   const embed = new EmbedBuilder() // prettier
    .setTitle(shortenText(embedTitle, 250))
    .setDescription(shortenText(embedDescription, 2040))
    .setColor(guild.guildWelcomeMessage.embedColor || client.config.defaultColor)
    .setTimestamp()
    .setImage("attachment://welcome.png");

   welcomeChannel.send({ embeds: [embed], files: [attachment] });
  } catch (error: Error | any) {
   client.debugger("error", error.message);
  }
 }

 const joins = await prismaClient.guildJoin.findFirst({
  where: {
   guildId: member.guild.id,
   date: {
    gte: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
   },
  },
 });

 if (!joins) {
  await prismaClient.guildJoin.create({
   data: {
    guild: {
     connectOrCreate: {
      where: { guildId: member.guild.id },
      create: { guildId: member.guild.id },
     },
    },
    date: new Date(),
    joins: 1,
   },
  });
 } else {
  await prismaClient.guildJoin.update({
   where: {
    id: joins.id,
   },
   data: {
    joins: {
     increment: 1,
    },
   },
  });
 }
}
