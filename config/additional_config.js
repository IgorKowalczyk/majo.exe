module.exports = {
 use_mysql: true, // WIP
 pm2: {
  // Send app statistics to PM2 Dashboard [only works if the application has been started with pm2 and pm2 is linked to the panel]
  enabled: true, // boolean
  metrics: {
   messages_seen: true, // Boolean. Counter for all messages seen by bot DEPRECATED
   commands_used: true, // Boolean. Counter for all commands requested DEPRECATED
   slash_commands_used: true, // Boolean. Counter for all slash commands requested
   ws_ping: true, // Boolean. Meter for client ping
   users_count: true, // Boolean. Counter for all users seen by bot
   guilds_count: true, // Boolean. Counter for all bot guilds
  },
 },
 show_errors_on_no_command: true, // Show errors when no command was found. Example: {prefix} help -> output | {prefix} no_command -> nothing DEPRECATED
 rickroll: false, // Secret option ;>
 display_status: "online", // online | idle | invisible | dnd
 help_embed: {
  grid: true, // Use grid for fields in help command embed
  display_news: false,
  news: "Are you looking for cheap, fast and reliable hosting? [Terohost](https://terohost.com/) is perfect for you! Plans start at $1/mo! Go to [terohost.com](https://terohost.com/) and order your dream server today!",
  news_title: "<:terohost:881846121201291284> Terohost",
  show_owner_commands: false, // Show commands for owner(s) [only when commmand was used by owner]
  show_commands_list: true, // Show commands list in help embed
 },
 intents: {
  // Experimental function [WIP]
  all: false,
  problems: true,
 },
};
