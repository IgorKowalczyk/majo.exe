/*
  Warnings:

  - The values [MessagePollVoteAdd,MessagePollVoteRemove] on the enum `GuildLogType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "GuildLogType_new" AS ENUM ('InviteCreate', 'InviteDelete', 'MessageCreate', 'MessageBulkDelete', 'MessageDelete', 'MessageUpdate', 'ThreadCreate', 'ThreadDelete', 'ThreadMembersUpdate', 'ThreadMemberUpdate', 'ThreadUpdate', 'GuildUpdate', 'GuildMemberUpdate', 'GuildMemberAdd', 'GuildMemberRemove', 'GuildIntegrationsUpdate', 'GuildRoleCreate', 'GuildRoleDelete', 'GuildRoleUpdate', 'GuildScheduledEventCreate', 'GuildScheduledEventDelete', 'GuildScheduledEventUpdate', 'GuildScheduledEventUserAdd', 'GuildScheduledEventUserRemove', 'GuildStickerCreate', 'GuildStickerDelete', 'GuildStickerUpdate', 'GuildEmojiCreate', 'GuildEmojiDelete', 'GuildEmojiUpdate', 'GuildBanAdd', 'GuildBanRemove', 'ChannelCreate', 'ChannelDelete', 'ChannelPinsUpdate', 'ChannelUpdate', 'AutoModerationActionExecution', 'AutoModerationRuleCreate', 'AutoModerationRuleDelete', 'AutoModerationRuleUpdate', 'PublicDashboardUpdate', 'VanityUpdate', 'EmbedColorUpdate', 'CommandCategoryEnable', 'CommandCategoryDisable', 'CommandEnable', 'CommandDisable', 'LogUpdate', 'GiveawayCreate', 'GiveawayDelete', 'GiveawayEdit', 'GiveawayPaused', 'GiveawayResumed', 'GiveawayEnded', 'WelcomeMessageEnable', 'WelcomeMessageDisable', 'LeaveMessageEnable', 'LeaveMessageDisable', 'ReputationUpdate', 'WarnCreate', 'WarnDelete', 'WarnUpdate', 'Unknown');
ALTER TABLE "guild_logs" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "guild_logs_settings" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "guild_logs_settings" ALTER COLUMN "type" TYPE "GuildLogType_new" USING ("type"::text::"GuildLogType_new");
ALTER TABLE "guild_logs" ALTER COLUMN "type" TYPE "GuildLogType_new" USING ("type"::text::"GuildLogType_new");
ALTER TYPE "GuildLogType" RENAME TO "GuildLogType_old";
ALTER TYPE "GuildLogType_new" RENAME TO "GuildLogType";
DROP TYPE "GuildLogType_old";
ALTER TABLE "guild_logs" ALTER COLUMN "type" SET DEFAULT 'Unknown';
ALTER TABLE "guild_logs_settings" ALTER COLUMN "type" SET DEFAULT 'Unknown';
COMMIT;
