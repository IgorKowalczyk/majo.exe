/* eslint-disable complexity */

import prismaClient from "@majoexe/database";
import { cacheGet, cacheSet } from "@majoexe/database/redis";
import { createUser } from "@majoexe/util/database";
import { formatDuration } from "@majoexe/util/functions/util";
import { EmbedBuilder, PermissionsBitField } from "discord.js";

export async function interactionCreate(client, interaction) {
 try {
  client.commandsRan++;
  if (!interaction.guild || !interaction.guild.available) return;
  if (!interaction.member.user) await interaction.guild.members.fetch(interaction.member.user.id);

  if (interaction.isChatInputCommand()) {
   const command = client.slashCommands.get(interaction.commandName);
   if (!command) return;

   client.config.displayCommandUsage && client.debugger("info", `Command used: ${interaction.commandName} by ${interaction.member.user.username} (${interaction.member.user.id})`);

   const shouldDefer = command.defer ?? true;
   if (shouldDefer) await interaction.deferReply({ ephemeral: false });

   const key = `timeout-${interaction.member.user.id}-${interaction.commandName}`;
   const { cooldown } = command;
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
     await cacheSet(key, { userId: interaction.member.user.id, time: Date.now() }, cooldown);
    }
   }

   const guildSettings = await prismaClient.guild.upsert({
    where: {
     guildId: interaction.guild.id,
    },
    update: {},
    create: {
     guildId: interaction.guild.id,
    },
    include: {
     guildDisabledCommands: true,
     guildDisabledCategories: true,
    },
   });

   const canManageGuild = interaction.member.permissions.has(PermissionsBitField.Flags.ManageGuild);
   const canManageCategories = interaction.member.permissions.has(PermissionsBitField.Flags.Administrator);

   const commandDisabled = guildSettings.guildDisabledCommands.some((cmd) => cmd.commandName === interaction.commandName);
   const categoryDisabled = guildSettings.guildDisabledCategories.some((cat) => cat.categoryName === command.category);

   if (commandDisabled) {
    const embed = new EmbedBuilder()
     .setTitle("‼️ Command disabled")
     .setDescription(`The command \`${interaction.commandName}\` is disabled in this server!${canManageGuild || canManageCategories ? "\n\n**Note:** You can enable it again in the dashboard!" : ""}`)
     .setColor("#EF4444")
     .setTimestamp()
     .setFooter({
      text: `Requested by ${interaction.member.user.globalName || interaction.member.user.username}`,
      iconURL: interaction.member.user.displayAvatarURL({ size: 256 }),
     });

    return interaction.followUp({ ephemeral: true, embeds: [embed] });
   }

   if (categoryDisabled) {
    const embed = new EmbedBuilder()
     .setTitle("‼️ Command category disabled")
     .setDescription(`The category \`${command.category}\` is disabled in this server!${canManageGuild || canManageCategories ? "\n\n**Note:** You can enable it again in the dashboard!" : ""}`)
     .setColor("#EF4444")
     .setTimestamp()
     .setFooter({
      text: `Requested by ${interaction.member.user.globalName || interaction.member.user.username}`,
      iconURL: interaction.member.user.displayAvatarURL({ size: 256 }),
     });

    return interaction.followUp({ ephemeral: true, embeds: [embed] });
   }

   await createUser(interaction.member.user);

   client.slashCommands.get(interaction.commandName).run(client, interaction, guildSettings);
  } else if (interaction.isModalSubmit()) {
   const modal = client.modals.get(interaction.customId);
   if (!modal) return;

   client.config.displayModalUsage && client.debugger("info", `Modal used: ${interaction.customId} by ${interaction.member.user.username} (${interaction.member.user.id})`);

   const guildSettings = await prismaClient.guild.upsert({
    where: {
     guildId: interaction.guild.id,
    },
    update: {},
    create: {
     guildId: interaction.guild.id,
    },
   });

   await createUser(interaction.member.user);

   await modal.run(client, interaction, guildSettings);
  } else if (interaction.isAutocomplete()) {
   const command = client.slashCommands.get(interaction.commandName);
   if (!command) return;
   if (command.autocomplete && typeof command.autocomplete === "function") await command.autocomplete(client, interaction);
  }
 } catch (err) {
  client.debugger("error", err);
 }
}
