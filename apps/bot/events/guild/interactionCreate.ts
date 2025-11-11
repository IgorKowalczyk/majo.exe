import prismaClient from "@majoexe/database";
import { cacheGet, cacheSet, cacheTTL } from "@majoexe/database/redis";
import { createUser } from "@majoexe/util/database";
import { formatDuration } from "@majoexe/util/functions/util";
import { ChannelType, EmbedBuilder, GuildMember, InteractionType, Message, MessageFlags, PermissionsBitField, type Interaction } from "discord.js";
import type { Majobot } from "@/index";

export async function interactionCreate(client: Majobot, interaction: Interaction): Promise<Message | void> {
  try {
    client.commandsRan++;

    //#region Slash commands
    if (interaction.isChatInputCommand()) {
      const command = client.slashCommands.get(interaction.commandName);
      if (!command) return;

      if (client.config.displayCommandUsage) client.debugger("info", `Command used: ${interaction.commandName} by ${interaction.user.username} (${interaction.user.id})`);

      const shouldDefer = command.defer ?? true;
      if (shouldDefer) await interaction.deferReply();

      const { cooldown } = command;
      const key = `user:${interaction.user.id}:timeout:${interaction.commandName}`;
      const time = await cacheGet(key);

      if (cooldown) {
        if (time) {
          const timeLeft = await cacheTTL(key);
          const embed = new EmbedBuilder()
            .setTitle("‼️ Slow down!")
            .setDescription(`You are on cooldown! Please wait \`${formatDuration(timeLeft * 1000)}\` before using this command again!`)
            .setColor("#EF4444")
            .setTimestamp()
            .setFooter({
              text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
              iconURL: interaction.user.displayAvatarURL({ size: 256 }),
            });
          return interaction.followUp({ flags: [MessageFlags.Ephemeral], embeds: [embed] });
        } else {
          await cacheSet(key, { userId: interaction.user.id, time: Date.now(), command: interaction.commandName }, cooldown / 1000);
        }
      }

      if (interaction.guild) {
        const guildSettings = await prismaClient.guild.upsert({
          where: {
            guildId: interaction.guild.id,
          },
          update: {},
          create: {
            guildId: interaction.guild.id,
          },
          select: {
            embedColor: true,
            publicPage: true,
            vanity: true,
            enableXPLevelUpMessage: true,
            enableXPLevelUpMessageLastChanged: true,
            enableXPLastChanged: true,

            guildDisabledCommands: true,
            guildDisabledCategories: true,
          },
        });

        if (!interaction.channel || !interaction.channel.isTextBased() || !interaction.member) return;
        if (interaction.channel.type !== ChannelType.GuildText) return;

        const permissions = interaction.channel.permissionsFor(interaction.member as GuildMember);

        const canManageGuild = permissions.has(PermissionsBitField.Flags.ManageGuild);
        const canManageCategories = permissions.has(PermissionsBitField.Flags.Administrator);

        const commandDisabled = guildSettings.guildDisabledCommands.some((cmd: { commandName: string }) => cmd.commandName === interaction.commandName);
        const categoryDisabled = guildSettings.guildDisabledCategories.some((cat: { categoryName: string }) => cat.categoryName === command.category);

        if (commandDisabled) {
          const embed = new EmbedBuilder()
            .setTitle("‼️ Command disabled")
            .setDescription(
              `The command \`${interaction.commandName}\` is disabled in this server!${canManageGuild || canManageCategories ? "\n\n**Note:** You can enable it again in the dashboard!" : ""}`
            )
            .setColor("#EF4444")
            .setTimestamp()
            .setFooter({
              text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
              iconURL: interaction.user.displayAvatarURL({ size: 256 }),
            });

          return interaction.followUp({ flags: [MessageFlags.Ephemeral], embeds: [embed] });
        }

        if (categoryDisabled) {
          const embed = new EmbedBuilder()
            .setTitle("‼️ Command category disabled")
            .setDescription(
              `The category \`${command.category}\` is disabled in this server!${canManageGuild || canManageCategories ? "\n\n**Note:** You can enable it again in the dashboard!" : ""}`
            )
            .setColor("#EF4444")
            .setTimestamp()
            .setFooter({
              text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
              iconURL: interaction.user.displayAvatarURL({ size: 256 }),
            });

          return interaction.followUp({ flags: [MessageFlags.Ephemeral], embeds: [embed] });
        }

        await createUser(interaction.member.user);

        await command.run(client, interaction, guildSettings);
      } else {
        await createUser(interaction.user);

        await command.run(client, interaction);
      }

      // #endregion
      // #region Modals
    } else if (interaction.isModalSubmit()) {
      const modal = client.modals.get(interaction.customId);
      if (!modal) return;

      if (!interaction.guild) return;

      if (interaction.type !== InteractionType.ModalSubmit) return;
      if (!interaction.member) await interaction.guild.members.fetch(interaction.user.id);
      if (!interaction.member) return;

      if (client.config.displayModalUsage) client.debugger("info", `Modal used: ${interaction.customId} by ${interaction.user.username} (${interaction.user.id})`);

      await prismaClient.guild.upsert({
        where: {
          guildId: interaction.guild.id,
        },
        update: {},
        create: {
          guildId: interaction.guild.id,
        },
      });

      await createUser(interaction.member.user);

      await modal.run(client, interaction);

      // #endregion
      // #region Autocomplete
    } else if (interaction.isAutocomplete()) {
      const command = client.slashCommands.get(interaction.commandName);
      if (!command) return;
      if (command.autocomplete && typeof command.autocomplete === "function") await command.autocomplete(client, interaction);
    }
  } catch (err: unknown) {
    client.debugger("error", err);
  }
}
