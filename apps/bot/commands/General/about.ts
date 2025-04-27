import { ActionRowBuilder, ApplicationCommandType, ButtonStyle, ButtonBuilder, EmbedBuilder, InteractionContextType, ApplicationIntegrationType } from "discord.js";
import type { SlashCommand } from "@/util/types/Command";

export default {
 name: "about",
 description: "🏷️ Learn more about Majo.exe",
 type: ApplicationCommandType.ChatInput,
 cooldown: 3000,
 usage: "/about",
 contexts: [InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel],
 integrationTypes: [ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall],
 run: async (client, interaction, guildSettings) => {
  try {
   if (!client.user) return client.errorMessages.createSlashError(interaction, "❌ Bot is not ready yet. Please try again later.");

   const embed = new EmbedBuilder() // Prettier
    .setTitle(`🤖 About ${client.user.username}`)
    .setDescription(
     `Majo.exe is a Discord bot made for **Memes, Image editing, Giveaways, Moderation, Anime and even more!** 🎉
     
     It is made by the awesome [Majo.exe Team & Contributors](https://github.com/IgorKowalczyk/majo.exe#-contributors) and is **completly open source and free**.
     
     **You can find the source code [on Github](https://github.com/igorkowalczyk/majo.exe).** If you want to help us with our journey and you know how to code, you can contribute to the project by forking the repository and making a pull request. **We really appreciate it!** ❤️‍🔥

     ${client.config.url ? `**If you want to invite Majo.exe to your server, you can do so by clicking [here](${client.config.url})**` : ""}
     `
    )
    .setFooter({
     text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
     iconURL: interaction.user.displayAvatarURL({
      size: 256,
     }),
    })
    .setColor(guildSettings?.embedColor || client.config.defaultColor)
    .setTimestamp();

   if (client.config.url) {
    const action = new ActionRowBuilder<ButtonBuilder>() // prettier
     .addComponents(
      new ButtonBuilder() // prettier
       .setLabel("Dashboard")
       .setStyle(ButtonStyle.Link)
       .setURL(client.config.url),
      new ButtonBuilder() // prettier
       .setLabel("Invite")
       .setStyle(ButtonStyle.Link)
       .setURL(`${client.config.url}/invite`)
     );

    return interaction.followUp({ embeds: [embed], components: [action] });
   } else {
    return interaction.followUp({ embeds: [embed] });
   }
  } catch (err) {
   client.errorMessages.internalError(interaction, err);
  }
 },
} satisfies SlashCommand;
