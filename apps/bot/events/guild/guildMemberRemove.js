import prismaClient from "@nyxia/database";
import { shortenText } from "@nyxia/util/functions/util";
import { EmbedBuilder, AttachmentBuilder, PermissionsBitField } from "discord.js";
import { createUserGuildCard } from "../../util/images/createUserGuildCard.js";

export async function guildMemberRemove(client, member) {
 if (!member || !member.user || !member.guild) return;

 const guild = await prismaClient.guild.upsert({
  where: {
   guildId: member.guild.id,
  },
  update: {},
  create: {
   guildId: member.guild.id,
  },
  include: {
   guildLeaveMessage: true,
  },
 });

 if (guild.guildLeaveMessage && guild.guildLeaveMessage.enabled) {
  try {
   const leaveChannel = member.guild.channels.cache.get(guild.guildLeaveMessage.channelId);

   if (!leaveChannel) return;
   if (!leaveChannel.isTextBased()) return;

   if (!member.guild.members.me.permissions.has(PermissionsBitField.Flags.SendMessages)) return;
   if (!member.guild.members.me.permissions.has(PermissionsBitField.Flags.EmbedLinks)) return;
   if (!member.guild.members.me.permissions.has(PermissionsBitField.Flags.AttachFiles)) return;
   if (!member.guild.members.me.permissions.has(PermissionsBitField.Flags.ViewChannel)) return;

   if (!leaveChannel.permissionsFor(member.guild.members.me).has(PermissionsBitField.Flags.SendMessages)) return;
   if (!leaveChannel.permissionsFor(member.guild.members.me).has(PermissionsBitField.Flags.EmbedLinks)) return;
   if (!leaveChannel.permissionsFor(member.guild.members.me).has(PermissionsBitField.Flags.AttachFiles)) return;
   if (!leaveChannel.permissionsFor(member.guild.members.me).has(PermissionsBitField.Flags.ViewChannel)) return;

   member.user.avatar = member.displayAvatarURL({
    dynamic: false,
    size: 128,
   });

   const leaveImage = await createUserGuildCard(member.user, member.guild);

   const attachment = new AttachmentBuilder(leaveImage, {
    name: "leave.png",
   });

   const userName = member.user.globalName || member.user.username;
   const guildName = member.guild.name;

   const embedTitle = guild.guildLeaveMessage.title.replaceAll(/{user}/g, userName).replaceAll(/{guild}/g, guildName);
   const embedDescription = guild.guildLeaveMessage.description.replaceAll(/{user}/g, userName).replaceAll(/{guild}/g, guildName);

   const embed = new EmbedBuilder() // prettier
    .setTitle(shortenText(embedTitle, 250))
    .setDescription(shortenText(embedDescription, 2040))
    .setColor(guild.guildLeaveMessage.embedColor || client.config.defaultColor)
    .setTimestamp()
    .setImage("attachment://leave.png");

   leaveChannel.send({ embeds: [embed], files: [attachment] });
  } catch (error) {
   client.debugger("error", error);
  }
 }

 const leaves = await prismaClient.guildLeave.findFirst({
  where: {
   guildId: member.guild.id,
   date: {
    gte: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
   },
  },
 });

 if (!leaves) {
  await prismaClient.guildLeave.create({
   data: {
    guild: {
     connectOrCreate: {
      where: { guildId: member.guild.id },
      create: { guildId: member.guild.id },
     },
    },
    date: new Date(),
    leaves: 1,
   },
  });
 } else {
  await prismaClient.guildLeave.update({
   where: {
    id: leaves.id,
   },
   data: {
    leaves: {
     increment: 1,
    },
   },
  });
 }
}
