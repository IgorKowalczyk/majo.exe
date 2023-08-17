import { formatNumber } from "@majoexe/util/functions";
import { loadImage, createCanvas } from "@napi-rs/canvas";

/**
 *
 * @param {*} currentXp Number of current xp
 * @param {*} requiredXp Number of required xp
 * @returns number
 */
function calculateProgress(currentXp, requiredXp) {
 if (requiredXp <= 0) return 1;
 if (currentXp > requiredXp) return 596.5 || 0;

 const mx = 0;
 if (currentXp < mx) return 0;

 const nx = currentXp - mx;
 const nr = requiredXp - mx;
 return (nx * 615) / nr;
}

/**
 * @param {user} user The user object
 * @param {xp} xp The xp object
 * @param {color} color The color of the progress bar
 * @returns {Buffer} The buffer of the image
 **/
export async function createXPCard(user, xp, color) {
 const avatar = await loadImage(user.displayAvatarURL({ format: "png", size: 128 }));
 const canvas = createCanvas(934, 282);
 const ctx = canvas.getContext("2d");

 ctx.globalAlpha = 1;

 const name = user.globalName.length > 20 ? user.globalName.substring(0, 20) + "..." : user.globalName;

 ctx.font = "bold 36px Quicksand";
 ctx.fillStyle = "#ffffff";
 ctx.textAlign = "start";
 ctx.fillText(name, 257 + 15, 125);

 ctx.font = "30px Quicksand";
 ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
 ctx.fillText(`@${user.username}`, 257 + 15, 164);

 const levelText = `Level: ${formatNumber(parseInt(xp.level))}`;
 ctx.font = "bold 36px Quicksand";
 ctx.fillStyle = "#FFFFFF";
 ctx.fillText(levelText, canvas.width - ctx.measureText(levelText).width - 43, 82);

 const xpText = `XP: ${formatNumber(xp.xp)}`;
 ctx.font = "30px Quicksand";
 ctx.fillText("/ " + formatNumber(xp.xpNeeded), 670 + ctx.measureText(xpText).width + 15, 164);
 ctx.fillText(xpText, 670, 164);

 const progress = calculateProgress(xp.xp, xp.xpNeeded);

 // Draw progress bar
 ctx.beginPath();
 ctx.fillStyle = "#484b4E";
 ctx.arc(257 + 18.5, 147.5 + 18.5 + 36.25, 18.5, 1.5 * Math.PI, 0.5 * Math.PI, true);
 ctx.fill();
 ctx.fillRect(257 + 18.5, 147.5 + 36.25, 615 - 18.5, 37.5);
 ctx.arc(257 + 615, 147.5 + 18.5 + 36.25, 18.75, 1.5 * Math.PI, 0.5 * Math.PI, false);
 ctx.fill();

 // Draw progress bar
 ctx.beginPath();
 ctx.fillStyle = color;
 ctx.arc(257 + 18.5, 147.5 + 18.5 + 36.25, 18.5, 1.5 * Math.PI, 0.5 * Math.PI, true);
 ctx.fill();
 ctx.fillRect(257 + 18.5, 147.5 + 36.25, progress, 37.5);
 ctx.arc(257 + 18.5 + progress, 147.5 + 18.5 + 36.25, 18.75, 1.5 * Math.PI, 0.5 * Math.PI, false);
 ctx.fill();

 // Draw avatar
 ctx.beginPath();
 ctx.arc(125 + 10, 125 + 20, 100, 0, Math.PI * 2, true);
 ctx.closePath();
 ctx.clip();
 ctx.drawImage(avatar, 35, 45, 180 + 20, 180 + 20);

 return canvas.toBuffer("image/png");
}
