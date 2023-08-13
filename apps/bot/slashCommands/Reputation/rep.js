import { checkReputation, giveReputation, takeReputation, setReputation } from "@majoexe/util/database";
import { formatDuration } from "@majoexe/util/functions";
import { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder, PermissionFlagsBits } from "discord.js";
const timeout = new Map();

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
   default_member_permissions: [PermissionFlagsBits.Administrator],
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
     .setThumbnail(
      user?.displayAvatarURL({
       dynamic: true,
       format: "png",
      })
     )
     .setFooter({
      text: `Requested by ${interaction.member?.user?.username}`,
      iconURL: interaction.member?.user?.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      }),
     });

    return interaction.followUp({ embeds: [embed] });
   } else if (type === "give") {
    const user = interaction.options.getUser("user");

    if (user.id === interaction.member?.user?.id) {
     return client.errorMessages.createSlashError(interaction, "❌ You can't give reputation to yourself");
    }

    if (timeout.has(`${interaction.member?.user?.id}-${user.id}`)) {
     return client.errorMessages.createSlashError(interaction, `❌ You can't give reputation to ${user} for another \`${formatDuration(timeout.get(`${interaction.member?.user?.id}-${user.id}`) - Date.now())}\``);
    }

    const rep = await giveReputation(user, interaction.guild);

    timeout.set(`${interaction.member?.user?.id}-${user.id}`, Date.now() + 86400000);

    const embed = new EmbedBuilder()
     .setColor(guildSettings?.embedColor || client.config.defaultColor)
     .setTimestamp()
     .setTitle("👍 Reputation")
     .setDescription(`> Successfully gave ${user} \`1\` reputation point. They now have *\`${rep}\` reputation points`)
     .setThumbnail(
      user?.displayAvatarURL({
       dynamic: true,
       format: "png",
      })
     )
     .setFooter({
      text: `Requested by ${interaction.member?.user?.username}`,
      iconURL: interaction.member?.user?.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      }),
     });

    return interaction.followUp({ embeds: [embed] });
   } else if (type === "take") {
    const user = interaction.options.getUser("user");

    if (user.id === interaction.member?.user?.id) {
     return client.errorMessages.createSlashError(interaction, "❌ You can't take reputation from yourself");
    }

    if (timeout.has(`${interaction.member?.user?.id}-${user.id}`)) {
     return client.errorMessages.createSlashError(interaction, `❌ You can't take reputation from ${user} for another \`${formatDuration(timeout.get(`${interaction.member?.user?.id}-${user.id}`) - Date.now())}\``);
    }

    const rep = await takeReputation(user, interaction.guild);

    timeout.set(`${interaction.member?.user?.id}-${user.id}`, Date.now() + 86400000);

    const embed = new EmbedBuilder()
     .setColor(guildSettings?.embedColor || client.config.defaultColor)
     .setTimestamp()
     .setTitle("👍 Reputation")
     .setDescription(`> Successfully took \`1\` reputation point from ${user}. They now have \`${rep}\` reputation points`)
     .setThumbnail(
      user?.displayAvatarURL({
       dynamic: true,
       format: "png",
      })
     )
     .setFooter({
      text: `Requested by ${interaction.member?.user?.username}`,
      iconURL: interaction.member?.user?.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      }),
     });

    return interaction.followUp({ embeds: [embed] });
   } else if (type === "set") {
    const user = interaction.options.getUser("user");
    const amount = interaction.options.getInteger("amount");

    if (!interaction.member?.permissions.has(PermissionFlagsBits.Administrator)) {
     return client.errorMessages.createSlashError(interaction, "❌ You don't have `Administrator` permissions to use this command");
    }

    if (amount < 0) {
     return client.errorMessages.createSlashError(interaction, "❌ You can't set a user's reputation to a negative number");
    }

    // 32-bit integer limit
    if (amount >= 2147483647) {
     return client.errorMessages.createSlashError(interaction, "❌ You can't set a user's reputation to a number that is too large");
    }
    const rep = await setReputation(user, interaction.guild, amount);

    const embed = new EmbedBuilder()
     .setColor(guildSettings?.embedColor || client.config.defaultColor)
     .setTimestamp()
     .setTitle("👍 Reputation")
     .setDescription(`> Successfully set ${user} reputation to \`${rep}\` points`)
     .setThumbnail(
      user?.displayAvatarURL({
       dynamic: true,
       format: "png",
      })
     )
     .setFooter({
      text: `Requested by ${interaction.member?.user?.username}`,
      iconURL: interaction.member?.user?.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      }),
     });

    return interaction.followUp({ embeds: [embed] });
   }
  } catch (err) {
   client.errorMessages.internalError(interaction, err);
  }
 },
};
