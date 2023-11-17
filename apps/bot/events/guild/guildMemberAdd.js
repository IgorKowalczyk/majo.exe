import prismaClient from "@majoexe/database";

export async function guildMemberAdd(client, member) {
 if (!member || !member.user || !member.guild) return;

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
