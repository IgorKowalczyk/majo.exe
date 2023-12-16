import prismaClient from "@majoexe/database";
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
 });

 if (guild.guildleaveChannel) {
  try {
   const leaveChannel = member.guild.channels.cache.get(guild.guildleaveChannel.channelId);

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

   const embed = new EmbedBuilder() // prettier
    .setTitle(`👋 Goodbye ${member.user.globalName || member.user.username}`)
    .setDescription("> We're sorry to see you go!")
    .setColor("#10B981")
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
