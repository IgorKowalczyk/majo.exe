import { GuildLogType } from "@majoexe/database/types";

/**
 * Events that can't be triggered by Discord.js
 */
export const CustomEvents: GuildLogType[] = [
 // prettier
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

 GuildLogType.LogUpdate,

 GuildLogType.Unknown,
];

/**
 * Events that can't be enabled/disabled by the dashboard
 */
export const ExcludedEvents: GuildLogType[] = [
 // prettier
 GuildLogType.MessageCreate,

 GuildLogType.GuildMemberAdd,
 GuildLogType.GuildMemberRemove,

 // WORK IN PROGRESS
 GuildLogType.AutoModerationActionExecution,
 GuildLogType.AutoModerationRuleCreate,
 GuildLogType.AutoModerationRuleDelete,
 GuildLogType.AutoModerationRuleUpdate,

 GuildLogType.GuildScheduledEventCreate,
 GuildLogType.GuildScheduledEventDelete,
 GuildLogType.GuildScheduledEventUpdate,
 GuildLogType.GuildScheduledEventUserAdd,
 GuildLogType.GuildScheduledEventUserRemove,

 GuildLogType.ThreadCreate,
 GuildLogType.ThreadDelete,
 GuildLogType.ThreadMembersUpdate,
 GuildLogType.ThreadMemberUpdate,
 GuildLogType.ThreadUpdate,
 // -------------------

 // Exclude custom events
 ...CustomEvents,
];
