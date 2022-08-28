module.exports = {
 // Stauts config
 display_status: "online", // online | idle | invisible | dnd
 options: {
  type: "dynamic", // dynamic | static
 },
 static: {
  // Only if options.stype = static
  message: `🇺🇦 | Russia, stop the war!`,
  type: "WATCHING", // PLAYING | STREAMING | LISTENING | WATCHING
 },
 dates: {
  // Special dates for change status [Date Format: MM-DD]. If null = no special dates.
  "02-14": [
   // Array
   {
    message: `Happy valentine's! ❤️`,
    type: "PLAYING", // PLAYING | STREAMING | LISTENING | WATCHING
   },
   {
    message: `Can you be my valentine? ❤️`,
    type: "PLAYING",
   },
  ],
  "05-13": [
   {
    message: `Happy birthday Discord! ❤️`,
    type: "PLAYING", // PLAYING | STREAMING | LISTENING | WATCHING
   },
  ],
  "03-22": [
   {
    message: `Happy birthday Luna! 🌙`,
    type: "PLAYING", // PLAYING | STREAMING | LISTENING | WATCHING
   },
  ],
  "01-01": [
   {
    message: `Happy birthday Lav! 🦴`,
    type: "PLAYING", // PLAYING | STREAMING | LISTENING | WATCHING
   },
  ],
  "01-22": [
   {
    message: `Happy birthday Arbuz! 🍉`,
    type: "PLAYING", // PLAYING | STREAMING | LISTENING | WATCHING
   },
  ],
  "04-30": [
   {
    message: ` heaven... Goodbye Grandma... 🕯️`,
    type: "WATCHING", // PLAYING | STREAMING | LISTENING | WATCHING
   },
  ],
 },
 dynamic: [
  {
   message: `with your heart 💔`,
   type: "PLAYING",
  },
  {
   message: `with over {{ members }} users {{ emoji }}`,
   type: "PLAYING",
  },
  {
   message: `the haters hate {{ emoji }}`,
   type: "WATCHING",
  },
  {
   message: `you (turn around) 🔪`,
   type: "WATCHING",
  },
  {
   message: `grass grow 🌱`,
   type: "WATCHING",
  },
  {
   message: `over {{ servers }} servers {{ emoji }}`,
   type: "WATCHING",
  },
  {
   message: `Déjà vu 🎶`,
   type: "WATCHING",
  },
  {
   message: `the world crumble 🤯`,
   type: "WATCHING",
  },
  {
   message: `over you from above 👼`,
   type: "WATCHING",
  },
  {
   message: `your conversations {{ emoji }}`,
   type: "LISTENING",
  },
  {
   message: `Mahou Shoujo Site {{ emoji }}`,
   type: "WATCHING",
  },
  {
   message: `Youtube {{ emoji }}`,
   type: "WATCHING",
  },
  {
   message: `exploits ⛔`,
   type: "WATCHING",
  },
  {
   message: `new slash commands (/)`,
   type: "WATCHING",
  },
 ],
 emojis: ["😆", "😄", "😎", "😂", "🥳", "😘", "😜", "😁", "😉", "🥰", "😍", "🤯", "🤩", "😇", "😊", "☺️", "😌", "😋", "😳", "😚", "😏", "😱", "🥵", "😶‍🌫️", "🤕", "😴", "( ͡° ͜ʖ ͡°)"], // Smirk is here ;D. Idea by Luna_CatArt#4514. Pls don't ask XD
};
