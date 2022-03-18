module.exports = {
 show_errors_on_no_command: true, // Show errors when no command was found. Example: {prefix} help -> output | {prefix} no_command -> nothing [DEPRECATED]
 help_embed: {
  grid: true, // Use grid for fields in help command embed
  display_news: false,
  news: "Are you looking for cheap, fast and reliable hosting? [Terohost](https://terohost.com/) is perfect for you! Plans start at $1/mo! Go to [terohost.com](https://terohost.com/) and order your dream server today!",
  news_title: "<:terohost:881846121201291284> Terohost",
  show_owner_commands: false, // Show commands for owner(s) [only when commmand was used by owner]
  show_commands_list: true, // Show commands list in help embed
 },
 intents: {
  all: true,
  issues: false,
 },
 ignored_events: ["guildCreate", "guildDelete", "guildMemberAdd", "guildMemberRemove", "interactionCreate", "messageCreate"], // Ignore this events in dashboard settings
};
