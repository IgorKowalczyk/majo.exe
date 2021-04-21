const Discord = require("discord.js");
const Jimp = require("jimp");
const fs = require("fs");
const config = require("../config");
const prefix = config.prefix;

module.exports = {
 name: "sad",
 aliases: [],
 description: "Makes your image sad",
 category: "Image",
 usage: "sad <image>",
 run: async (client, message, args) => {
  if (message.attachments.size > 0) {
    return message.channel.send({embed: {
      color: 16734039,
      description: "Please enter a image!"
    }})
  } else {
   Jimp.read(message.attachments).then(function (image) {
    image.greyscale(function(err, image) {
     image.quality(2)    
     let outputfile = "./output/" + Math.random().toString(36).substr(2, 5) + "sad." + image.getExtension(); // create a random name for the output file
     image.write(outputfile, function () {
      const sad = new Discord.MessageEmbed()
       .setColor("RANDOM")
       .setTitle(":cry: Very sad image:")
       .setFooter("Requested by" + message.author)
       .setTimestamp()
      message.channel.send(sad)
      message.channel.send({
       files: [outputfile]
      }).then(function () {
       // delete file
       fs.unlink(outputfile);
      });
     });          
    });              
   }).catch(function (err) {
     console.log(err);
    return message.channel.send({embed: {
     color: 16734039,
     description: "Invaild image!"
    }})
   });    
  }
 }
}
