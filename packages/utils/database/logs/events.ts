import { GuildLogType } from "@majoexe/database";

export const ExcludedEvents: GuildLogType[] = [
 GuildLogType.MessageCreate,
 GuildLogType.GuildMemberAdd,
 GuildLogType.GuildMemberRemove,

 // Custom are also excluded
 GuildLogType.PublicDashboardUpdate,
 GuildLogType.VanityUpdate,
 GuildLogType.EmbedColorUpdate,
 GuildLogType.CommandCategoryEnable,
 GuildLogType.CommandCategoryDisable,
 GuildLogType.CommandEnable,
 GuildLogType.CommandDisable,

 GuildLogType.GiveawayCreate,
 GuildLogType.GiveawayDelete,
 GuildLogType.GiveawayEdit,
 GuildLogType.GiveawayPaused,
 GuildLogType.GiveawayResumed,
 GuildLogType.GiveawayEnded,

 GuildLogType.WelcomeMessageEnable,
 GuildLogType.WelcomeMessageDisable,

 GuildLogType.LeaveMessageEnable,
 GuildLogType.LeaveMessageDisable,

 GuildLogType.ReputationUpdate,

 GuildLogType.WarnCreate,
 GuildLogType.WarnDelete,
 GuildLogType.WarnUpdate,

 GuildLogType.Unknown,
];
