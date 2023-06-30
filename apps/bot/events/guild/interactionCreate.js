import prismaClient from "@majoexe/database";
import { formatDuration } from "@majoexe/util/functions";
import { Logger } from "@majoexe/util/functions";
import { EmbedBuilder } from "discord.js";
const timeout = new Map();

export async function interactionCreate(client, interaction) {
 try {
  if (!interaction.user) {
   await interaction?.guild?.members?.fetch(interaction?.member?.user?.id);
  }
  if (interaction.isCommand()) {
   client.config.debugger.displayCommandUsage && Logger("info", `Command used: ${interaction.commandName} by ${interaction.user.tag} (${interaction.user.id})`);
   const shouldDefer = client.slashCommands.get(interaction.commandName).defer ?? true;
   if (shouldDefer) {
    await interaction.deferReply({ ephemeral: false });
   }

   if (!client.slashCommands.has(interaction.commandName)) return;
   const key = `${interaction.user.id}${interaction.commandName}`;
   if (client.slashCommands.get(interaction.commandName).cooldown) {
    if (timeout.get(key) && timeout.get(key)?.time + client.slashCommands.get(interaction.commandName).cooldown > Date.now()) {
     const timeLeft = timeout.get(key)?.time + client.slashCommands.get(interaction.commandName).cooldown - Date.now();
     const embed = new EmbedBuilder()
      .setTitle("‼️ Slow down!")
      .setDescription(`You are on cooldown! Please wait \`${formatDuration(timeLeft)}\` before using this command again!`)
      .setColor("#EF4444")
      .setTimestamp()
      .setFooter({
       text: `Requested by ${interaction.member?.user?.username}`,
       iconURL: interaction.member?.user?.displayAvatarURL({
        dynamic: true,
        format: "png",
       }),
      });
     return interaction.followUp({ ephemeral: true, embeds: [embed] });
    } else {
     timeout.set(key, { time: Date.now() });
     setTimeout(() => {
      timeout instanceof Map ? timeout.delete(key) : timeout.del(key);
     }, client.slashCommands.get(interaction.commandName).cooldown);
    }
   }

   const guildSettings = await prismaClient.guild.findFirst({
    where: {
     guildId: interaction.guild?.id,
    },
   });

   if (!guildSettings) {
    await prismaClient.guild.create({
     data: {
      guildId: interaction.guild?.id,
     },
    });
   }

   client.slashCommands.get(interaction.commandName).run(client, interaction, guildSettings);
  } else if (interaction.isModalSubmit()) {
   const modal = client.modals.get(interaction.customId);
   if (!modal) return;
   client.config.debugger.displayModalUsage && Logger("info", `Modal used: ${interaction.customId} by ${interaction.user.tag} (${interaction.user.id})`);
   const guildSettings = await prismaClient.guild.findFirst({
    where: {
     guildId: interaction.guild?.id,
    },
   });

   if (!guildSettings) {
    await prismaClient.guild.create({
     data: {
      guildId: interaction.guild?.id,
     },
    });
   }

   modal.run(client, interaction, guildSettings);
  }
 } catch (err) {
  Logger("error", err);
 }
}
