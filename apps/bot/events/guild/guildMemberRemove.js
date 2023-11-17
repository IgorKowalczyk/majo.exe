import prismaClient from "@majoexe/database";

export async function guildMemberRemove(client, member) {
 if (!member || !member.user || !member.guild) return;

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
