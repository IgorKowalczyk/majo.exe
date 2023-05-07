export const config = {
 /*
  Dashboard location: /apps/dashboard
  */
 dashboard: {
  enabled: true, // boolean. Is bot using dashboard
  link: process.env.NEXTAUTH_URL, // Dashboard main url
 },
 displayDirectoryTree: true, // boolean. Display directories trees on startup
};
