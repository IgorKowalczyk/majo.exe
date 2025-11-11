import type { Snowflake, APIAutoModerationAction } from "discord-api-types/v10";

export interface AutoModerationRuleCreationData {
  id: Snowflake;
  enabled: boolean;
  exemptRoles: Snowflake[];
  exemptChannels: Snowflake[];
  actions: APIAutoModerationAction[];
  limit?: number;
}
