# Majo.exe

Majo.exe have almost everything - Fun, Memes, Images, Giveaway, Economy, Anime and NSFW. This bot serve over 100 commands!

[![Discord](https://discord.com/api/guilds/666599184844980224/widget.png?style=banner2)](https://majoexe.herokuapp.com/server)

[![Node.js](https://github.com/igorkowalczyk/majobot/actions/workflows/node.yml/badge.svg)](https://majoexe.herokuapp.com/)
[![Jekyll](https://github.com/igorkowalczyk/majobot/workflows/Jekyll/badge.svg)](https://majoexe.herokuapp.com/)
[![GitHub License](https://img.shields.io/github/license/igorkowalczyk/majobot?color=%2334D058&logo=github&logoColor=959DA5&labelColor=24292E)](https://majoexe.herokuapp.com/)
[![Version](https://img.shields.io/github/package-json/v/igorkowalczyk/majobot?color=%2334D058&logo=github&logoColor=959DA5&labelColor=24292E)](https://github.com/igorkowalczyk/majobot/releases)

# Invite

Go to [this link](https://discord.com/oauth2/authorize/?permissions=4294967287&scope=bot&client_id=681536055572430918) and add the bot (requires `MANAGE_GUILD` premission) to your server.
 - [Or to make it easier, visit our website](https://majoexe.herokuapp.com/)
# Hosting

We host this bot. Majo.exe *will be* online 24/7. [Invite Majo here!](#invite)
However, if you want to host Majo yourself - take a look here](#self-hosting)

### Heroku Hosting
Deploy the app to [Heroku](https://heroku.com)

[![Deploy to heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/igorkowalczyk/majobot/tree/master)

[Heroku hosting tutorial](#heroku)

### Self-Hosting

1. Clone [this repository](https://github.com/igorkowalczyk/majobot) `git clone https://github.com/IgorKowalczyk/majobot.git`
2. Run `npm install` to get all dependencies,
3. Grab a Discord Bot token and client secret on [Discord's developer portal](https://discord.com/developers/applications) [Tutorial](#discord-token)
4. Fill `config.json` with your values (See that some values point to the `.env` file, see it below)
5. Rename `.env.example` (Located in main dir) to `.env`. Remember - the file is super secret, better to not share it.
6. In `.env` file set this values:
    * **Required:**
    * `TOKEN` - Bot token from Discord Developer portal [no. 3]
    * `PREFIX` - Bot prefix, used to run commands eg. `your-prefix help`
    * `ID` - Your Discord Bot ID
    * `AMEAPI` - your Ametyhyste API token [Tutorial how to get it](#ameapi-token)
    * `BRAINID` - Your Brainshop AI Brain ID [Tutorial](#ai-keys)
    * `BRAINKEY` - Your Brainshop AI Brain Key [Tutorial](#ai-keys)
    * `COOKIES` - Your Youtube Cookies [Tutorial](#youtube)
    * `MYSQL_DATABASE` - Your MYSQL database name
    * `MYSQL_HOST` - Your MYSQL Host name
    * `MYSQL_PASSWORD` - Your MYSQL user password
    * `MYSQL_USER` - Your MYSQL User name who can acces to the database
    * **Not required (You can leave them blank):**
    * `DOMAIN` - your website domain, eg `https://example.com`
    * `PORT` - your website port, eg `8080`. [Note: If you are using heroku, not create this value. Heroku binds port automatically]
    * `DASHBOARD=[true/false]` - if `true` the bot will be hosted with web dasboard, if `false` the bot will be hosted without web dashboard.
    * `SESSION_SECRET` - Session secret key, random sequence of words, letterss or numbers
    * `SECRET` - Client secret from Discord Developers portal [no. 3]
    * `ANALYTICS` - Google Trakcing ID, for Website analytics [Tutorial how to get it](#analytics-id)
7. Run `npm run start`
> Note: See the example [`.env` file below](#example-env-file)!

# Example `.env` file

[`.env.example`](https://github.com/igorkowalczyk/majobot/blob/master/.env.example)

```
# Environment Config

# store your secrets and config variables in here
# only invited collaborators will be able to see your .env values

# reference these in your code with process.env.SECRET

# Required
TOKEN=YOUR_TOKEN_GOES_HERE
PREFIX=!majo
AMEAPI=YOUR_AMETHYSTE_API_TOKEN
MYSQL_DATABASE=YOUR_MYSQL_DATABASE_NAME
MYSQL_HOST=YOUR_MYSQL_HOST
MYSQL_PASSWORD=YOUR_MYSQL_USER_PASSWORD
MYSQL_USER=YOUR_MYSQL_DATABASE_USER

# Not required
DOMAIN=YOUR_WEBSITE_DOMAIN
PORT=YOUR_WEBSITE_PORT
BRAINID=YOUR_BRAINSHOP_AI_BRAIN_ID
BRAINKEY=YOUR_BRAINSHOP_AI_BRAIN_KEY
COOKIES=YOUR_YOUTUBE_COOKIES
DASHBOARD=[true/false]
SESSION_SECRET=YOUR_SESSION_SECRET_(RANDOM_WORDS)
SECRET=YOUR_BOT_CLIENT_SECRET
ANALYTICS=YOUR_GOOGLE_TRACKING_ID
# !majo is the default prefix, you can change it later.

# Note: .env is a shell file so there can't be spaces around =

```

### `.env` config table
| `.env` varriable | Description | Required |
|---|---|---|
| TOKEN | The bot token (Remember! The `TOKEN` is super secret) | :heavy_check_mark: |
| PREFIX | The default bot prefix (eg. `!majo`) | :heavy_check_mark: |
| ID | Your Discord Bot ID | :heavy_check_mark: |
| AMEAPI | Your Amethyste api token | :heavy_check_mark: |
| BRAINID | Your Brainshop AI Brain ID | :heavy_check_mark: |
| MYSQL_DATABASE | Your MYSQL database name | :heavy_check_mark: |
| MYSQL_HOST | Your MYSQL Host | :heavy_check_mark: |
| MYSQL_USER | Your MYSQL user | :heavy_check_mark: |
| MYSQL_PASSWORD | Your Brainshop AI Brain Key | :heavy_check_mark: |
| COOKIES | Your youtube cookies | :heavy_check_mark: |
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

# Contributors
- [@Joao-Victor-Liporini](https://github.com/Joao-Victor-Liporini) (Bug fixes, command-handler improvements, testing, new features)
- [@dhvitOP](https://github.com/dhvitOP) (Music commands)


# Issues
If you have any issues with the page please create [new issue here](https://github.com/igorkowalczyk/majobot/issues)

# Pull Requests
When submitting a pull request:
- Clone the repo.
- Create a branch off of master and give it a meaningful name (e.g. my-awesome-new-feature).
- Open a [pull request](https://github.com/igorkowalczyk/majobot/pulls) on [GitHub](https://github.com) and describe the feature or fix.

# License
This project is licensed under the MIT. See the [LICENSE](https://github.com/igorkowalczyk/majobot/blob/master/license.md) file for details
