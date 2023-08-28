/* eslint-disable complexity */
import prismaClient from "@majoexe/database";
import { cacheGet, cacheSet } from "@majoexe/database/redis";
import { createUser } from "@majoexe/util/database";
import { formatDuration } from "@majoexe/util/functions";
import { EmbedBuilder } from "discord.js";

export async function interactionCreate(client, interaction) {
 try {
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

   if (!user) await createUser(interaction.user);

   client.slashCommands.get(interaction.commandName).run(client, interaction, guildSettings);

   /* ----------------- */
   /*       MODAL       */
   /* ----------------- */
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
  console.error(err);
  client.debugger("error", err);
 }
}
