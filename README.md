# Majo.exe

Majo.exe have almost everything - Fun, Memes, Images, Giveaway, Economy, Anime and NSFW. This bot serve over 150 commands!

[![Discord](https://discord.com/api/guilds/666599184844980224/widget.png?style=banner2)](https://majoexe.herokuapp.com/server)

[![Node.js](https://img.shields.io/github/workflow/status/igorkowalczyk/majobot/Node.js/master?style=flat-square&logo=github&color=%2334D058)](https://majoexe.herokuapp.com/)
[![Jekyll](https://img.shields.io/github/workflow/status/igorkowalczyk/majobot/Jekyll/master?style=flat-square&logo=github&color=%2334D058)](https://majoexe.herokuapp.com/)
[![GitHub License](https://img.shields.io/github/license/igorkowalczyk/majobot?style=flat-square&logo=github&color=%2334D058)](https://majoexe.herokuapp.com/)
[![Version](https://img.shields.io/github/package-json/v/igorkowalczyk/majobot?style=flat-square&logo=github&color=%2334D058)](https://majoexe.herokuapp.com/server)

### Invite

Go to [this link](https://discord.com/oauth2/authorize/?permissions=4294967287&scope=bot&client_id=681536055572430918) and add the bot (this requires `MANAGE_GUILD` permission) to your server.
 - [Or to make it easier, visit our website](https://majoexe.herokuapp.com/)

## Features
 - ⚙️ Fully customizable
 - 🌆 Build-in Dashboard
 - 📝 Easy Config
 - 💯 150+ Commands
 - 📚 Easy Hosting

## Hosting

We host this bot. Majo.exe *will be* online 24/7. [Invite Majo here!](#invite)
However, if you want to host Majo yourself - [take a look here](#self-hosting)

### Heroku Hosting
Deploy the app to [Heroku](https://heroku.com)

[![Deploy to heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/igorkowalczyk/majobot/tree/master)

[Heroku hosting tutorial](#heroku)

### Self-Hosting

1. Clone [this repository](https://github.com/igorkowalczyk/majobot) `git clone https://github.com/IgorKowalczyk/majobot.git`
2. Run `npm install` to get all dependencies,
3. Grab a Discord Bot token and client secret on [Discord's developer portal](https://discord.com/developers/applications) [Tutorial](#discord-token)
4. Fill `config.js`, `emojis_config.js` with your values (Tip: See `/examples` dir for config examples!)
5. Create new file named `.env` Remember - the file is super secret, better to not share it. (Tip: See `/examples` dir for example `.env` file!)
6. In `.env` file set this values:
    * **Required:**
    * `TOKEN` - Bot token from Discord Developer portal [no. 3]
    * `PREFIX` - Bot prefix, used to run commands eg. `your-prefix help`
    * `ID` - Your Discord Bot ID
    * `AMEAPI` - your Amethyste API token [[Tutorial](#amethyste-api)]
    * `BRAINID` - Your Brainshop AI Brain ID [[Tutorial](#ai-keys)]
    * `BRAINKEY` - Your Brainshop AI Brain Key [[Tutorial](#ai-keys)]
    * `GENIUS` - Your Genius API Key [[Tutorial](#genius)]
    * `MYSQL_DATABASE` - Your MYSQL database name
    * `MYSQL_HOST` - Your MYSQL Host name
    * `MYSQL_PASSWORD` - Your MYSQL user password
    * `MYSQL_USER` - Your MYSQL User name who can acces to the database
    * `COOKIES` - Your Youtube Cookies [[Tutorial](#youtube)]
    * **Not required (You can leave them blank):**
    * `DOMAIN`^ - your website domain, eg `https://example.com`
    * `PORT`^ - your website port, eg `8080`. [Note: If you are using heroku, don't add this value. Heroku binds port automatically!]
    * `DASHBOARD=[true/false]` - if `true` the bot will be hosted with web dasboard, if `false` the bot will be hosted without web dashboard.
    * `SESSION_SECRET`^ - Session secret key, random sequence of words, letterss or numbers
    * `SECRET`^ - Client secret from Discord Developers portal [no. 3]
    * `ANALYTICS` - Google Trakcing ID, for Website analytics [[Tutorial](#analytics-id)]
    * `CONTACT_WEBHOOK_ID` - Your contact form webhook ID
    * `CONTACT_WEBHOOK_TOKEN` - Your contact form webhook token
    * `STATUS_WEBHOOK_ID` - Your status webhook ID
    * `STATUS_WEBHOOK_TOKEN` - Your status webhook token
7. Run `npm run start`
> Note: See the example [`.env` file below](#example-env-file)!

> Note: Values with `^` are required to run web dashboard!

> Note: Discord webhook link syntax: `https://discord.com/api/webhooks/HERE-IS-WEBHOOK-ID/HERE-IS-WEBHOOK-TOKEN`)

### Dashboard hosting

1. In `.env` file set the `DASHBOARD` config to `true` and assign the `PORT` eg. `8080`. ([See example `.env` file](#example-env-file))
2. Fill dashboard config in (`config.js` and `.env`)
3. Add the redirect uri here: https://discord.com/developers/applications/YOUR-BOT-ID/oauth2
    * ```
       https://your-domain.com
       https://your-domain.com/callback
       https://your-domain.com/dashboard
       https://your-domain.com/login
      ```
4. Run `npm run dashboard` in your terminal
5. If everyting is ok go to your dashboard in browser (eg. to `localhost:8000`)
> Note: See the example [`.env` file below](#example-env-file)!

##### Additional info
> If you are hosting the site locally it is best to generate certificates for it. If you have them:
> 1. Change `certs: false` & `localhost: false` values in `config.js` to true
> 2. Place the `server.cert` & `server.key` certs in `/dashboard/certs/` directory

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
| GENIUS | Your genius API Key | :heavy_check_mark: |
| DOMAIN | Your website domain (eg `https://example.com`)`*` | :x:/:heavy_check_mark: |
| PORT| Your webiste port, (eg. `8008 `)`*`| :x:/:heavy_check_mark: |
| DASHBOARD | The Web-Dashboard config value. (eg. `true/false`, default value: `false`)`*` | :x: |
| SESSION_SECRET | Random sequence of words, letterss or numbers`*` | :x:/:heavy_check_mark: |
| SECRET | The bot client secret (Remember! The `SECRET` value is Super-Secret)`*` | :x:/:heavy_check_mark: |
| ANALYTICS | Google analytics tracking ID, used in Web-Dashboard`*` | :x: |
| COOKIES | Your youtube cookies | :heavy_check_mark: |
| CONTACT_WEBHOOK_ID | Your contact form webhook ID | :x: |
| CONTACT_WEBHOOK_TOKEN | Your contact form webhook token | :x: |
| STATUS_WEBHOOK_ID | Your status webhook ID | :x: |
| STATUS_WEBHOOK_TOKEN | Your status webhook token | :x: |
> - `*` = Required to run the web dashboard!

### Example `.env` file
<details><summary>Example <code>.env</code> file</summary>
 
[`.env.example`](https://github.com/igorkowalczyk/majobot/blob/master/.env.example)

```
# Environment Config

# Required
TOKEN=YOUR_TOKEN_GOES_HERE
PREFIX=!majo
ID=YOUR_BOT_ID
AMEAPI=YOUR_AMETHYSTE_API_TOKEN
MYSQL_DATABASE=YOUR_MYSQL_DATABASE_NAME
MYSQL_HOST=YOUR_MYSQL_HOST
MYSQL_PASSWORD=YOUR_MYSQL_USER_PASSWORD
MYSQL_USER=YOUR_MYSQL_DATABASE_USER
BRAINID=YOUR_BRAINSHOP_AI_BRAIN_ID
BRAINKEY=YOUR_BRAINSHOP_AI_BRAIN_KEY
GENIUS=YOUR_GENIUS_API_KEY
CONTACT_WEBHOOK_TOKEN=YOUR_CONTACT_FORM_WEBHOOK_TOKEN
CONTACT_WEBHOOK_ID=YOUR_CONTACT_FORM_WEBHOOK_ID
STATUS_WEBHOOK_TOKEN=YOUR_STATUS_WEBHOOK_TOKEN
STATUS_WEBHOOK_ID=YOUR_STATUS_WEBHOOK_ID

# Not required
DASHBOARD=[true/false]
DOMAIN=YOUR_WEBSITE_DOMAIN
PORT=YOUR_WEBSITE_PORT
SESSION_SECRET=YOUR_SESSION_SECRET_(RANDOM_WORDS)
SECRET=YOUR_BOT_CLIENT_SECRET
ANALYTICS=YOUR_GOOGLE_TRACKING_ID
COOKIES=YOUR_YOUTUBE_COOKIES

# Note: !majo is the default prefix, you can change it later.
```
</details>

## Tokens tutorials

##### Discord Token
> Soon!

##### Amethyste Api
> Soon!

##### AI Keys
> Soon!

##### Youtube
> Soon!

##### Genius
> Soon!

##### Analytics ID
> Soon!

##### Heroku
> Soon!

## Contributors
- [@r-kjha](https://github.com/r-kjha) (Emoji config support, Bug fixes, New features, Testing)
- [@Joao-Victor-Liporini](https://github.com/Joao-Victor-Liporini) (Bug fixes, Command handler improvements, Testing, New features)
- [@krzesl0](https://github.com/krzesl0) (New Features, Bug fixes, Testing)
- [@Sakshyam6966](https://github.com/Sakshyam6966) (New Features, Bug fixes, Testing)
- [@dhvitOP](https://github.com/dhvitOP) (Music commands)
- [@Wafelowski](https://github.com/HeavyWolfPL) (Translation improvements)

## Issues
If you have any issues with the page please create [new issue here](https://github.com/igorkowalczyk/majobot/issues)

## Pull Requests
When submitting a pull request:
- Clone the repo.
- Create a branch off of master and give it a meaningful name (e.g. my-awesome-new-feature).
- Open a [pull request](https://github.com/igorkowalczyk/majobot/pulls) on [GitHub](https://github.com) and describe the feature or fix.

## License
This project is licensed under the MIT. See the [LICENSE](https://github.com/igorkowalczyk/majobot/blob/master/license.md) file for details
