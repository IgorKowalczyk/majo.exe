import { OAuth2Scopes, PermissionFlagsBits } from "discord-api-types/v10";

// Discord permissions array. See https://discord.com/developers/docs/topics/permissions#permissions-bitwise-permission-flags
const permissions = [
  // prettier
  PermissionFlagsBits.ViewChannel,
  PermissionFlagsBits.ManageChannels,
  PermissionFlagsBits.ManageRoles,
  PermissionFlagsBits.ManageGuildExpressions,
  PermissionFlagsBits.ManageGuild,
  PermissionFlagsBits.ChangeNickname,
  PermissionFlagsBits.ManageNicknames,
  PermissionFlagsBits.CreateInstantInvite,
  PermissionFlagsBits.KickMembers,
  PermissionFlagsBits.BanMembers,
  PermissionFlagsBits.SendMessages,
  PermissionFlagsBits.SendMessagesInThreads,
  PermissionFlagsBits.ManageMessages,
  PermissionFlagsBits.EmbedLinks,
  PermissionFlagsBits.AttachFiles,
  PermissionFlagsBits.AddReactions,
  PermissionFlagsBits.UseExternalEmojis,
  PermissionFlagsBits.MentionEveryone,
];

const flagsBitsNumber = permissions.reduce((accumulator, currentValue) => accumulator | currentValue).toString();

export const globalPermissions = {
  permissions: flagsBitsNumber, // string. Discord permissions array defined above using discord-api-types/v10
  scopes: [OAuth2Scopes.ApplicationsCommands, OAuth2Scopes.Bot].join("%20"), // string. Discord OAUTH2 scopes. See https://discord.com/developers/docs/topics/oauth2#shared-resources-oauth2-scopes
};
