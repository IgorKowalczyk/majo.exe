/*
  Warnings:

  - The `type` column on the `guild_logs` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "GuildLogType" AS ENUM ('InviteCreate', 'InviteDelete', 'MessageBulkDelete', 'MessageCreate', 'MessageDelete', 'MessagePollVoteAdd', 'MessagePollVoteRemove', 'MessageReactionAdd', 'MessageReactionRemove', 'MessageReactionRemoveAll', 'MessageReactionRemoveEmoji', 'MessageUpdate', 'ThreadCreate', 'ThreadDelete', 'ThreadListSync', 'ThreadMembersUpdate', 'ThreadMemberUpdate', 'ThreadUpdate', 'GuildUpdate', 'GuildMemberUpdate', 'GuildRoleCreate', 'GuildRoleDelete', 'GuildRoleUpdate', 'GuildScheduledEventCreate', 'GuildScheduledEventDelete', 'GuildScheduledEventUpdate', 'GuildScheduledEventUserAdd', 'GuildScheduledEventUserRemove', 'GuildStickerCreate', 'GuildStickerDelete', 'GuildStickerUpdate', 'GuildUnavailable', 'GuildEmojiCreate', 'GuildEmojiDelete', 'GuildEmojiUpdate', 'GuildIntegrationsUpdate', 'GuildMemberAdd', 'GuildMemberAvailable', 'GuildMemberRemove', 'GuildBanAdd', 'GuildBanRemove', 'ChannelCreate', 'ChannelDelete', 'ChannelPinsUpdate', 'ChannelUpdate', 'AutoModerationActionExecution', 'AutoModerationRuleCreate', 'AutoModerationRuleDelete', 'AutoModerationRuleUpdate', 'PublicDashboardUpdate', 'EmbedColorUpdate', 'CommandCategoryEnable', 'CommandCategoryDisable', 'CommandEnable', 'CommandDisable', 'GiveawayCreate', 'GiveawayDelete', 'GiveawayEdit', 'WelcomeMessageEnable', 'WelcomeMessageDisable', 'LeaveMessageEnable', 'LeaveMessageDisable', 'ReputationUpdate', 'WarnCreate', 'WarnDelete', 'WarnUpdate', 'Unknown');

-- AlterTable
ALTER TABLE "guild_logs" ADD COLUMN     "data" JSONB NOT NULL DEFAULT '{}',
DROP COLUMN "type",
ADD COLUMN     "type" "GuildLogType" NOT NULL DEFAULT 'Unknown';
