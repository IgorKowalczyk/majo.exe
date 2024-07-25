import { ActivityType, PresenceUpdateStatus } from "discord-api-types/v10";

const config = {};

config.presence = {
 status: PresenceUpdateStatus.Online, // PresenceUpdateStatus. Can be: "Online", "Idle", "DoNotDisturb", "Invisible" or "Offline" (Invisible and Offline are the same)
 activity: {
  // name: "?", // string. Activity name [not required when using custom type (4)
  state: "🌸 Your servers one and only", // string. Activity state [required when using custom type (4)]
  type: ActivityType.Custom, // ActivityType. Activity type. Can be: "Playing", "Streaming", "Listening", "Watching", "Custom"

  /* Example: Using type 3 (Watching) with custom name
   name: "the world burn", // Note: Name is required when not using custom type (4)!
   type: ActivityType.Watching,
  */
 },
};

/*
  Donation links
 */
config.donate = {
 enabled: true, // boolean. Display donations command
 links: [
  {
   name: "Github Sponsors",
   url: "https://github.com/sponsors/tsukiyodevs",
   icon: "<:github:1265997148907110400>",
  },
  {
    name: "Ko-Fi",
    url: "https://ko-fi.com/tsukiyodev",
    icon: "<:kofi:1265997485675905034>",
   },
 ],
};

/*
  Bot emojis
 */
config.emojis = {
 // Categories emoji
 categories: [
  {
   name: "general",
   emoji: "🚀",
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
   emoji: "🌟",
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
 ],

 // Log types
 logs: [
  {
   type: "profanity",
   emoji: "🤬",
  },
  {
   type: "embed_color",
   emoji: "🎨",
  },
  {
   type: "command_change",
   emoji: "<:slash_commands:963333541565968384>",
  },
  {
   type: "category_change",
   emoji: "📂",
  },
  {
   type: "public_dashboard",
   emoji: "🔗",
  },
  {
   type: "vanity",
   emoji: "🔗",
  },
 ],

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
};

export const botConfig = config;
