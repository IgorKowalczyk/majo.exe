/* eslint-disable complexity */
import prismaClient from "@majoexe/database";
import { cacheGet, cacheSet } from "@majoexe/database/redis";
import { createUser } from "@majoexe/util/database";
import { formatDuration } from "@majoexe/util/functions";
import { EmbedBuilder, PermissionsBitField } from "discord.js";

export async function interactionCreate(client, interaction) {
 try {
  client.commandsRan++;
  if (!interaction.guild || !interaction.guild.available) return;
  if (!interaction.user) await interaction.guild.members.fetch(interaction.member.user.id);

  if (interaction.isCommand()) {
   client.config.displayCommandUsage && client.debugger("info", `Command used: ${interaction.commandName} by ${interaction.user.tag} (${interaction.user.id})`);
   const shouldDefer = client.slashCommands.get(interaction.commandName).defer ?? true;
   if (shouldDefer) await interaction.deferReply({ ephemeral: false });
   if (!client.slashCommands.has(interaction.commandName)) return;

   const key = `timeout-${interaction.user.id}-${interaction.commandName}`;
   const cooldown = client.slashCommands.get(interaction.commandName).cooldown;
   if (cooldown) {
    const time = JSON.parse(await cacheGet(key));
    if (time && time.time + cooldown > Date.now()) {
     const timeLeft = time.time + cooldown - Date.now();
     const embed = new EmbedBuilder()
      .setTitle("‼️ Slow down!")
      .setDescription(`You are on cooldown! Please wait \`${formatDuration(timeLeft)}\` before using this command again!`)
      .setColor("#EF4444")
      .setTimestamp()
      .setFooter({
       text: `Requested by ${interaction.member.user.globalName || interaction.member.user.username}`,
       iconURL: interaction.member.user.displayAvatarURL({ size: 256 }),
      });
     return interaction.followUp({ ephemeral: true, embeds: [embed] });
    } else {
     await cacheSet(key, { userId: interaction.user.id, time: Date.now() }, cooldown);
    }
   }

   const guildSettings = await prismaClient.guild.findFirst({
    where: {
     guildId: interaction.guild.id,
    },
    include: {
     guildDisabledCommands: true,
     guildDisabledCategories: true,
    },
   });

   if (!guildSettings) {
    await prismaClient.guild.create({
     data: {
      guildId: interaction.guild.id,
     },
    });
   } else {
    if (guildSettings.guildDisabledCommands.length > 0) {
     const disabledCommand = guildSettings.guildDisabledCommands.find((cmd) => cmd.commandName === interaction.commandName);
     if (disabledCommand) {
      const embed = new EmbedBuilder()
       .setTitle("‼️ Command disabled")
       .setDescription(`The command \`${interaction.commandName}\` is disabled in this server! ${interaction.member.permissions.has(PermissionsBitField.Flags.ManageGuild) || interaction.member.permissions.has(PermissionsBitField.Flags.Administrator) ? "\n\n**Note:** You can enable it again in the dashboard!" : ""}`)
       .setColor("#EF4444")
       .setTimestamp()
       .setFooter({
        text: `Requested by ${interaction.member.user.globalName || interaction.member.user.username}`,
        iconURL: interaction.member.user.displayAvatarURL({ size: 256 }),
       });
      return interaction.followUp({ ephemeral: true, embeds: [embed] });
     }
    }

    if (guildSettings.guildDisabledCategories.length > 0) {
     const disabledCategory = guildSettings.guildDisabledCategories.find((cat) => cat.categoryName === client.slashCommands.get(interaction.commandName).category);
     if (disabledCategory) {
      const embed = new EmbedBuilder()
       .setTitle("‼️ Command category disabled")
       .setDescription(`The category \`${client.slashCommands.get(interaction.commandName).category}\` is disabled in this server! ${interaction.member.permissions.has(PermissionsBitField.Flags.ManageGuild) || interaction.member.permissions.has(PermissionsBitField.Flags.Administrator) ? "\n\n**Note:** You can enable it again in the dashboard!" : ""}`)
       .setColor("#EF4444")
       .setTimestamp()
       .setFooter({
        text: `Requested by ${interaction.member.user.globalName || interaction.member.user.username}`,
        iconURL: interaction.member.user.displayAvatarURL({ size: 256 }),
       });
      return interaction.followUp({ ephemeral: true, embeds: [embed] });
     }
    }
   }

   const user = await prismaClient.user.findFirst({
    where: {
     discordId: interaction.user.id,
    },
   });

   if (!user) await createUser(interaction.user);

   client.slashCommands.get(interaction.commandName).run(client, interaction, guildSettings);
  } else if (interaction.isModalSubmit()) {
   const modal = client.modals.get(interaction.customId);
   if (!modal) return;
   client.config.displayModalUsage && client.debugger("info", `Modal used: ${interaction.customId} by ${interaction.user.tag} (${interaction.user.id})`);

   const guildSettings = await prismaClient.guild.findFirst({
    where: {
     guildId: interaction.guild.id,
    },
   });

   if (!guildSettings) {
    await prismaClient.guild.create({
     data: {
      guildId: interaction.guild.id,
     },
    });
   }

   const user = await prismaClient.user.findFirst({
    where: {
     discordId: interaction.user.id,
    },
   });

   if (!user) {
    await createUser(interaction.user);
   }

   modal.run(client, interaction, guildSettings);
  }
 } catch (err) {
  client.debugger("error", err);
 }
}
