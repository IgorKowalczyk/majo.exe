import dotenv from "dotenv";
dotenv.config({ path: "../../../.env" });

/* Dashboard related config */
export const dashboardConfig = {
 enabled: true, // boolean. Bot should display the dashboard?
 title: "Majo.exe", // string. Dashboard title
 description: "Majo.exe - Discord bot for Fun, Memes, Images, Giveaway, Economy and Anime! Majo.exe serve over 117 commands!", // string. Dashboard description
 url: "https://majoexe.xyz", // string. Dashboard url
 logo: "https://media.discordapp.net/attachments/905722570286960650/997068981187919962/logo-modified.png", // string. Logo displayed in dashboard sidebar
 image: "/opengraph-image", // string. Dashboard open graph image
};

// Dashboard redirects
export const dashboardRedirects = [
 {
  source: "/discord",
  destination: "https://discord.gg/sgt4QEyDxK",
  permanent: true,
 },
 {
  source: "/server",
  destination: "https://discord.gg/sgt4QEyDxK",
  permanent: true,
 },
];

// Dashboard headers
export const dashboardHeaders = [
 {
  source: "/(.*)",
  headers: [
   {
    key: "Referrer-Policy",
    value: "no-referrer",
   },
   {
    key: "X-Content-Type-Options",
    value: "nosniff",
   },
   {
    key: "X-DNS-Prefetch-Control",
    value: "on",
   },
   {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
   },
   {
    key: "X-XSS-Protection",
    value: "1; mode=block",
   },
   {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
   },
  ],
 },
];
