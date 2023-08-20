/* eslint-disable complexity */
import { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder, codeBlock } from "discord.js";

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
   max_length: 256,
  },
 ],
 run: async (client, interaction, guildSettings) => {
  try {
   const query = interaction.options.getString("query");

   const request = await fetch(`https://kitsu.io/api/edge/anime?filter[text]=${query}&page%5Boffset%5D=0&page%5Blimit%5D=1`, {
    method: "GET",
    headers: {
     "Content-Type": "application/vnd.api+json",
     Accept: "application/vnd.api+json",
    },
   });

   if (!request || !request.ok) {
    return client.errorMessages.createSlashError(interaction, "❌ No results found.");
   }
   const json = await request.json();
   if (!json || !json.data || json.data.length < 1) {
    return client.errorMessages.createSlashError(interaction, "❌ No results found.");
   }
   const data = json.data[0].attributes;

   if (!data) {
    const embed = new EmbedBuilder()
     .setColor("#EF4444")
     .setTimestamp()
     .setTitle("❌ Error")
     .setDescription("> No results found.")
     .setFooter({
      text: `Requested by ${interaction.member.user.username}`,
      iconURL: interaction.member.user.displayAvatarURL({
       size: 256,
      }),
     });
    return interaction.followUp({ ephemeral: true, embeds: [embed] });
   }

   if (data.synopsis.length > 1024) {
    data.synopsis = data.synopsis.slice(0, 1021) + "...";
   }

   const embed = new EmbedBuilder()
    .setColor(guildSettings?.embedColor || client.config.defaultColor)
    .setTimestamp()
    .setTitle(data.canonicalTitle || query.splice(0, 20))
    .setURL(`https://kitsu.io/anime/${data.slug}`)
    .setDescription(data.synopsis || "None!")
    .addFields([
     {
      name: `${client.config.emojis.flag_gb} English Title`,
      value: codeBlock(data.titles?.en || "None!"),
      inline: false,
     },
     {
      name: `${client.config.emojis.flag_jp} Japanese Title`,
      value: codeBlock(data.titles?.ja_jp || "None!"),
      inline: false,
     },
     {
      name: `${client.config.emojis.book} Type`,
      value: codeBlock(data.showType || "N/A!"),
      inline: true,
     },
     {
      name: `${client.config.emojis.counting} Episodes`,
      value: codeBlock(`${data.episodeCount || "N/A!"} episodes (${data.episodeLength || "N/A!"} minutes each)`),
      inline: true,
     },
     {
      name: `${client.config.emojis.star} Score`,
      value: codeBlock(`${data.averageRating || "N/A!"} (${data.favoritesCount} favorites)`),
      inline: true,
     },
     {
      name: `${client.config.emojis.star2} Rating`,
      value: codeBlock(`${data.ageRating || "N/A!"} ${"- " + data.ageRatingGuide || ""}`),
      inline: true,
     },
     {
      name: `${client.config.emojis.calendar_spillar} Aired`,
      value: codeBlock(`${data.startDate || "N/A!"} - ${data.endDate || "N/A!"}`),
      inline: true,
     },
     {
      name: `${client.config.emojis.barchart} Popularity`,
      value: codeBlock(`${"#" + data.popularityRank + " (Most Popular Anime)" || "N/A!"}\n${"#" + data.ratingRank + " (Highest Rated Anime)" || "N/A!"}`),
      inline: false,
     },
    ])
    .setFooter({
     text: `Requested by ${interaction.member.user.username}`,
     iconURL: interaction.member.user.displayAvatarURL({
      size: 256,
     }),
    });

   data.posterImage?.original ? embed.setThumbnail(data.posterImage.original) : null;

   return interaction.followUp({ embeds: [embed] });
  } catch (err) {
   client.errorMessages.internalError(interaction, err);
  }
 },
};
