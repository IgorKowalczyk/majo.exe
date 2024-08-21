import { cacheGet, cacheSet } from "@majoexe/database/redis";
import { checkReputation, giveReputation, takeReputation, setReputation } from "@majoexe/util/database";
import { formatDuration } from "@majoexe/util/functions/util";
import { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder, PermissionFlagsBits } from "discord.js";

export default {
 name: "rep",
 description: "👍 Get the reputation of a user",
 type: ApplicationCommandType.ChatInput,
 cooldown: 5000,
 dm_permission: false,
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
   defaultMemberPermissions: [PermissionFlagsBits.Administrator],
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

   if (type === "get") {
    const user = interaction.options.getUser("user");

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
    const user = interaction.options.getUser("user");

    if (user.id === interaction.member.user.id) {
     return client.errorMessages.createSlashError(interaction, "❌ You can't give reputation to yourself");
    }

    if (user.bot) {
     return client.errorMessages.createSlashError(interaction, "❌ You can't give reputation to a bot");
    }

    const key = `${interaction.member.user.id}-${user.id}`;
    const time = JSON.parse(await cacheGet(key));

    if (time && time.time + 86400000 > Date.now()) {
     const timeLeft = time.time + 86400000 - Date.now();
     return client.errorMessages.createSlashError(interaction, `❌ You can't give reputation to ${user} for another \`${formatDuration(timeLeft)}\``);
    }

    const rep = await giveReputation(user, interaction.guild);
    await cacheSet(key, { userId: interaction.member.user.id, time: Date.now() }, 86400000);

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
    const user = interaction.options.getUser("user");

    if (user.id === interaction.member.user.id) {
     return client.errorMessages.createSlashError(interaction, "❌ You can't take reputation from yourself");
    }

    if (user.bot) {
     return client.errorMessages.createSlashError(interaction, "❌ You can't take reputation from a bot");
    }

    const key = `${interaction.member.user.id}-${user.id}`;
    const time = JSON.parse(await cacheGet(key));

    if (time && time.time + 86400000 > Date.now()) {
     const timeLeft = time.time + 86400000 - Date.now();
     return client.errorMessages.createSlashError(interaction, `❌ You can't take reputation from ${user} for another \`${formatDuration(timeLeft)}\``);
    }

    const rep = await takeReputation(user, interaction.guild);

    await cacheSet(key, { userId: interaction.member.user.id, time: Date.now() }, 86400000);

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

    if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
     return client.errorMessages.createSlashError(interaction, "❌ You don't have `Administrator` permissions to use this command");
    }

    if (amount < 0) {
     return client.errorMessages.createSlashError(interaction, "❌ You can't set a user's reputation to a negative number");
    }

    // 32-bit integer limit
    if (amount >= 2147483647) {
     return client.errorMessages.createSlashError(interaction, "❌ You can't set a user's reputation to a number that is too large");
    }

    if (user.bot) {
     return client.errorMessages.createSlashError(interaction, "❌ You can't set a bot's reputation");
    }

    const rep = await setReputation(user, interaction.guild, amount);

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
};
