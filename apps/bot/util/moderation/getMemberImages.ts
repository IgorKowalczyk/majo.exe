import { EmbedBuilder, ActionRowBuilder, ButtonStyle, ButtonBuilder, ChatInputCommandInteraction, type ColorResolvable, GuildMember, MessageFlags } from "discord.js";
import type { Majobot } from "@/index";

export async function getUserAvatar(client: Majobot, interaction: ChatInputCommandInteraction, color: ColorResolvable) {
  try {
    if (!interaction.guild) return client.errorMessages.createSlashError(interaction, "❌ This command can only be used in a server.");

    const user = interaction.options.getMember("user") as GuildMember;
    const serverAvatar = interaction.options.getBoolean("guild_avatar") || false;

    if (!user || !user.id) {
      return client.errorMessages.createSlashError(interaction, "❌ You need to provide a user to check avatar");
    }

    let avatar;
    if (serverAvatar) {
      const response = await fetch(`https://discord.com/api/guilds/${interaction.guild.id}/members/${user.id}`, {
        headers: {
          Authorization: `Bot ${client.token}`,
        },
      });
      const data = await response.json();
      if (data.avatar) {
        const ext = data.avatar.startsWith("a_") ? ".gif?size=4096" : ".png?size=4096";
        avatar = `https://cdn.discordapp.com/guilds/${interaction.guild.id}/users/${user.id}/avatars/${data.avatar}${ext}`;
      } else {
        avatar = user.user.displayAvatarURL({
          size: 4096,
        });
      }
    } else {
      avatar = user.user.displayAvatarURL({
        size: 4096,
      });
    }

    const embed = new EmbedBuilder()
      .setColor(color)
      .setTimestamp()
      .setTitle(`${user.user.globalName || user.user.username}${serverAvatar ? " server" : ""} avatar`)
      .setImage(avatar)
      .setFooter({
        text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL({
          size: 256,
        }),
      });

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder() // prettier
        .setLabel("Avatar")
        .setStyle(ButtonStyle.Link)
        .setURL(avatar)
    );

    return interaction.followUp({ flags: [MessageFlags.Ephemeral], embeds: [embed], components: [row] });
  } catch (err) {
    client.errorMessages.internalError(interaction, err);
  }
}

export async function getUserBanner(client: Majobot, interaction: ChatInputCommandInteraction, color: ColorResolvable) {
  try {
    if (!interaction.guild) return client.errorMessages.createSlashError(interaction, "❌ This command can only be used in a server.");
    const user = interaction.options.getMember("user") as GuildMember;
    const serverBanner = interaction.options.getBoolean("guild_banner") || false;

    if (!user || !user.id) {
      return client.errorMessages.createSlashError(interaction, "❌ You need to provide a user to check banner");
    }

    let banner;
    if (serverBanner) {
      const response = await fetch(`https://discord.com/api/guilds/${interaction.guild.id}/members/${user.id}`, {
        headers: {
          Authorization: `Bot ${client.token}`,
        },
      });
      const data = await response.json();
      if (data.banner) {
        const ext = data.banner.startsWith("a_") ? ".gif?size=4096" : ".png?size=4096";
        banner = `https://cdn.discordapp.com/banners/${user.id}/${data.banner}${ext}`;
      } else {
        banner = null;
      }
    } else {
      const response = await fetch(`https://discord.com/api/users/${user.id}`, {
        headers: {
          Authorization: `Bot ${client.token}`,
        },
      });
      const data = await response.json();
      if (data.banner) {
        const ext = data.banner.startsWith("a_") ? ".gif?size=4096" : ".png?size=4096";
        banner = `https://cdn.discordapp.com/banners/${user.id}/${data.banner}${ext}`;
      } else {
        banner = null;
      }
    }

    if (!banner) {
      return client.errorMessages.createSlashError(interaction, "❌ This user doesn't have a banner");
    }

    const embed = new EmbedBuilder()
      .setColor(color)
      .setTimestamp()
      .setTitle(`${user.user.globalName || user.user.username}${serverBanner ? " server" : ""} banner`)
      .setImage(banner)
      .setFooter({
        text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL({
          size: 256,
        }),
      });

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder() // prettier
        .setLabel("Banner")
        .setStyle(ButtonStyle.Link)
        .setURL(banner)
    );

    return interaction.followUp({ flags: [MessageFlags.Ephemeral], embeds: [embed], components: [row] });
  } catch (err) {
    client.errorMessages.internalError(interaction, err);
  }
}
