const Discord = require("discord.js")
const { NovelCovid } = require("novelcovid");
const track = new NovelCovid();

module.exports.run = async (client, message, args) => {
    
    if(!args.length) {
      return message.channel.send("Please give the name of country")
    }
    
    if(args.join(" ") === "all") {
      let corona = await track.all() //it will give global cases
      
	    if (!corona) return message.channel.send({embed: {
            color: 16734039,
            title: "Please enter a value!"
        }})
		
      let embed = new Discord.RichEmbed()
      .setTitle("Global Cases")
      .setColor("RANDOM")
      .setDescription("Sometimes cases number may differ from small amount.")
      .addField("Total Cases", corona.cases, true)
      .addField("Total Deaths", corona.deaths, true)
      .addField("Total Recovered", corona.recovered, true)
      .addField("Today's Cases", corona.todayCases, true)
      .addField("Today's Deaths", corona.todayDeaths, true)
      .addField("Active Cases", corona.active, true);
      
      return message.channel.send(embed)
      
      
      
    } else {
      let corona = await track.countries(args.join(" ")) //change it to countries
      
	  	    if (!corona) return message.channel.send({embed: {
            color: 16734039,
            title: "Please enter a country!"
        }})
		
      let embed = new Discord.RichEmbed()
      .setTitle(`${corona.country}`)
      .setColor("RANDOM")
      .setDescription("Sometimes cases number may differ from small amount.")
      .addField("Total Cases", corona.cases, true)
      .addField("Total Deaths", corona.deaths, true)
      .addField("Total Recovered", corona.recovered, true)
      .addField("Today's Cases", corona.todayCases, true)
      .addField("Today's Deaths", corona.todayDeaths, true)
      .addField("Active Cases", corona.active, true);
      
      return message.channel.send(embed)
      
      
    }.catch((err) => message.channel.send({embed: {
                color: 16734039,
                title: "Something went wrong... :cry:"
            }}));
    
    
  }
  
module.exports.help = {
    name: "corona",
    description: "Get the stats of corona VIRUS",
    usage: "corona <all>/<country>",
    type: "Utility"  
}