import prismaClient from "@majoexe/database";
import { type ChatInputCommandInteraction, EmbedBuilder, type Message, PermissionsBitField, type ColorResolvable } from "discord.js";
import type { Majobot } from "@/index";

export async function FindGiveaways(client: Majobot, interaction: ChatInputCommandInteraction, color: ColorResolvable, type: "all" | "ended" | "running"): Promise<Message | void> {
 try {
  await interaction.deferReply({ ephemeral: true });
  if (!interaction.guild || !interaction.guild.available) return client.errorMessages.createSlashError(interaction, "❌ This command can only be used in a server!");
  if (!interaction.member) return client.errorMessages.createSlashError(interaction, "❌ This command can only be used by a member!");

  const userPermissions = interaction.memberPermissions || new PermissionsBitField();

  if (!userPermissions.has(PermissionsBitField.Flags.ManageGuild)) return client.errorMessages.createSlashError(interaction, "❌ You do not have permission to find giveaways! You need `MANAGE_GUILD` permission.");

  const giveaways = await prismaClient.giveaways.findMany({
   where: {
    guildId: interaction.guild.id,
   },
  });

  const list = giveaways.filter((giveaway) => {
   if (!giveaway.data) return false;

   if (type === "ended") {
    return giveaway.data.ended;
   } else if (type === "running") {
    return !giveaway.data.ended;
   }
   return true;
  });

  if (!giveaways) return client.errorMessages.createSlashError(interaction, "❌ No giveaways found!");

  const embed = new EmbedBuilder()
   .setColor(color)
   .setTimestamp()
   .setTitle(`🎉 Giveaways (${list.length})`)
   .setDescription(
    `>>> ${
     list.length > 0 // prettier
      ? list.map((g) => `**${g.data.prize ? g.data.prize.replace(`${client.config.emojis.giveaway} Giveaway: `, "").replace(`${client.config.emojis.giveaway} Drop: `, "") : "No prize"}**: Winners: \`${g.data.winnerCount || 1}\`${g.data.ended ? "" : `, Ends <t:${Math.floor(g.data.endAt / 1000)}:R>` || "No end date"}, https://discord.com/channels/${g.guildId}/${g.data.channelId}/${g.messageId}`).join("\n")
      : "No giveaways found for this type!"
    }`
   )
   .setFooter({
    text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
    iconURL: interaction.user.displayAvatarURL({
     size: 256,
    }),
   });
  return interaction.followUp({ ephemeral: true, embeds: [embed] });
 } catch (err: unknown) {
  client.errorMessages.internalError(interaction, err);
 }
}
