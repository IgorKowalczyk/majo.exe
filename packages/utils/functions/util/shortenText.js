/**
 * Shorten text to a maximum length and add an ellipsis.
 *
 * @param {string} text - The text to shorten.
 * @param {number|25} maxLen - The maximum length of the text.
 * @returns {string} - The shortened text.
 */
export function shortenText(text, maxLen = 24) {
 if (text.length > maxLen) text = text.slice(0, maxLen) + "...";
 return text;
}
