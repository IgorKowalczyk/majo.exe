> #### *This repository is only used to update [@igorkowalczyk/majobot](https://github.com/igorkowalczyk/majobot) to `Discord.js v12.3.1`. The code here may contain errors and bugs, do not use it on production*

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
- If you want to self-host the bot [look here](#self-hosting)

### Self-Hosting

1. Clone [this repository](https://github.com/igorkowalczyk/majobot),
2. Run `npm install`,
3. Grab a token and client secret on [Discord's developer portal](https://discord.com/developers/applications),
4. Grab a Genius and Youtube API keys here [...](...)
5. Fill `config.json` and `dashboard.json` with your variables (`dashboard.json` is the config file for Web Dashboard, ignore this file if you not use Majo Dashboard),
6. Create a `.env` file  (Remember! The `.env` file is Super-Secret - Don't share it!)
7. In `.env` file set:
    * `TOKEN` - Bot token used to login (Remember! The `TOKEN` value is Super-Secret)
    * `PREFIX` - Bot prefix
    * `YOUTUBE` - Youtube API Key (Used for music)
    * `GENIUS_KEY` - Genius Lyrics API Key (Used for lyrics) 
    * `SESSION_SECRET` - Session secret key, random sequence of words, letterss or numbers
    * `SECRET` - Client secret variabble (Remember! The `SECRET` value is Super-Secret)
    * `ANALYTICS` - Google Trakcing ID (For Website analytics)
    * `ID` - Your bot ID (Not your client ID!)
    * `DASHBOARD=[true/false]` - if `true` the bot will be hosted with web dasboard, if `false` the bot will be hosted without web dashboard
    * `DOMAIN` - your site adress (include `https://` or subfolder)
9. Run `node index.js`
> NOTE: See the example [`.env` file below](#example-env-file)!

### Heroku Hosting
Deploy the app to [Heroku](https://heroku.com)

<!--[![Deploy to heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/igorkowalczyk/majobot/tree/master)-->
[![Deploy to heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/aurolia-css/majo-rebuild/tree/master)

# Example `.env` file

```
# Environment Config

# store your secrets and config variables in here
# only invited collaborators will be able to see your .env values

# reference these in your code with process.env.SECRET


TOKEN=YOUR-TOKEN-GOES-HERE
PREFIX=!majo
YOUTUBE=YOUT-YOUTUBE-API-KEY
GENIUS_KEY=YOUR-GENIUS-KEY
SESSION_SECRET=YOUR-SESSION-SECRET-(RANDOM-WORDS)
SECRET=YOUR-BOT-CLIENT-SECRET
ANALYTICS=YOUR-GOOGLE-TRACKING-ID
ID=YOUR_BOT-ID
DASHBOARD=[true/false]
DOMAIN=YOUR=SITE-ADRESS
# !majo is the default prefix, you can change it later.

# note: .env is a shell file so there can't be spaces around =

```

## `.env` Table
| `.env` | Description | Required |
|---|---|---|
| TOKEN | The bot token, required to run (Remember! The `TOKEN` value is Super-Secret) | :heavy_check_mark: |
| YOUTUBE | Youtube API Key (Used in music) | :heavy_check_mark: |
| PREFIX | The default bot prefix (eg. `!majo`) | :heavy_check_mark: |
| GENIUS_KEY | Genius API Key (Used in music and lyrics) | :heavy_check_mark: |
| SESSION_SECRET | Random sequence of words, letterss or numbers`*` | :x:/:heavy_check_mark: |
| SECRET | The bot client secret (Remember! The `SECRET` value is Super-Secret)`*` | :x:/:heavy_check_mark: |
| ANALYTICS | Google analytics tracking ID, used in Web-Dashboard`^` | :x: |
| DASHBOARD | The Web-Dashboard config value. (eg. `true/false`, default value: `false`)`^` | :x: |
| DOMAIN | Your site adress (include `https://` or subfolder)`*` | :heavy_check_mark: |

`*` = Required to run the web dashboard

`^` = Not required to run but used in web dashboard

# Development

1. To test site in `.env` file set the `DASHBOARD=true/false` value. ([See example `.env` file](#example-env-file))
2. Fill dashboard config (`config.js` and `.env`)
3. Add the redirect uri here: https://discord.com/developers/applications/YOUR-BOT-ID/oauth2
    * ```
       https://your-domain.com
       https://your-domain.com/callback
       https://your-domain.com/dashboard
       https://your-domain.com/dashboard/:guildID
       https://your-domain.com/login
      ```
4. Go to your dashboard in browser (eg. to `localhost`)

# Issues
If you have any issues with the page please create [new issue here](https://github.com/igorkowalczyk/majobot/issues)

# Pull Requests
When submitting a pull request:
- Clone the repo.
- Create a branch off of master and give it a meaningful name (e.g. my-awesome-new-feature).
- Open a [pull request](https://github.com/igorkowalczyk/majobot/pulls) on [GitHub](https://github.com) and describe the feature or fix.

# License
This project is licensed under the MIT. See the [LICENSE](https://github.com/igorkowalczyk/majobot/blob/master/license.md) file for details
