/* eslint-disable camelcase */

/*
Code from: https://www.npmjs.com/package/@next-auth/prisma-adapter

Removed from schema:
  - email
  - emailVerified
*/

export function PrismaAdapter(prisma) {
 return {
  async createUser(data) {
   delete data.email;
   delete data.emailVerified;

   await prisma.user.upsert({
    where: { discordId: data.discordId },
    create: data,
    update: data,
   });
  },

  async getUser(id) {
   await prisma.user.findUnique({ where: { id } });
  },

  async getUserByAccount(provider_providerAccountId) {
   var _a;
   const account = await prisma.account.findUnique({
    where: { provider_providerAccountId },
    select: { user: true },
   });
   return (_a = account === null || account === void 0 ? void 0 : account.user) !== null && _a !== void 0 ? _a : null;
  },

  async updateUser({ id, ...data }) {
   delete data.email;
   delete data.emailVerified;

   await prisma.user.update({ where: { id }, data });
  },

  async deleteUser(id) {
   await prisma.user.delete({ where: { id } });
  },
 };
}
