const got = require('got');
const utils = require('../utils');
const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {
  
  
     if(message.guild === null)return;

  
{
        if(args.length < 1) {
            message.reply('You must specify a repository or search term!');
        }

        const input = args.join(' ');

            const res = await got(`https://api.github.com/search/repositories?q=${args.join('+')}`, { json: true });
            const json = res.body;
            if(json.total_count < 1) {
                message.channel.send(`No results found for '${args.join(' ')}'`);

            }

            message.channel.send(`:white_check_mark: Top 3 Results:`);

            json.items.slice(0, 3).forEach(item => {
                message.channel.send({
                    embed: utils.embed('', getInfo(item))
                });
            });

            await message.channel.stopTyping();
        }
};

function getInfo(json) {
    return `**${json.full_name}**
    
    \t**Description:** _${json.desription || 'None provided'}_
    \t**Owner:** [${json.owner.login}](${json.owner.html_url})
    \t**Primary Language:** \`${json.language}\`
    
    \t:house:  [Home Page](${json.html_url})  :small_red_triangle_down:  [Downloads](${json.html_url}/releases)  :exclamation:  [Issues](${json.html_url}/issues)
    
    \t:negative_squared_cross_mark:  \`${json.open_issues_count}\` open issues  :star:  \`${json.stargazers_count}\` stargazers  :eyes:  \`${json.subscribers_count || json.watchers_count}\` watchers
    
    \tDo \`git clone ${json.clone_url}\` to clone this repository
    `;
};

module.exports.help = {
    name: "github",
    description: "Search for github repo",
    usage: "github <repo>",
    type: "Fun"  
}