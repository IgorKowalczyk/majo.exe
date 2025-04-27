import prismaClient from "@majoexe/database";
import { GiveawayData } from "discord-giveaways";
import { type ChatInputCommandInteraction, EmbedBuilder, type Message, PermissionsBitField, type ColorResolvable, MessageFlags } from "discord.js";
import type { Majobot } from "@/index";

export async function FindGiveaways(client: Majobot, interaction: ChatInputCommandInteraction, color: ColorResolvable, type: "all" | "ended" | "running"): Promise<Message | void> {
 try {
  await interaction.deferReply({ flags: [MessageFlags.Ephemeral] });
  if (!interaction.guild || !interaction.guild.available) return client.errorMessages.createSlashError(interaction, "❌ This command can only be used in a server!");
  if (!interaction.member) return client.errorMessages.createSlashError(interaction, "❌ This command can only be used by a member!");

  const userPermissions = interaction.memberPermissions || new PermissionsBitField();

  if (!userPermissions.has(PermissionsBitField.Flags.ManageGuild)) return client.errorMessages.createSlashError(interaction, "❌ You do not have permission to find giveaways! You need `MANAGE_GUILD` permission.");

  const giveaways = await prismaClient.giveaways.findMany({
   where: {
    guildId: interaction.guild.id,
   },
  });

  const list = giveaways
   .filter((giveaway) => {
    if (!giveaway.data) return false;

    const giveawayData = giveaway.data as unknown as GiveawayData;

    if (type === "ended") {
     return giveawayData.ended;
    } else if (type === "running") {
     return !giveawayData.ended;
    }
    return true;
   })
   .map((g) => {
    const giveawayData = g.data as unknown as GiveawayData;

    const prize = giveawayData.prize ? giveawayData.prize.replace(`${client.config.emojis.giveaway} Giveaway: `, "").replace(`${client.config.emojis.giveaway} Drop: `, "") : "No prize";
    const winnerCount = giveawayData.winnerCount || 1;
    const endDate = giveawayData.ended ? "" : `, Ends <t:${Math.floor(giveawayData.endAt / 1000)}:R>` || "No end date";
    const url = `https://discord.com/channels/${g.guildId}/${giveawayData.channelId}/${g.messageId}`;
    return `**${prize}**: Winners: \`${winnerCount}\`${endDate}, ${url}`;
   });

  if (!list) return client.errorMessages.createSlashError(interaction, "❌ No giveaways found!");

  const embed = new EmbedBuilder()
   .setColor(color)
   .setTimestamp()
   .setTitle(`🎉 Giveaways (${list.length})`)
   .setDescription(
    `>>> ${
     list.length > 0 // prettier
      ? list.join("\n")
      : "No giveaways found for this type!"
    }`
   )
   .setFooter({
    text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
    iconURL: interaction.user.displayAvatarURL({
     size: 256,
    }),
   });
  return interaction.followUp({ flags: [MessageFlags.Ephemeral], embeds: [embed] });
 } catch (err: unknown) {
  client.errorMessages.internalError(interaction, err);
 }
}
