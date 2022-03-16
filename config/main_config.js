module.exports = {
 // Main config
 author: "Majonez.exe#2495", // Bot owner
 author_website: "https://igorkowalczyk.github.io", // Owner website
 owner_id: "544164729354977282", // Owner ID
 description: "Majo.exe - Discord bot for Fun, Memes, Images, Giveaway, Economy, Anime and NSFW! Majo serve over 100 commands!", // Bot description
 support_server: "https://discord.gg/bVNNHuQ", // Support server invite
 support_server_id: process.env.SUPPORT_SERVER_ID, // Support server ID
 status: "https://bit.ly/majo-status", // Status page link
 send_statistics: true, // Every 30 seconds script will send the bot statistics to the Dashboard API (<domain>/dashboard/stats not to be confused with the <domain>/api endpoint!) (API link set in process.env.DASHBOARD) like uptime, CPU Used, RAM Used, Commands Count, etc.
 twitter: "majonezexe", // Twitter username
 github: "igorkowalczyk", // Github repository owner
 github_repo: "majo.exe", // Github repository
 about_bot: "... Soon!", // About Bot
 about_dev: "... Soon!", // About Bot Developer
 donation_perks: "", // Sponsors perks
 patreon: "igorkowalczyk", // Sponsor link
 ko_fi: "igorkowalczyk", // Sponsor link
 buymeacoffee: "rkjha", // Sponsor link
 open_collective: "igorkowalczyk", // Sponsor link
 scopes: "bot%20applications.commands", // Dashboard scopes
 permissions: "4294967287", // Default invite perms
 suggestions_channel: "838092194530852884", // Suggestions channel
 prefix: process.env.PREFIX, // Client prefix (deprecated)
 youtube: process.env.YOUTUBE, // Youtube token (not used)
 id: process.env.ID, // Discord Client prefix
 advanved_logging: false, // Show debug info
 ratelimit: 2500, // Command ratelimit (can be customized for each command) [DEPRECATED]
 max_input: 200, // Maximum command arguments length [DEPRECATED]

 // Dashboard config
 domain: process.env.DOMAIN, // Domain link
 port: process.env.PORT, // Website & API Port

 use_text_commands: true, // Allow usage of deprecated text commands [WIP]
};
