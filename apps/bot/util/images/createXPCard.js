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
 const avatar = await loadImage(user.avatar);
 const canvas = createCanvas(934, 282);
 const context = canvas.getContext("2d");

 context.globalAlpha = 1;

 const name = user.globalName.length > 20 ? user.globalName.substring(0, 20) + "..." : user.globalName;

 context.font = "bold 36px Quicksand";
 context.fillStyle = "#ffffff";
 context.textAlign = "start";
 context.fillText(name, 257 + 15, 125);

 context.font = "30px Quicksand";
 context.fillStyle = "rgba(255, 255, 255, 0.4)";
 context.fillText(`@${user.globalName || user.username}`, 257 + 15, 164);

 const levelText = `Level: ${formatNumber(parseInt(xp.level))}`;
 context.font = "bold 36px Quicksand";
 context.fillStyle = "#FFFFFF";
 context.fillText(levelText, canvas.width - context.measureText(levelText).width - 43, 82);

 const xpText = `XP: ${formatNumber(xp.xp)}`;
 context.font = "30px Quicksand";
 context.fillText("/ " + formatNumber(xp.xpNeeded), 670 + context.measureText(xpText).width + 15, 164);
 context.fillText(xpText, 670, 164);

 const progress = calculateProgress(xp.xp, xp.xpNeeded);

 // Draw progress bar
 context.beginPath();
 context.fillStyle = "#484b4E";
 context.arc(257 + 18.5, 147.5 + 18.5 + 36.25, 18.5, 1.5 * Math.PI, 0.5 * Math.PI, true);
 context.fill();
 context.fillRect(257 + 18.5, 147.5 + 36.25, 615 - 18.5, 37.5);
 context.arc(257 + 615, 147.5 + 18.5 + 36.25, 18.75, 1.5 * Math.PI, 0.5 * Math.PI, false);
 context.fill();

 // Draw progress bar
 context.beginPath();
 context.fillStyle = color;
 context.arc(257 + 18.5, 147.5 + 18.5 + 36.25, 18.5, 1.5 * Math.PI, 0.5 * Math.PI, true);
 context.fill();
 context.fillRect(257 + 18.5, 147.5 + 36.25, progress, 37.5);
 context.arc(257 + 18.5 + progress, 147.5 + 18.5 + 36.25, 18.75, 1.5 * Math.PI, 0.5 * Math.PI, false);
 context.fill();

 // Draw avatar
 context.beginPath();
 context.arc(125 + 10, 125 + 20, 100, 0, Math.PI * 2, true);
 context.closePath();
 context.clip();
 context.drawImage(avatar, 35, 45, 180 + 20, 180 + 20);

 return canvas.toBuffer("image/png");
}
