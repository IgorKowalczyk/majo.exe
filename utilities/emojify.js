module.exports = (input) => {
 if (!input) throw new Error("You must provide text to convert it!");
 const numWords = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
 const charTable = {
  "!": "exclamation",
  "?": "question",
  "+": "heavy_plus_sign",
  "-": "heavy_minus_sign",
  "×": "heavy_multiplication_x",
  "*": "asterisk",
  $: "heavy_dollar_sign",
  "/": "heavy_division_sign",
 };

 input = [...input.toLowerCase()];
 let finalString = "";
 for (let i = 0; i < input.length; i++) {
  let rawChar = input[i];
  let emojiText = "";
  if (rawChar.match(/[a-z]/i)) {
   emojiText = `regional_indicator_${rawChar}`;
  } else if (rawChar.match(/[0-9]/i)) {
   emojiText = `${numWords[parseInt(rawChar)]}`;
  } else if (rawChar !== " ") {
   let symbol = charTable[rawChar];
   if (!symbol) continue;
   emojiText = symbol;
  } else {
   finalString += `   `;
   continue;
  }
  finalString += `:${emojiText}: `;
 }
 return finalString.trimEnd();
};
