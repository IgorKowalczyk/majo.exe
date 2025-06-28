import { cacheGet, cacheSet, cacheTTL } from "@majoexe/database/redis";
import { checkReputation, giveReputation, takeReputation, setReputation } from "@majoexe/util/database";
import { formatDuration } from "@majoexe/util/functions/util";
import {
 ApplicationCommandType,
 ApplicationCommandOptionType,
 EmbedBuilder,
 PermissionFlagsBits,
 PermissionsBitField,
 InteractionContextType,
 ApplicationIntegrationType,
} from "discord.js";
import type { SlashCommand } from "@/util/types/Command";

export default {
 name: "rep",
 description: "👍 Get the reputation of a user",
 type: ApplicationCommandType.ChatInput,
 cooldown: 5000,
 contexts: [InteractionContextType.Guild],
 integrationTypes: [ApplicationIntegrationType.GuildInstall],
 usage: "/rep <command>",
 options: [
  {
   name: "get",
   description: "👍 The user you want to get the reputation of",
   type: ApplicationCommandOptionType.Subcommand,
   usage: "/rep get <user>",
   options: [
    {
     name: "user",
     description: "The user you want to get the reputation of",
     required: true,
     type: ApplicationCommandOptionType.User,
    },
   ],
  },
  {
   name: "give",
   description: "➕ Give reputation to a user",
   type: ApplicationCommandOptionType.Subcommand,
   usage: "/rep give <user>",
   options: [
    {
     name: "user",
     description: "The user you want to give reputation to",
     required: true,
     type: ApplicationCommandOptionType.User,
    },
   ],
  },
  {
   name: "take",
   description: "➖ Take reputation from a user",
   type: ApplicationCommandOptionType.Subcommand,
   usage: "/rep take <user>",
   options: [
    {
     name: "user",
     description: "The user you want to take reputation from",
     required: true,
     type: ApplicationCommandOptionType.User,
    },
   ],
  },
  {
   name: "set",
   description: "👍 Set the reputation of a user",
   type: ApplicationCommandOptionType.Subcommand,
   usage: "/rep set <user> <amount>",
   //defaultMemberPermissions: [PermissionFlagsBits.Administrator],
   options: [
    {
     name: "user",
     description: "The user you want to set the reputation of",
     required: true,
     type: ApplicationCommandOptionType.User,
    },
    {
     name: "amount",
     description: "The amount of reputation you want to set",
     required: true,
     type: ApplicationCommandOptionType.Integer,
    },
   ],
  },
 ],
 run: async (client, interaction, guildSettings) => {
  try {
   const type = interaction.options.getSubcommand();
   if (!interaction.guild) return client.errorMessages.createSlashError(interaction, "❌ This command can only be used in a server.");
   if (!interaction.member) return client.errorMessages.createSlashError(interaction, "❌ You must be in a server to use this command.");
   if (!interaction.guildId) return client.errorMessages.createSlashError(interaction, "❌ Unable to get server data. Please try again.");
   const user = interaction.options.getUser("user");
   if (!user) return client.errorMessages.createSlashError(interaction, "❌ Please provide a valid user.");

   const key = `user:${interaction.member.user.id}:reputation:${user.id}`;

   if (type === "get") {
    const rep = await checkReputation(user.id, interaction.guild.id);

    const embed = new EmbedBuilder()
     .setColor(guildSettings?.embedColor || client.config.defaultColor)
     .setTimestamp()
     .setTitle("👍 Reputation")
     .setDescription(`> ${user} has \`${rep}\` reputation points`)
     .setThumbnail(user.displayAvatarURL({ size: 256 }))
     .setFooter({
      text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
      iconURL: interaction.user.displayAvatarURL({
       size: 256,
      }),
     });

    return interaction.followUp({ embeds: [embed] });
   } else if (type === "give") {
    if (user.id === interaction.member.user.id) return client.errorMessages.createSlashError(interaction, "❌ You can't give reputation to yourself");
    if (user.bot) return client.errorMessages.createSlashError(interaction, "❌ You can't give reputation to a bot");

    const time = await cacheGet(key);

    if (time) {
     const timeLeft = await cacheTTL(key);
     return client.errorMessages.createSlashError(interaction, `❌ You can't give reputation to ${user} for another \`${formatDuration(timeLeft * 1000)}\``);
    }

    const rep = await giveReputation(user, interaction.guild.id);

    await cacheSet(key, { userId: interaction.member.user.id, for: user.id, timeSet: Date.now() }, 24 * 60 * 60); // 24 hours

    const embed = new EmbedBuilder()
     .setColor(guildSettings?.embedColor || client.config.defaultColor)
     .setTimestamp()
     .setTitle("👍 Reputation")
     .setDescription(`> Successfully gave ${user} \`1\` reputation point. They now have *\`${rep}\`* reputation points`)
     .setThumbnail(user.displayAvatarURL({ size: 256 }))
     .setFooter({
      text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
      iconURL: interaction.user.displayAvatarURL({
       size: 256,
      }),
     });

    return interaction.followUp({ embeds: [embed] });
   } else if (type === "take") {
    if (user.id === interaction.member.user.id) return client.errorMessages.createSlashError(interaction, "❌ You can't take reputation from yourself");
    if (user.bot) return client.errorMessages.createSlashError(interaction, "❌ You can't take reputation from a bot");

    const time = await cacheGet(key);

    if (time) {
     const timeLeft = await cacheTTL(key);
     return client.errorMessages.createSlashError(interaction, `❌ You can't take reputation from ${user} for another \`${formatDuration(timeLeft * 1000)}\``);
    }

    const rep = await takeReputation(user, interaction.guild.id);

    await cacheSet(key, { userId: interaction.member.user.id, for: user.id, timeSet: Date.now() }, 24 * 60 * 60); // 24 hours

    const embed = new EmbedBuilder()
     .setColor(guildSettings?.embedColor || client.config.defaultColor)
     .setTimestamp()
     .setTitle("👍 Reputation")
     .setDescription(`> Successfully took \`1\` reputation point from ${user}. They now have \`${rep}\` reputation points`)
     .setThumbnail(user.displayAvatarURL({ size: 256 }))
     .setFooter({
      text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
      iconURL: interaction.user.displayAvatarURL({
       size: 256,
      }),
     });

    return interaction.followUp({ embeds: [embed] });
   } else if (type === "set") {
    const user = interaction.options.getUser("user");
    const amount = interaction.options.getInteger("amount");

    if (!user) return client.errorMessages.createSlashError(interaction, "❌ Please provide a valid user.");
    if (!amount) return client.errorMessages.createSlashError(interaction, "❌ Please provide a valid amount.");

    const userPermissions = interaction.memberPermissions || new PermissionsBitField();

    if (!userPermissions.has(PermissionFlagsBits.Administrator)) {
     return client.errorMessages.createSlashError(interaction, "❌ You don't have `Administrator` permissions to use this command");
    }

    if (amount < 0) return client.errorMessages.createSlashError(interaction, "❌ You can't set a user's reputation to a negative number");

    // 32-bit integer limit
    if (amount >= 2147483647) return client.errorMessages.createSlashError(interaction, "❌ You can't set a user's reputation to a number that is too large");

    if (user.bot) return client.errorMessages.createSlashError(interaction, "❌ You can't set a bot's reputation");

    const rep = await setReputation(user, interaction.guild.id, amount);

    const embed = new EmbedBuilder()
     .setColor(guildSettings?.embedColor || client.config.defaultColor)
     .setTimestamp()
     .setTitle("👍 Reputation")
     .setDescription(`> Successfully set ${user} reputation to \`${rep}\` points`)
     .setThumbnail(user.displayAvatarURL({ size: 256 }))
     .setFooter({
      text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
      iconURL: interaction.user.displayAvatarURL({
       size: 256,
      }),
     });

    return interaction.followUp({ embeds: [embed] });
   }
  } catch (err) {
   client.errorMessages.internalError(interaction, err);
  }
 },
} satisfies SlashCommand;
