import { type GuildLogType } from "@majoexe/database";

export const ExcludedEvents: GuildLogType[] = [
 "MessageCreate",
 "MessageReactionAdd",
 "MessageReactionRemove",
 "MessageReactionRemoveAll",
 "MessageReactionRemoveEmoji",
 "GuildMemberAvailable",
 "GuildMemberRemove",
 "GuildMemberUpdate",
 "GuildUnavailable",

 // Custom are also excluded
 "PublicDashboardUpdate",
 "VanityUpdate",
 "EmbedColorUpdate",
 "CommandCategoryEnable",
 "CommandCategoryDisable",
 "CommandEnable",
 "CommandDisable",

 "GiveawayCreate",
 "GiveawayDelete",
 "GiveawayEdit",
 "GiveawayPaused",
 "GiveawayResumed",
 "GiveawayEnded",

 "WelcomeMessageEnable",
 "WelcomeMessageDisable",

 "LeaveMessageEnable",
 "LeaveMessageDisable",

 "ReputationUpdate",

 "WarnCreate",
 "WarnDelete",
 "WarnUpdate",

 "Unknown",
];
