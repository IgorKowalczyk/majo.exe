import prismaClient from "@majoexe/database";

export async function guildMemberRemove(client, member) {
 if (!member || !member.user || !member.guild) return;
 const leaves = await prismaClient.GuildLeave.findFirst({
  where: {
   guildId: member.guild.id,
   date: {
    gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
   },
  },
 });

 if (!leaves) {
  await prismaClient.GuildLeave.create({
   data: {
    guildId: member.guild.id,
    date: new Date(),
    leaves: 1,
   },
  });
 } else {
  await prismaClient.GuildLeave.update({
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
