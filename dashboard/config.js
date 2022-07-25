export const meta = {
 title: "Majo.exe",
 author: "Igor Kowalczyk",
 description: "Majo.exe - Discord bot for Fun, Memes, Images, Giveaway, Economy, Anime and NSFW! Majo.exe serve over 117 commands!",
 //url: "https://beta.majoexe.xyz",
 url: process.env.NEXTAUTH_URL,
 theme_color: "#5865F2",
 type: "website",
};

export const credentials = {
 clientId: process.env.CLIENT_ID,
 clientSecret: process.env.CLIENT_SECRET,
 secret: process.env.SECRET,
};

export const feautures = {
 smoothTransition: true,
};

export const social = {
 logo: "https://media.discordapp.net/attachments/905722570286960650/997068981187919962/logo-modified.png",
 image: "/assets/banner.png",
};

export const ads = {
 caPub: process.env.GOOGLE_CA_PUB,
}