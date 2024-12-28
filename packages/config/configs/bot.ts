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
    category: "Invite",
    types: [
     {
      type: "InviteCreate",
      emoji: "✉️",
      description: "Triggered when an invite is created.",
     },
     {
      type: "InviteDelete",
      emoji: "❌",
      description: "Triggered when an invite is deleted.",
     },
    ],
   },
   {
    category: "Message",
    types: [
     {
      type: "MessageBulkDelete",
      emoji: "🗑️",
      description: "Triggered when multiple messages are deleted at once.",
     },
     {
      type: "MessageCreate",
      emoji: "💬",
      description: "Triggered when a message is created.",
     },
     {
      type: "MessageDelete",
      emoji: "🗑️",
      description: "Triggered when a message is deleted.",
     },
     {
      type: "MessagePollVoteAdd",
      emoji: "🗳️",
      description: "Triggered when a poll vote is added.",
     },
     {
      type: "MessagePollVoteRemove",
      emoji: "🗳️",
      description: "Triggered when a poll vote is removed.",
     },
     {
      type: "MessageUpdate",
      emoji: "✏️",
      description: "Triggered when a message is updated.",
     },
    ],
   },
   {
    category: "Thread",
    types: [
     {
      type: "ThreadCreate",
      emoji: "🆕",
      description: "Triggered when a thread is created.",
     },
     {
      type: "ThreadDelete",
      emoji: "🗑️",
      description: "Triggered when a thread is deleted.",
     },
     {
      type: "ThreadMembersUpdate",
      emoji: "👥",
      description: "Triggered when members are added or removed from a thread.",
     },
     {
      type: "ThreadMemberUpdate",
      emoji: "👤",
      description: "Triggered when a thread member is updated.",
     },
     {
      type: "ThreadUpdate",
      emoji: "✏️",
      description: "Triggered when a thread is updated.",
     },
    ],
   },
   {
    category: "Guild",
    types: [
     {
      type: "GuildUpdate",
      emoji: "✏️",
      description: "Triggered when a guild is updated.",
     },
     {
      type: "GuildMemberUpdate",
      emoji: "👤",
      description: "Triggered when a guild member is updated.",
     },
     {
      type: "GuildRoleCreate",
      emoji: "➕",
      description: "Triggered when a guild role is created.",
     },
     {
      type: "GuildRoleDelete",
      emoji: "❌",
      description: "Triggered when a guild role is deleted.",
     },
     {
      type: "GuildRoleUpdate",
      emoji: "✏️",
      description: "Triggered when a guild role is updated.",
     },
     {
      type: "GuildScheduledEventCreate",
      emoji: "📅",
      description: "Triggered when a guild scheduled event is created.",
     },
     {
      type: "GuildScheduledEventDelete",
      emoji: "📅",
      description: "Triggered when a guild scheduled event is deleted.",
     },
     {
      type: "GuildScheduledEventUpdate",
      emoji: "📅",
      description: "Triggered when a guild scheduled event is updated.",
     },
     {
      type: "GuildScheduledEventUserAdd",
      emoji: "👤",
      description: "Triggered when a user is added to a guild scheduled event.",
     },
     {
      type: "GuildScheduledEventUserRemove",
      emoji: "👤",
      description: "Triggered when a user is removed from a guild scheduled event.",
     },
     {
      type: "GuildStickerCreate",
      emoji: "🆕",
      description: "Triggered when a guild sticker is created.",
     },
     {
      type: "GuildStickerDelete",
      emoji: "❌",
      description: "Triggered when a guild sticker is deleted.",
     },
     {
      type: "GuildStickerUpdate",
      emoji: "✏️",
      description: "Triggered when a guild sticker is updated.",
     },
     {
      type: "GuildEmojiCreate",
      emoji: "🆕",
      description: "Triggered when a guild emoji is created.",
     },
     {
      type: "GuildEmojiDelete",
      emoji: "❌",
      description: "Triggered when a guild emoji is deleted.",
     },
     {
      type: "GuildEmojiUpdate",
      emoji: "✏️",
      description: "Triggered when a guild emoji is updated.",
     },
     {
      type: "GuildIntegrationsUpdate",
      emoji: "🔄",
      description: "Triggered when a guild integration is updated.",
     },
     {
      type: "GuildMemberAdd",
      emoji: "👤",
      description: "Triggered when a new member joins the guild.",
     },
     {
      type: "GuildMemberRemove",
      emoji: "👤",
      description: "Triggered when a member leaves the guild.",
     },
     {
      type: "GuildBanAdd",
      emoji: "🔨",
      description: "Triggered when a member is banned from the guild.",
     },
     {
      type: "GuildBanRemove",
      emoji: "🔓",
      description: "Triggered when a member is unbanned from the guild.",
     },
    ],
   },
   {
    category: "Channel",
    types: [
     {
      type: "ChannelCreate",
      emoji: "🆕",
      description: "Triggered when a channel is created.",
     },
     {
      type: "ChannelDelete",
      emoji: "❌",
      description: "Triggered when a channel is deleted.",
     },
     {
      type: "ChannelPinsUpdate",
      emoji: "📌",
      description: "Triggered when a channel's pins are updated.",
     },
     {
      type: "ChannelUpdate",
      emoji: "✏️",
      description: "Triggered when a channel is updated.",
     },
    ],
   },
   {
    category: "AutoModeration",
    types: [
     {
      type: "AutoModerationActionExecution",
      emoji: "🛠️",
      description: "Triggered when an auto-moderation action is executed.",
     },
     {
      type: "AutoModerationRuleCreate",
      emoji: "🆕",
      description: "Triggered when an auto-moderation rule is created.",
     },
     {
      type: "AutoModerationRuleDelete",
      emoji: "❌",
      description: "Triggered when an auto-moderation rule is deleted.",
     },
     {
      type: "AutoModerationRuleUpdate",
      emoji: "✏️",
      description: "Triggered when an auto-moderation rule is updated.",
     },
    ],
   },
   {
    category: "Miscellaneous",
    types: [
     {
      type: "PublicDashboardUpdate",
      emoji: "🔗",
      description: "Triggered when the public dashboard is updated.",
     },
     {
      type: "VanityUpdate",
      emoji: "🔗",
      description: "Triggered when the vanity URL is updated.",
     },
     {
      type: "EmbedColorUpdate",
      emoji: "🎨",
      description: "Triggered when the embed color is updated.",
     },
     {
      type: "CommandCategoryEnable",
      emoji: "✅",
      description: "Triggered when a command category is enabled.",
     },
     {
      type: "CommandCategoryDisable",
      emoji: "❌",
      description: "Triggered when a command category is disabled.",
     },
     {
      type: "CommandEnable",
      emoji: "✅",
      description: "Triggered when a command is enabled.",
     },
     {
      type: "CommandDisable",
      emoji: "❌",
      description: "Triggered when a command is disabled.",
     },
     {
      type: "GiveawayCreate",
      emoji: "🎉",
      description: "Triggered when a giveaway is created.",
     },
     {
      type: "GiveawayDelete",
      emoji: "❌",
      description: "Triggered when a giveaway is deleted.",
     },
     {
      type: "GiveawayEdit",
      emoji: "✏️",
      description: "Triggered when a giveaway is edited.",
     },
     {
      type: "GiveawayPaused",
      emoji: "⏸️",
      description: "Triggered when a giveaway is paused.",
     },
     {
      type: "GiveawayResumed",
      emoji: "▶️",
      description: "Triggered when a giveaway is resumed.",
     },
     {
      type: "GiveawayEnded",
      emoji: "🏁",
      description: "Triggered when a giveaway ends.",
     },
     {
      type: "WelcomeMessageEnable",
      emoji: "👋",
      description: "Triggered when the welcome message is enabled.",
     },
     {
      type: "WelcomeMessageDisable",
      emoji: "❌",
      description: "Triggered when the welcome message is disabled.",
     },
     {
      type: "LeaveMessageEnable",
      emoji: "👋",
      description: "Triggered when the leave message is enabled.",
     },
     {
      type: "LeaveMessageDisable",
      emoji: "❌",
      description: "Triggered when the leave message is disabled.",
     },
     {
      type: "ReputationUpdate",
      emoji: "⭐",
      description: "Triggered when a user's reputation is updated.",
     },
     {
      type: "WarnCreate",
      emoji: "⚠️",
      description: "Triggered when a warning is created.",
     },
     {
      type: "WarnDelete",
      emoji: "⚠️",
      description: "Triggered when a warning is deleted.",
     },
     {
      type: "WarnUpdate",
      emoji: "⚠️",
      description: "Triggered when a warning is updated.",
     },
     {
      type: "Unknown",
      emoji: "❓",
      description: "Triggered when an unknown event occurs.",
     },
    ],
   },
  ] satisfies { category: string; types: { type: string; emoji: string; description: string }[] }[],
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
