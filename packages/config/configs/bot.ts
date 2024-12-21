import { ActivityType, PresenceUpdateStatus } from "discord-api-types/v10";

const config = {
 presence: {
  status: PresenceUpdateStatus.Online, // PresenceUpdateStatus. Can be: "Online", "Idle", "DoNotDisturb", "Invisible" or "Offline" (Invisible and Offline are the same)
  activity: {
   // name: "?", // string. Activity name [not required when using custom type (4)
   state: "🔥 Type /help to get started!", // string. Activity state [required when using custom type (4)]
   type: ActivityType.Custom, // ActivityType. Activity type. Can be: "Playing", "Streaming", "Listening", "Watching", "Custom"

   /* Example: Using type 3 (Watching) with custom name
   name: "the world burn", // Note: Name is required when not using custom type (4)!
   type: ActivityType.Watching,
  */
  },
 },

 /*
  Donation links
 */
 donate: {
  enabled: true, // boolean. Display donations command
  links: [
   {
    name: "Github Sponsors",
    url: "https://github.com/sponsors/igorkowalczyk",
    icon: "🔗",
   },
  ] satisfies { name: string; url: string; icon: string }[],
 },

 /*
  Bot emojis
 */
 emojis: {
  // Categories emoji
  categories: [
   {
    name: "general",
    emoji: "🧱",
   },
   {
    name: "moderation",
    emoji: "🛠️",
   },
   {
    name: "fun",
    emoji: "😆",
   },
   {
    name: "utility",
    emoji: "🔧",
   },
   {
    name: "levels",
    emoji: "📈",
   },
   {
    name: "reputation",
    emoji: "👍",
   },
   {
    name: "image",
    emoji: "🖼️",
   },
   {
    name: "giveaway",
    emoji: "🎉",
   },
   {
    name: "ticket",
    emoji: "🎫",
   },
   {
    name: "reaction",
    emoji: "🎭",
   },
  ] satisfies { name: string; emoji: string }[],

  // Log types
  logs: [
   {
    type: "InviteCreate",
    emoji: "✉️",
   },
   {
    type: "InviteDelete",
    emoji: "❌",
   },
   {
    type: "MessageBulkDelete",
    emoji: "🗑️",
   },
   {
    type: "MessageCreate",
    emoji: "💬",
   },
   {
    type: "MessageDelete",
    emoji: "🗑️",
   },
   {
    type: "MessagePollVoteAdd",
    emoji: "🗳️",
   },
   {
    type: "MessagePollVoteRemove",
    emoji: "🗳️",
   },
   {
    type: "MessageUpdate",
    emoji: "✏️",
   },
   {
    type: "ThreadCreate",
    emoji: "🆕",
   },
   {
    type: "ThreadDelete",
    emoji: "🗑️",
   },
   {
    type: "ThreadMembersUpdate",
    emoji: "👥",
   },
   {
    type: "ThreadMemberUpdate",
    emoji: "👤",
   },
   {
    type: "ThreadUpdate",
    emoji: "✏️",
   },
   {
    type: "GuildUpdate",
    emoji: "✏️",
   },
   {
    type: "GuildMemberUpdate",
    emoji: "👤",
   },
   {
    type: "GuildRoleCreate",
    emoji: "➕",
   },
   {
    type: "GuildRoleDelete",
    emoji: "❌",
   },
   {
    type: "GuildRoleUpdate",
    emoji: "✏️",
   },
   {
    type: "GuildScheduledEventCreate",
    emoji: "📅",
   },
   {
    type: "GuildScheduledEventDelete",
    emoji: "📅",
   },
   {
    type: "GuildScheduledEventUpdate",
    emoji: "📅",
   },
   {
    type: "GuildScheduledEventUserAdd",
    emoji: "👤",
   },
   {
    type: "GuildScheduledEventUserRemove",
    emoji: "👤",
   },
   {
    type: "GuildStickerCreate",
    emoji: "🆕",
   },
   {
    type: "GuildStickerDelete",
    emoji: "❌",
   },
   {
    type: "GuildStickerUpdate",
    emoji: "✏️",
   },
   {
    type: "GuildEmojiCreate",
    emoji: "🆕",
   },
   {
    type: "GuildEmojiDelete",
    emoji: "❌",
   },
   {
    type: "GuildEmojiUpdate",
    emoji: "✏️",
   },
   {
    type: "GuildIntegrationsUpdate",
    emoji: "🔄",
   },
   {
    type: "GuildMemberAdd",
    emoji: "👤",
   },

   {
    type: "GuildMemberRemove",
    emoji: "👤",
   },
   {
    type: "GuildBanAdd",
    emoji: "🔨",
   },
   {
    type: "GuildBanRemove",
    emoji: "🔓",
   },
   {
    type: "ChannelCreate",
    emoji: "🆕",
   },
   {
    type: "ChannelDelete",
    emoji: "❌",
   },
   {
    type: "ChannelPinsUpdate",
    emoji: "📌",
   },
   {
    type: "ChannelUpdate",
    emoji: "✏️",
   },
   {
    type: "AutoModerationActionExecution",
    emoji: "🛠️",
   },
   {
    type: "AutoModerationRuleCreate",
    emoji: "🆕",
   },
   {
    type: "AutoModerationRuleDelete",
    emoji: "❌",
   },
   {
    type: "AutoModerationRuleUpdate",
    emoji: "✏️",
   },
   {
    type: "PublicDashboardUpdate",
    emoji: "🔗",
   },
   {
    type: "VanityUpdate",
    emoji: "🔗",
   },
   {
    type: "EmbedColorUpdate",
    emoji: "🎨",
   },
   {
    type: "CommandCategoryEnable",
    emoji: "✅",
   },
   {
    type: "CommandCategoryDisable",
    emoji: "❌",
   },
   {
    type: "CommandEnable",
    emoji: "✅",
   },
   {
    type: "CommandDisable",
    emoji: "❌",
   },
   {
    type: "GiveawayCreate",
    emoji: "🎉",
   },
   {
    type: "GiveawayDelete",
    emoji: "❌",
   },
   {
    type: "GiveawayEdit",
    emoji: "✏️",
   },
   {
    type: "GiveawayPaused",
    emoji: "⏸️",
   },
   {
    type: "GiveawayResumed",
    emoji: "▶️",
   },
   {
    type: "GiveawayEnded",
    emoji: "🏁",
   },
   {
    type: "WelcomeMessageEnable",
    emoji: "👋",
   },
   {
    type: "WelcomeMessageDisable",
    emoji: "❌",
   },
   {
    type: "LeaveMessageEnable",
    emoji: "👋",
   },
   {
    type: "LeaveMessageDisable",
    emoji: "👋",
   },
   {
    type: "ReputationUpdate",
    emoji: "⭐",
   },
   {
    type: "WarnCreate",
    emoji: "⚠️",
   },
   {
    type: "WarnDelete",
    emoji: "⚠️",
   },
   {
    type: "WarnUpdate",
    emoji: "⚠️",
   },
   {
    type: "Unknown",
    emoji: "❓",
   },
  ] satisfies { type: string; emoji: string }[],
  // Utility emojis
  picture_frame: "🖼️",
  anger: "💢",
  like: "👍",
  dislike: "👎",
  grin: "😁",
  pleading_face: "🥺",
  angry: "😡",
  rage: "🤬",
  drooling_face: "🤤",
  smirk: "😏",
  game_dice: "🎲",
  coin: "🪙",
  sparkles: "✨",
  earth: "🌎",
  clock: "⏰",
  search_glass: "🔍",
  chan: "🍀",
  edit: "📝",
  chat: "💬",
  sadness: "😢",
  flag_gb: ":flag_gb:",
  flag_jp: ":flag_jp:",
  book: "📚",
  counting: "🔢",
  star2: "🌟",
  calendar_spillar: "🗓️",
  star: "⭐",
  barchart: "📊",
  link: "🔗",
  tada: "🎉",
  brain: "🧠",
  magic_ball: "🔮",
  reverse_motherfucker: "↕️",
  reverse_nr_2_motherfucker: "🔀",
  light_bulb: "💡",
  broken_heart: "💔",
  heart: "❤️",
  flushed: "😳",
  facepalm: "🤦",
  sneeze: "🤧",
  input: "📥",
  output: "📤",
  bird: "🐦",
  cat: "🐱",
  koala: "🐨",
  panda: "🐼",
  wink: "😉",
  wastebasket: "🗑️",
  page: "📄",
  ping: "🏓",
  uptime: "⏳",
  package: "📦",
  optical_disk: "💿",
  muscule: "💪",
  stopwatch: "⏱️",
  octo: "🐙",
  rocket: "🚀",
  thinking: "🤔",
  question: "❔",
  tools: "🧰",
  money: "💰",
  music: "🎶",
  rofl: "😆",
  hammer: "🔨",
  bricks: "🧱",
  screw_that: "🔩",
  sign: "🪧",
  lyrics: "📑",
  pause: "⏸️",
  play: "▶",
  skip: "⏭️",
  volume: "🔉",
  pen: "🖊️",
  capital: "🏛️",
  location: "📍",
  currency: "💱",
  globe: "🌐",
  tongue: "👅",
  clap: "👏",
  lock: "🔐",
  game_controller: "🎮",
  weather: "🌤️",
  temperature: "🌡️",
  hot: "🥵",
  tornado: "🌪️",
  humidity: "💦",
  ruler: "📏",
  email: "📧",
  paper_clip: "📎",
  paper_clips: "🖇️",
  flower: "💮",
  arrows_clockwise: "🔃",
  jigsaw: "🧩",
  wave: "👋",
  color: "🎨",
 },
};

export const botConfig = config;
