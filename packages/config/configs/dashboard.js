import dotenv from "dotenv";
dotenv.config({ path: "../../../.env" });

/* Dashboard related config */
export const dashboardConfig = {
 enabled: true, // boolean. Bot should display the dashboard?
 title: "Majo.exe", // string. Dashboard title
 description: "Majo.exe - Discord bot for Fun, Memes, Images, Giveaway, Economy and Anime! Majo.exe serve over 117 commands!", // string. Dashboard description
 url: "https://beta.majoexe.xyz", // string. Dashboard url
 logo: "https://media.discordapp.net/attachments/905722570286960650/997068981187919962/logo-modified.png", // string. Logo displayed in dashboard sidebar
 image: "/opengraph-image", // string. Dashboard open graph image
};
