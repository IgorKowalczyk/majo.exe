module.exports = {
 // Main config
 author: "Majonez.exe#2495", // Bot owner
 owner_id: "544164729354977282", // Owner ID
 author_website: "https://igorkowalczyk.github.io", // Owner website
 description: "Majo.exe - Discord bot for Fun, Memes, Images, Giveaway, Economy, Anime and NSFW!", // Bot description
 support_server: "https://discord.gg/bVNNHuQ", // Support server invite
 support_server_id: process.env.SUPPORT_SERVER_ID, // Support server ID
 status: "https://bit.ly/majo-status", // Status page link
 twitter: "majonezexe", // Twitter username
 github: "igorkowalczyk", // Github repository owner
 github_repo: "majo.exe", // Github repository
 about_bot: "... Soon!", // About Bot [Discord markdown supported]
 about_dev: "... Soon!", // About Bot Developer [Discord markdown supported]
 donation_perks: "", // Sponsors perks [Discord markdown supported]
 patreon: "igorkowalczyk", // Sponsor link
 ko_fi: "igorkowalczyk", // Sponsor link
 buymeacoffee: "rkjha", // Sponsor link
 open_collective: "igorkowalczyk", // Sponsor link
 scopes: "bot%20applications.commands", // Dashboard scopes
 permissions: "1539679190263", // Default invite perms
 id: process.env.ID, // Discord Client ID
 advanved_logging: false, // Show debug info
 ratelimit: 2500, // Global slash command ratelimit in ms (can be customized for each command)
 max_input: 200, // Maximum text input for slash commands (characters)
 suggestions_channel: "838092194530852884", // Suggestions channel

 member_limit: {
  respect: false, // Respect guild member limit
  min_members: 15, // Minimum guild members to join the bot
  ignore: {
   // Ignore guilds
   id: ["709486554862714991", "695282860399001640"], // Guild IDs
  },
 },

 bypass_modules: {
  bot: false, // Bypass check for --bot argument [For pterodactyl panel]
  dashboard: false, // Bypass check for --dashboard argument [For pterodactyl panel]
  api: false, // Bypass check for --api argument [For pterodactyl panel]
 },
};
