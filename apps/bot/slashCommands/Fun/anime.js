import { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder, codeBlock } from "discord.js";
import { getInfoFromName } from "mal-scraper";

export default {
 name: "anime",
 description: "💮 Search for information about Anime by given name",
 type: ApplicationCommandType.ChatInput,
 cooldown: 3000,
 dm_permission: true,
 usage: "/anime <anime name>",
 options: [
  {
   name: "query",
   description: "Anime name",
   required: true,
   type: ApplicationCommandOptionType.String,
  },
 ],
 run: async (client, interaction, guildSettings) => {
  try {
   const query = interaction.options.getString("query");
   if (!query) {
    const embed = new EmbedBuilder()
     .setColor("#EF4444")
     .setTimestamp()
     .setTitle("❌ Error")
     .setDescription("> You need to provide a query to search for.")
     .setFooter({
      text: `Requested by ${interaction.member?.user?.username}`,
      iconURL: interaction.member?.user?.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      }),
     });
    return interaction.followUp({ ephemeral: true, embeds: [embed] });
   }

   const data = await getInfoFromName(query);

   if (!data) {
    const embed = new EmbedBuilder()
     .setColor("#EF4444")
     .setTimestamp()
     .setTitle("❌ Error")
     .setDescription("> No results found.")
     .setFooter({
      text: `Requested by ${interaction.member?.user?.username}`,
      iconURL: interaction.member?.user?.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      }),
     });
    return interaction.followUp({ ephemeral: true, embeds: [embed] });
   }

   if (data.synopsis.length > 1024) {
    data.synopsis = data.synopsis.slice(0, 1021) + "...";
   }

   const embed = new EmbedBuilder()
    .setColor(guildSettings?.embedColor || client.config.bot.defaultEmbedColor)
    .setTimestamp()
    .setTitle(data.title)
    .setURL(data.url)
    .setDescription(data.synopsis || "None!")
    .setThumbnail(data.picture)
    .addFields([
     {
      name: `${client.botEmojis.flag_gb} English Title`,
      value: codeBlock(data.englishTitle || "None!"),
      inline: false,
     },
     {
      name: `${client.botEmojis.flag_jp} Japanese Title`,
      value: codeBlock(data.japaneseTitle || "None!"),
      inline: false,
     },
     {
      name: `${client.botEmojis.book} Type`,
      value: codeBlock(data.type || "N/A!"),
      inline: true,
     },
     {
      name: `${client.botEmojis.counting} Episodes`,
      value: codeBlock(`${data.episodes || "N/A!"} episodes`),
      inline: true,
     },
     {
      name: `${client.botEmojis.star} Score`,
      value: codeBlock(data.score || "N/A!"),
      inline: true,
     },
     {
      name: `${client.botEmojis.star2} Rating`,
      value: codeBlock(data.rating || "N/A!"),
      inline: true,
     },
     {
      name: `${client.botEmojis.calendar_spillar} Aired`,
      value: codeBlock(data.aired || "N/A!"),
      inline: true,
     },
     {
      name: `${client.botEmojis.barchart} Scored by`,
      value: codeBlock(data.scoreStats || "N/A!"),
      inline: false,
     },
    ])
    .setFooter({
     text: `Requested by ${interaction.member?.user?.username}`,
     iconURL: interaction.member?.user?.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     }),
    });

   return interaction.followUp({ embeds: [embed] });
  } catch (err) {
   client.errorMessages.generateErrorMessage(interaction, err);
  }
 },
};
