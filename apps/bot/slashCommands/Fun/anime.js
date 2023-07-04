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

   const request = await fetch(`https://kitsu.io/api/edge/anime?filter[text]=${query}&page%5Boffset%5D=0&page%5Blimit%5D=1`, {
    method: "GET",
    headers: {
     "Content-Type": "application/vnd.api+json",
     Accept: "application/vnd.api+json",
    },
   });
   if (!request || !request.ok) {
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
   const json = await request.json();
   if (!json || !json.data || json.data.length < 1) {
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
   const data = json.data[0].attributes;

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
    .setColor(guildSettings?.embedColor || client.config.global.defaultColor)
    .setTimestamp()
    .setTitle(data.canonicalTitle || query.splice(0, 20))
    .setURL(`https://kitsu.io/anime/${data.slug}`)
    .setDescription(data.synopsis || "None!")
    .addFields([
     {
      name: `${client.botEmojis.flag_gb} English Title`,
      value: codeBlock(data.titles?.en || "None!"),
      inline: false,
     },
     {
      name: `${client.botEmojis.flag_jp} Japanese Title`,
      value: codeBlock(data.titles?.ja_jp || "None!"),
      inline: false,
     },
     {
      name: `${client.botEmojis.book} Type`,
      value: codeBlock(data.showType || "N/A!"),
      inline: true,
     },
     {
      name: `${client.botEmojis.counting} Episodes`,
      value: codeBlock(`${data.episodeCount || "N/A!"} episodes (${data.episodeLength || "N/A!"} minutes each)`),
      inline: true,
     },
     {
      name: `${client.botEmojis.star} Score`,
      value: codeBlock(`${data.averageRating || "N/A!"} (${data.favoritesCount} favorites)`),
      inline: true,
     },
     {
      name: `${client.botEmojis.star2} Rating`,
      value: codeBlock(`${data.ageRating || "N/A!"} ${"- " + data.ageRatingGuide || ""}`),
      inline: true,
     },
     {
      name: `${client.botEmojis.calendar_spillar} Aired`,
      value: codeBlock(`${data.startDate || "N/A!"} - ${data.endDate || "N/A!"}`),
      inline: true,
     },
     {
      name: `${client.botEmojis.barchart} Popularity`,
      value: codeBlock(`${"#" + data.popularityRank + " (Most Popular Anime)" || "N/A!"}\n${"#" + data.ratingRank + " (Highest Rated Anime)" || "N/A!"}`),
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

   data.posterImage?.original ? embed.setThumbnail(data.posterImage?.original) : null;

   return interaction.followUp({ embeds: [embed] });
  } catch (err) {
   client.errorMessages.generateErrorMessage(interaction, err);
  }
 },
};
