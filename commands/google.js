const google = require('google');

module.exports.run = async (client, message, args) => {
  try { 
    if (!args[0]) return message.reply('You need to input somthing to search!');
    google.resultsPerPage = 5;

    google(args.join(' '), async (err, res) => {
      
      if (err) return message.channel.send('There was an error!\n' + err);
      
      if (!res.links[0].href) return message.reply('I couldent find anything for your search term!');
      
      let output = '';
      let i = 1;
      
      res.links.forEach(async (l) => {
        output += '\n' + i + '. ' + l.title;
        i++;
      });
      
            
      let page = await client.awaitReply(message, `Please choose the Result you want${output}`);
      if (isNaN(page)) return message.reply('That\'s not a number!');
      let pagenum = Number(page) - 1;
      
      let link = res.links[pagenum];
      
      let embed = new client.Embed('normal', {
        title: link.title,
        url: link.href,
        footer: link.href,
        description: client.truncate(link.description, 2000)
      });
      
      message.channel.send(embed);
    });
  } catch (err) {
    message.channel.send('There was an error!\n' + err).catch();
  }
}

module.exports.help = {
    name: "google",
    description: "Search on Google",
    usage: "google <query>",
    type: "Fun" 
}
