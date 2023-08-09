import { ApplicationCommandType, ApplicationCommandOptionType, ChannelType } from "discord.js";
import { StartDropGiveaway, StartGiveaway } from "../../util/giveaway/startGiveaway.js";

export default {
 name: "giveaway",
 description: "🎉 Manage giveaway's",
 type: ApplicationCommandType.ChatInput,
 cooldown: 3000,
 dm_permission: false,
 defer: false,
 usage: "/giveaway <command>",
 options: [
  {
   name: "start",
   description: "🎉 Start giveaway",
   type: ApplicationCommandOptionType.Subcommand,
   usage: "/giveaway start <time> <winners> <channel> <prize>",
   options: [
    {
     name: "time",
     description: "Time to end giveaway <d/h/m>",
     type: ApplicationCommandOptionType.String,
     min_length: 2,
     max_length: 15,
     required: true,
    },
    {
     name: "winners",
     description: "Winner count",
     type: ApplicationCommandOptionType.Integer,
     min_value: 1,
     max_value: 100,
     required: true,
    },
    {
     name: "channel",
     description: "Channel on which you want to create the giveaway",
     type: ApplicationCommandOptionType.Channel,
     channel_types: [ChannelType.GuildText],
     required: true,
    },
    {
     name: "prize",
     description: "Prize of the giveaway",
     type: ApplicationCommandOptionType.String,
     required: true,
     max_length: 100,
    },
   ],
  },
  {
   name: "drop",
   description: "🎉 Create a drop giveaway",
   type: ApplicationCommandOptionType.Subcommand,
   usage: "/drop-giveaway <winners> <channel> <prize>",
   options: [
    {
     name: "winners",
     description: "Winner count",
     type: ApplicationCommandOptionType.Integer,
     min_value: 1,
     max_value: 100,
     required: true,
    },
    {
     name: "channel",
     description: "Channel on which you want to create the giveaway",
     type: ApplicationCommandOptionType.Channel,
     channel_types: [ChannelType.GuildText],
     required: true,
    },
    {
     name: "prize",
     description: "Prize of the giveaway",
     type: ApplicationCommandOptionType.String,
     required: true,
     max_length: 100,
    },
   ],
  },
  {
   name: "end",
   description: "🎉 End a giveaway",
   type: ApplicationCommandOptionType.Subcommand,
   usage: "/giveaway end <giveaway id/giveaway prize>",
   options: [
    {
     name: "id-prize",
     description: "Giveaway ID or Giveaway Prize",
     type: ApplicationCommandOptionType.String,
     required: true,
     max_length: 100,
    },
   ],
  },
  {
   name: "pause",
   description: "🎉 Pause a giveaway",
   type: ApplicationCommandOptionType.Subcommand,
   usage: "/giveaway pause <giveaway id/giveaway prize>",
   options: [
    {
     name: "id-prize",
     description: "Giveaway ID or Giveaway Prize",
     type: ApplicationCommandOptionType.String,
     required: true,
     max_length: 100,
    },
   ],
  },
  {
   name: "resume",
   description: "🎉 Resume a giveaway",
   type: ApplicationCommandOptionType.Subcommand,
   usage: "/giveaway resume <giveaway id/giveaway prize>",
   options: [
    {
     name: "id-prize",
     description: "Giveaway ID or Giveaway Prize",
     type: ApplicationCommandOptionType.String,
     required: true,
     max_length: 100,
    },
   ],
  },
  {
   name: "reroll",
   description: "🎉 Reroll a giveaway",
   type: ApplicationCommandOptionType.Subcommand,
   usage: "/giveaway reroll <giveaway id/giveaway prize>",
   options: [
    {
     name: "id-prize",
     description: "Giveaway ID or Giveaway Prize",
     type: ApplicationCommandOptionType.String,
     required: true,
     max_length: 100,
    },
   ],
  },
 ],
 run: async (client, interaction, guildSettings) => {
  try {
   const type = interaction.options.getSubcommand();
   if (type === "start") {
    await StartGiveaway(client, interaction, guildSettings?.embedColor || client.config.global.defaultColor);
   } else if (type === "drop") {
    await StartDropGiveaway(client, interaction, guildSettings?.embedColor || client.config.global.defaultColor);
   }
  } catch (err) {
   client.errorMessages.generateErrorMessage(interaction, err);
  }
 },
};
