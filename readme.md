> #### *This repository is only used to update [@igorkowalczyk/majobot](https://github.com/igorkowalczyk/majobot) to `Discord.js v12.3.1`. The code here may contain errors and bugs, do not use it on production*

# Majo.exe

Majo.exe have almost everything - Fun, Memes, Images, Giveaway, Economy, Anime and NSFW. This bot serve over 100 commands!

[![Discord](https://discord.com/api/guilds/666599184844980224/widget.png?style=banner2)](https://majoexe.herokuapp.com/server)

[![Node.js](https://github.com/aurolia-css/majo-rebuild/actions/workflows/node.yml/badge.svg)](https://majoexe.herokuapp.com/)
[![Jekyll](https://github.com/aurolia-css/majo-rebuild/workflows/Jekyll/badge.svg)](https://majoexe.herokuapp.com/)
[![GitHub License](https://img.shields.io/github/license/aurolia-css/majo-rebuild?color=%2334D058&logo=github&logoColor=959DA5&labelColor=24292E)](https://majoexe.herokuapp.com/)
[![Version](https://img.shields.io/github/package-json/v/aurolia-css/majo-rebuild?color=%2334D058&logo=github&logoColor=959DA5&labelColor=24292E)](https://github.com/aurolia-css/majo-rebuild/releases)

# Invite

Go to [this link](https://discord.com/oauth2/authorize/?permissions=4294967287&scope=bot&client_id=681536055572430918) and add the bot (requires `MANAGE_GUILD` premission) to your server.
 - [Or to make it easier, visit our website](https://majoexe.herokuapp.com/)
# Hosting

We host this bot. Majo.exe *will be* online 24/7. [Invite Majo here!](#invite)
However, if you want to host Majo yourself - take a look here](#self-hosting)

### Heroku Hosting
Deploy the app to [Heroku](https://heroku.com)
[![Deploy to heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/aurolia-css/majo-rebuild/tree/master)

[Heroku hosting tutorial](#heroku)

### Self-Hosting

1. Clone [this repository](https://github.com/aurolia-css/majo-rebuild)
   `git clone aurolia-css/majo-rebuild` or `git clone igorkowalczyk/majobot` - This is old and unsupported version!
2. Run `npm install` to get all dependencies,
3. Grab a Discord Bot token and client secret on [Discord's developer portal](https://discord.com/developers/applications) [Tutorial](#discord-token)
4. Fill `config.json` with your values (See that some values point to the `.env` file, see it below)
5. Rename `.env.example` (Located in main dir) to `.env`. Remember - the file is super secret, better to not share it.
6. In `.env` file set this values:
    * **Required:**
    * `TOKEN` - Bot token from Discord Developer portal [no. 3]
    * `PREFIX` - Bot prefix, used to run commands eg. `your-prefix help`
    * `AMEAPI` - your Ametyhyste API token [Tutorial how to get it](#ameapi-token)
    * `BRAINID` - Your Brainshop AI Brain ID [Tutorial](#ai-keys)
    * `BRAINKEY` - Your Brainshop AI Brain Key [Tutorial](#ai-keys)
    * `YOUTUBE` - Your Youtube API key [Tutorial](#youtube)
    * **Not required (You can leave them blank):**
    * `DOMAIN` - your website domain, eg `https://example.com`
    * `PORT` - your website port, eg `8080`. [Note: If you are using heroku, not create this value. Heroku binds port automatically]
    * `DASHBOARD=[true/false]` - if `true` the bot will be hosted with web dasboard, if `false` the bot will be hosted without web dashboard.
    * `SESSION_SECRET` - Session secret key, random sequence of words, letterss or numbers
    * `SECRET` - Client secret from Discord Developers portal [no. 3]
    * `ANALYTICS` - Google Trakcing ID, for Website analytics [Tutorial how to get it](#analytics-id)
1. Run `npm run start`
> Note: See the example [`.env` file below](#example-env-file)!

# Example `.env` file

[`.env.example`](https://github.com/aurolia-css/majo-rebuild/blob/master/.env.example)

```
# Environment Config

# store your secrets and config variables in here
# only invited collaborators will be able to see your .env values

# reference these in your code with process.env.SECRET

# Required
TOKEN=YOUR-TOKEN-GOES-HERE
PREFIX=!majo
AMEAPI=YOUR-AMETHYSTE-API-TOKEN

# Not required
DOMAIN-YOUR-WEBSITE-DOMAIN
PORT=YOUR-WEBSITE-PORT
BRAINID=YOUR-BRAINSHOP-AI-BRAIN-ID
BRAINKEY=YOUR-BRAINSHOP-AI-BRAIN-KEY
YOUTUBE-YOUR-YOUTUBE-API-KEY
DASHBOARD=[true/false]
SESSION_SECRET=YOUR-SESSION-SECRET-(RANDOM-WORDS)
SECRET=YOUR-BOT-CLIENT-SECRET
ANALYTICS=YOUR-GOOGLE-TRACKING-ID
# !majo is the default prefix, you can change it later.

# Note: .env is a shell file so there can't be spaces around =

```

### `.env` config table
| `.env` varriable | Description | Required |
|---|---|---|
| TOKEN | The bot token (Remember! The `TOKEN` is super secret) | :heavy_check_mark: |
| PREFIX | The default bot prefix (eg. `!majo`) | :heavy_check_mark: |
| AMEAPI | Your Amethyste api token | :heavy_check_mark: |
| BRAINID | Your Brainshop AI Brain ID | :heavy_check_mark: |
| BRAINKEY | Your Brainshop AI Brain Key | :heavy_check_mark: |
| YOUTUBE | Your Youtube API key | :heavy_check_mark: |
| DOMAIN | Your website domain (eg `https://example.com`)`*` | :x:/:heavy_check_mark: |
| PORT| Your webiste port, (eg. `8008 `)`*`| :x:/:heavy_check_mark: |
| DASHBOARD | The Web-Dashboard config value. (eg. `true/false`, default value: `false`)`*` | :x: |
| SESSION_SECRET | Random sequence of words, letterss or numbers`*` | :x:/:heavy_check_mark: |
| SECRET | The bot client secret (Remember! The `SECRET` value is Super-Secret)`*` | :x:/:heavy_check_mark: |
| ANALYTICS | Google analytics tracking ID, used in Web-Dashboard`*` | :x: |
> Note: All values are required except those marked with `*`!
> - `*` = Required to run the web dashboard


# Tokens

### Discord Token
> Soon!

### Amethyste Api
> Soon!

### AI Keys
> Soon!

### Youtube
> Soon!

### Analytics ID
> Soon!

### Heroku
> Soon!

# Dashboard

1. To test site, in `.env` file set the `DASHBOARD` config to `true` and assign the `PORT` eg 8080. ([See example `.env` file](#example-env-file))
2. Fill dashboard config in (`config.js` and `.env`)
3. Add the redirect uri here: https://discord.com/developers/applications/YOUR-BOT-ID/oauth2
    * ```
       https://your-domain.com
       https://your-domain.com/callback
       https://your-domain.com/dashboard
       https://your-domain.com/login
      ```
4. Go to your dashboard in browser (eg. to `localhost:8000`)

# Issues
If you have any issues with the page please create [new issue here](https://github.com/aurolia-css/majo-rebuild/issues)

# Pull Requests
When submitting a pull request:
- Clone the repo.
- Create a branch off of master and give it a meaningful name (e.g. my-awesome-new-feature).
- Open a [pull request](https://github.com/aurolia-css/majo-rebuild/pulls) on [GitHub](https://github.com) and describe the feature or fix.

# License
This project is licensed under the MIT. See the [LICENSE](https://github.com/aurolia-css/majo-rebuild/blob/master/license.md) file for details
