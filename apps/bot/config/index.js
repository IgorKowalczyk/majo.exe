import { emojis } from "./emojis.js";

export const botConfig = {
 /* Bot related config */

 /*
  Donation links
 */
 donate: {
  enabled: true, // boolean. Display donations command
  links: [
   {
    name: "Patreon",
    url: "https://www.patreon.com/igorkowalczyk",
    icon: emojis.patreon_logo,
   },
   {
    name: "Ko-Fi",
    url: "https://ko-fi.com/igorkowalczyk",
    icon: emojis.kofi_logo,
   },
   {
    name: "Buy Me a Coffee",
    url: "https://buymeacoffee.com/majonezexe",
    icon: emojis.buymeacoffee_logo,
   },
   {
    name: "Open Collective",
    url: "https://opencollective.com/igorkowalczyk",
    icon: emojis.open_collective_logo,
   },
  ],
 },
};
