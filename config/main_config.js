module.exports = {
 // Main config
 // author: "Majonez.exe#3957", // ->> Banned account
 author: "Majonez.exe#2495", // Bot owner
 author_website: "https://igorkowalczyk.github.io", // Owner website
 // owner_id: "440200028292907048", // ->> Banned account
 owner_id: "544164729354977282", // Owner ID
 description: "Majo.exe - Discord bot for Fun, Memes, Images, Giveaway, Economy, Anime and NSFW! Majo serve over 100 commands!", // Bot description
 support_server: "https://discord.gg/bVNNHuQ", // Support server invite
 support_server_id: "666599184844980224", // Support server ID
 status: "https://bit.ly/majo-status", // Status page link
 status_page: {
  only_link: false, // Display only link to external status page
  embed: "https://wl.hetrixtools.com/r/b327a38f4c3d4cdb1068dfe61e1b2144/", // External status page link
 },
 default_database: process.env.DEFAULT_DB, // Default Database [mysql | mongo] [WIP!]
 use_text_commands: true, // Allow usage of deprecated text commands [WIP]
 twitter: "@majonezexe", // Owner twitter
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
 certs: false, // SSL Certs
 localhost: false, // Localhost (redirects from https to http)
 secure_connection: true, // Redirect from http to https
 mysql_errors: false, // Show mysql errors
 privacy_policy_page: true, // Enable privacy policy page
 terms_of_service_page: true, // Enable TOS page
 google_analitics: process.env.ANALYTICS, // Google Analytics ID
 client_secret: process.env.SECRET, // Discord Client secret
 port: process.env.PORT, // Website & API Port
 session_secret: process.env.SESSION_SECRET, // Session Secret (Auto Generated)
 verification: "-wuCsk4qLolXEPSUTGX7YBxywcyNNf5HS2ClzgEWxNY", // Google site verification token
 arc_token: "oFnnmBwr", // Arc.io token
};
