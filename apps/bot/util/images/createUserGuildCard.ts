import { shortenText } from "@majoexe/util/functions/util";
import { loadImage, createCanvas } from "canvas";
import type { Guild, User } from "discord.js";

export async function createUserGuildCard(user: User, guild: Guild): Promise<Buffer> {
 const avatar = await loadImage(user.avatar || user.defaultAvatarURL);
 const canvas = createCanvas(934, 282);
 const context = canvas.getContext("2d");

 context.globalAlpha = 1;

 const name = shortenText(user.globalName || user.username, 20);

 // Draw guild name
 context.font = "normal 30px Quicksand";
 context.fillStyle = "rgba(255, 255, 255, 0.4)";
 context.fillText(`${guild.name}`, 272, 100);

 // Draw username
 context.font = "bold 75px Quicksand";
 context.fillStyle = "#ffffff";
 context.fillText(name, 272, 164);

 // Draw member count
 context.font = "normal 30px Quicksand";
 context.fillStyle = "rgba(255, 255, 255, 0.4)";
 context.fillText(`Member #${guild.memberCount}`, 272, 204);

 // Draw avatar
 context.beginPath();
 context.arc(135, 145, 100, 0, Math.PI * 2, true);
 context.closePath();
 context.clip();
 context.drawImage(avatar, 35, 45, 200, 200);

 return canvas.toBuffer("image/png");
}
