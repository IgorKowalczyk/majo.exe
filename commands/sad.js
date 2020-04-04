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
          message.channel.send({file: outputfile}).then(function () {
            // delete file
            fs.unlink(outputfile);
          });
        });          
      });              
    }).catch(function (err) {
        // handle an exception
              message.delete();
        return message.channel.send({embed: {
            color: 3447003,
            title: "Invaild image!"
        }}).then(msg => msg.delete(2132));
    });    
  } else {
          message.delete();
        return message.channel.send({embed: {
            color: 3447003,
            title: "Enter a image!"
        }}).then(msg => msg.delete(2132));
  }
}

module.exports.help = {
    name: "sad",
    description: "Makes your image sad",
    usage: "sad <image>",
    type: "Fun" 
}