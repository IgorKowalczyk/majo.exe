export const config = {
 /*
  Dashboard location: /apps/dashboard
  */
 dashboard: {
  enabled: true, // boolean. Is bot using dashboard
  link: process.env.NEXTAUTH_URL, // string. Dashboard main url
 },

 /*
  Debugger configuration. Set everything to true if you want console hell
  */
 debugger: {
  displayEventList: false, // boolean. Display event list on startup
  displayCommandList: false, // boolean. Display command list on startup
  displayCommandUsage: false, // boolean. Display command usage on command run
 },
};
