/* Dashboard related config */
export const dashboardConfig = {
 title: "Nyxia", // string. Dashboard title, will be shown in browser tab and in search results
 url: "https://nyxia.vercel.app", // string. Dashboard url, to Disable dashboard, set this to null (Note: when you change it to null the dashboard will not work and commands related to dashboard will not work)
 logo: "/assets/avatar.png", // string. Logo of your bot
 description: "Nyxia - the ultimate Discord bot for fun, memes, images, giveaways, and anime! Nyxia boasts an impressive array of over 120 commands, ensuring there's something for everyone. Whether you're looking to entertain your server with hilarious memes, host exciting giveaways, or dive into the world of anime, Nyxia has you covered!", // string. Dashboard description, will be shown in search results
 image: "/opengraph-image", // string. Dashboard open graph image (Note: this is not a url, this is a path to the image/generator, for example: /opengraph-image)
};

// Dashboard redirects
export const dashboardRedirects = [
 {
  source: "/discord",
  destination: "https://discord.gg/sJRAsZaYry",
  permanent: true,
 },
 {
  source: "/invite",
  destination: "/api/invite",
  permanent: true,
 },
 {
  source: "/support",
  destination: "/discord",
  permanent: true,
 },
 {
  source: "/contact",
  destination: "/discord",
  permanent: true,
 },
 {
  source: "/server",
  destination: "/discord",
  permanent: true,
 },
 {
  source: "/status",
  destination: "https://status.tsukiyodevteam.xyz",
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
