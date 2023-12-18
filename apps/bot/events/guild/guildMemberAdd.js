import prismaClient from "@majoexe/database";
import { EmbedBuilder, AttachmentBuilder, PermissionsBitField } from "discord.js";
import { createUserGuildCard } from "../../util/images/createUserGuildCard.js";
import { shortenText } from "@majoexe/util/functions/util";

export async function guildMemberAdd(client, member) {
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
   guildWelcomeMessage: true,
  },
 });

 if (guild.guildWelcomeMessage) {
  try {
   const welcomeChannel = member.guild.channels.cache.get(guild.guildWelcomeMessage.channelId);

   if (!welcomeChannel) return;
   if (!welcomeChannel.isTextBased()) return;

   if (!member.guild.members.me.permissions.has(PermissionsBitField.Flags.SendMessages)) return;
   if (!member.guild.members.me.permissions.has(PermissionsBitField.Flags.EmbedLinks)) return;
   if (!member.guild.members.me.permissions.has(PermissionsBitField.Flags.AttachFiles)) return;
   if (!member.guild.members.me.permissions.has(PermissionsBitField.Flags.ViewChannel)) return;

   if (!welcomeChannel.permissionsFor(member.guild.members.me).has(PermissionsBitField.Flags.SendMessages)) return;
   if (!welcomeChannel.permissionsFor(member.guild.members.me).has(PermissionsBitField.Flags.EmbedLinks)) return;
   if (!welcomeChannel.permissionsFor(member.guild.members.me).has(PermissionsBitField.Flags.AttachFiles)) return;
   if (!welcomeChannel.permissionsFor(member.guild.members.me).has(PermissionsBitField.Flags.ViewChannel)) return;

   member.user.avatar = member.displayAvatarURL({
    dynamic: false,
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
    .setColor("#10B981")
    .setTimestamp()
    .setImage("attachment://welcome.png");

   welcomeChannel.send({ embeds: [embed], files: [attachment] });
  } catch (error) {
   client.debugger("error", error);
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
