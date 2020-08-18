# Majo.exe

An advanced Discord bot, contains commands for moderation, fun, music, economics and NSFW.

[![Discord](https://discord.com/api/guilds/666599184844980224/widget.png?style=banner2)](https://igorkowalczyk.github.io/majobot/server)

[![Jekyll](https://github.com/IgorKowalczyk/majobot/workflows/Jekyll/badge.svg)](https://igorkowalczyk.github.io/majobot)
[![Node.js Workflow](https://github.com/igorkowalczyk/majobot/workflows/Node.js%20Workflow/badge.svg)](https://igorkowalczyk.github.io/majobot)
[![GitHub License](https://img.shields.io/github/license/igorkowalczyk/majobot?color=%2334D058&logo=github&logoColor=959DA5&labelColor=24292E)](https://igorkowalczyk.github.io/majobot)
[![Version](https://img.shields.io/github/package-json/v/igorkowalczyk/majobot?color=%2334D058&logo=github&logoColor=959DA5&labelColor=24292E)](https://github.com/igorkowalczyk/majobot/releases)

# Invite

Go to [this link](https://igorkowalczyk.github.io/majobot/authorize) and authorize the bot (requires server manage premission) to your server.

# Hosting

We host this bot. Majo.exe will be online 24/7.

# Self-Hosting

1. Clone [this repository](https://github.com/igorkowalczyk/majobot),
2. Run `npm install`,
3. Grab a token and client secret on [Discord's developer portal](https://discord.com/developers/applications),
4. Fill `config.json` and `dashboard.json` with your variables (`dashboard.json` is the config file for Web Dashboard, ignore this file if you not use Majo Dashboard),
5. Create a `.env` file and add a `BOT_TOKEN` environmental variable whose value is the token above. 
6. In `.env` Set `PREFIX` - this is your bot prefix, a `SECRET` - this is your client secret variabble (Used for web-dashboard), a Google Trakcing ID (For Website analytics) - `UA=TRACKING-ID` if you don't have to use analytics just delete the settings value and add a `DASHBOARD=[true/false]` value - if `true` the bot will be hosted with web dasboard, if `false` the bot will be hosted without web dashboard (The `.env` file was private).
7. Run `node index.js`
> NOTE: See the example `.env` file below!
## Example `.env` file

```
# Environment Config

# store your secrets and config variables in here
# only invited collaborators will be able to see your .env values

# reference these in your code with process.env.SECRET


TOKEN=YOUR-TOKEN-GOES-HERE
PREFIX=!majo
DASHBOARD=true
SECRET=YOUR-BOT-CLIENT-SECRET
UA=YOUR-GOOGLE-TRACKING-ID

# !majo is the default prefix, you can change it later.

# note: .env is a shell file so there can't be spaces around =

```
