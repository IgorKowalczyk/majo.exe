import prismaClient from "@majoexe/database";

export async function guildMemberAdd(client, member) {
 if (!member || !member.user || !member.guild) return;
 const joins = await prismaClient.guildJoin.findFirst({
  where: {
   guildId: member.guild.id,
   date: {
    gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
   },
  },
 });

 if (!joins) {
  await prismaClient.guildJoin.create({
   data: {
    guildId: member.guild.id,
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
