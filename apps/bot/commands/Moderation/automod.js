/* eslint-disable complexity */

import { syncAutoModRule } from "@majoexe/util/database";
import { ApplicationCommandType, ChannelType, ApplicationCommandOptionType, PermissionsBitField } from "discord.js";
import { disableAntiInvite } from "../../util/moderation/automod/antiInvite/disable.js";
import { enableAntiInvite } from "../../util/moderation/automod/antiInvite/enable.js";
import { disableAntiLink } from "../../util/moderation/automod/antiLinks/disable.js";
import { enableAntiLink } from "../../util/moderation/automod/antiLinks/enable.js";

export default {
 name: "automod",
 description: "Configure Automoderation for your server",
 type: ApplicationCommandType.ChatInput,
 cooldown: 5000,
 dm_permission: false,
 usage: "/automod <command>",
 options: [
  {
   name: "anti-invite",
   description: "Enable/Disable the anti-invite system",
   type: ApplicationCommandOptionType.Subcommand,
   options: [
    {
     name: "enable",
     description: "Enable the anti-invite system",
     type: ApplicationCommandOptionType.Boolean,
     required: true,
    },
    {
     name: "exempt-roles",
     description: "Exempt roles from the anti-invite system",
     type: ApplicationCommandOptionType.Role,
     required: false,
    },
    {
     name: "exempt-channels",
     description: "Exempt channels from the anti-invite system",
     type: ApplicationCommandOptionType.Channel,
     channelTypes: [ChannelType.GuildText, ChannelType.GuildCategory],
     required: false,
    },
    {
     name: "timeout",
     description: "The timeout for the anti-invite system",
     type: ApplicationCommandOptionType.Integer,
     required: false,
     maxValue: 120,
     minValue: 5,
    },
    {
     name: "log-channel",
     description: "The log channel for the anti-invite system",
     type: ApplicationCommandOptionType.Channel,
     channelTypes: [ChannelType.GuildText],
     required: false,
    },
   ],
  },
  {
   name: "anti-link",
   description: "Enable/Disable the anti-link system",
   type: ApplicationCommandOptionType.Subcommand,
   options: [
    {
     name: "enable",
     description: "Enable the anti-link system",
     type: ApplicationCommandOptionType.Boolean,
     required: true,
    },
    {
     name: "exempt-roles",
     description: "Exempt roles from the anti-link system",
     type: ApplicationCommandOptionType.Role,
     required: false,
    },
    {
     name: "exempt-channels",
     description: "Exempt channels from the anti-link system",
     type: ApplicationCommandOptionType.Channel,
     channelTypes: [ChannelType.GuildText, ChannelType.GuildCategory],
     required: false,
    },
    {
     name: "timeout",
     description: "The timeout for the anti-link system",
     type: ApplicationCommandOptionType.Integer,
     required: false,
     maxValue: 120,
     minValue: 5,
    },
    {
     name: "log-channel",
     description: "The log channel for the anti-link system",
     type: ApplicationCommandOptionType.Channel,
     channelTypes: [ChannelType.GuildText],
     required: false,
    },
   ],
  },
 ],
 permissions: [PermissionsBitField.Administrator],
 run: async (client, interaction, guildSettings) => {
  try {
   const subcommand = interaction.options.getSubcommand();

   if (subcommand === "anti-invite") {
    const enable = interaction.options.getBoolean("enable");
    const exemptRoles = interaction.options.getRole("exempt-roles");
    const exemptChannels = interaction.options.getChannel("exempt-channels");
    const timeout = interaction.options.getInteger("timeout");
    const logChannel = interaction.options.getChannel("log-channel");
    const createdRule = await syncAutoModRule(interaction, "invite");

    if (enable) {
     await enableAntiInvite(client, interaction, exemptRoles, exemptChannels, timeout, logChannel, createdRule, guildSettings);
    } else {
     await disableAntiInvite(client, interaction, createdRule, guildSettings);
    }
   } else if (subcommand === "anti-link") {
    const enable = interaction.options.getBoolean("enable");
    const exemptRoles = interaction.options.getRole("exempt-roles");
    const exemptChannels = interaction.options.getChannel("exempt-channels");
    const timeout = interaction.options.getInteger("timeout");
    const logChannel = interaction.options.getChannel("log-channel");
    const createdRule = await syncAutoModRule(interaction, "anti-link");

    if (enable) {
     await enableAntiLink(client, interaction, exemptRoles, exemptChannels, timeout, logChannel, createdRule, guildSettings);
    } else {
     await disableAntiLink(client, interaction, createdRule, guildSettings);
    }
   }
  } catch (err) {
   console.log(err);
   client.errorMessages.internalError(interaction, err);
  }
 },
};
