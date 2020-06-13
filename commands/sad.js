const Discord = module.require("discord.js");
const Jimp = require("jimp");
const fs = require("fs");

module.exports.run = async (client, message, args) => {
  if (args.length >= 1) {
    Jimp.read(args[0]).then(function (image) {
      image.greyscale(function(err, image) {
        image.quality(2)
         
        let outputfile = "./output/" + Math.random().toString(36).substr(2, 5) + "sad." + image.getExtension(); // create a random name for the output file
        image.write(outputfile, function () {
          // upload file
    var embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setTitle(":cry: Very sad image:")
    .setFooter("Requested by" + message.author)
    .setTimestamp()

  message.channel.send(embed=embed)
  message.channel.send({file: outputfile}).then(function () {
            // delete file
            fs.unlink(outputfile);
          });
        });          
      });              
    }).catch(function (err) {
        // handle an exception
        return message.channel.send({embed: {
            color: 16734039,
            description: "Invaild image!"
        }})
    });    
  } else {
        return message.channel.send({embed: {
            color: 16734039,
            description: "Please enter a image!"
        }})
  }
}

module.exports.help = {
    name: "sad",
    description: "Makes your image sad",
    usage: "sad <image>",
    type: "Fun" 
}