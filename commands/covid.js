const Discord = require("discord.js");
const fetch = require("node-fetch");
const moment = require("moment");
const axios = require("axios");


module.exports.run = async (client, message, args) => {
  const country = args.join(" ");
  const data = await axios({
    method: "GET",
    url: `https://api.covid19api.com/live/country/${country}`,
  });
  let d = data.data[0];
  if (!data || data.length <= 0) {
    let dEmbed = new Discord.RichEmbed()
      .setTitle("Error")
      .setDescription(
        "Could not fetch data. Please try again or make sure the country is correctly spelled!"
      )
      .setTimestamp()
    message.channel.send(dEmbed);
  }
  const embed = new Discord.RichEmbed()
    .setTitle("Global Covid-19 Live Data")
    .setThumbnail(
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQla-GbabU21gOd7omPLBcKZJBoiRA2V4zEhTpLx0zLSYhJSBXJ&usqp=CAU"
    )
    .addField("Country", d.Country)
    .addField("Confirmed", d.Confirmed.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","))
    .addField("Recovered", d.Recovered.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","))
    .addField("Deaths", d.Deaths.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","))
    .addField("Active", d.Active.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","))
    .setTimestamp()
    .setColor("RANDOM");

  message.channel.send(embed);
  if (!country) {
    let uEmbed = new Discord.RichEmbed()
      .setTitle("Error")
      .addField("Usage", `${prefix}` + " covid <country>")
      .setTimestamp()
    return message.channel.send(uEmbed);
  }
}

module.exports.help = {
    name: "covid",
    description: "Display a Covid-19 stats",
    usage: "covid country",
    type: "Utility"  
}
