const axios = require("axios");
const cheerio = require("cheerio");

const YouTube = require("simple-youtube-api");
const youtube = new YouTube("AIzaSyC9wP9rVzyoeAt0EFNZmYmz0jPlpaCfhtg");

const parseDuration = (string) => {
  const units = string.split(":").reverse();
  let hours = 0;
  let minutes = 0;
  let seconds = 0;
  while (units.length) {
    if (!seconds) seconds = parseInt(units.shift());
    else if (!minutes) minutes = parseInt(units.shift());
    else if (!hours) hours = parseInt(units.shift());
  }
  minutes += hours * 60;
  seconds += minutes * 60;
  return seconds;
};

const search = async (query, limit) => {
  return await youtube.searchVideos(query, limit);
};

module.exports.parseDuration = parseDuration;
module.exports.search = search;
module.exports = search;
