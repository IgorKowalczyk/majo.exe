const Discord = module.require("discord.js");

module.exports.run = async (client, message, args) => {
    var v = ~~(Math.random() * 3);  // 0 to 2
    var deathText = ":dizzy_face: :boom: :gun: *UNLUCKY!*";
    var aliveText = ":sweat_smile: :gun: *LUCKY!*";
    var defaultText = ":smile: :gun:";

  message.channel.send({embed: {
    color: 3447003,
    description: message.author + ", You play russian roulette",
    title: defaultText + "   3"
    }})
        .then(msg => {
            setTimeout(function() {
             msg.edit({embed: {
              color: 3447003,
              title: defaultText + "   2",
              description: message.author + ", You play russian roulette"
               }})
                    .then(msg => {
                        setTimeout(function() {
                         msg.edit({embed: {
                          color: 3447003,
                          title: defaultText + "   1",
                          description: message.author + ", You play russian roulette",
                          }})
                                .then(msg => {
                                    setTimeout(function() {
                                        if(v == 0){
                                         msg.edit({embed: {
                                          color: 3447003,
                                          title: deathText,
                                          description: message.author + ", You dead in russian roulette!"
                                         }})
                                        }else{
                                         msg.edit({embed: {
                                          color: 3447003,
                                          title: aliveText,
                                          description: message.author + ", You win in russian roulette!"
                                         }})
                                        }
                                    }, 1000);
                                });
                        }, 1000);
                    });
            }, 1000);
        })
        .catch(console.error);
};

module.exports.help = {
    name: "roulette",
    description: "Simulate a russian roulette game so you don't die IRL by mistake.",
    usage: "quote <id>",
    type: "Fun"   
}
