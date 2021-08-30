# Majo.exe (v13 BETA)

Majo.exe have almost everything - Fun, Memes, Images, Giveaway, Economy, Anime and NSFW. This bot serve over 150 commands!

[![Discord](https://discord.com/api/guilds/666599184844980224/widget.png?style=banner2)](https://majobot.igorkowalczyk.repl.co/server)

[![Node.js](https://img.shields.io/github/workflow/status/igorkowalczyk/majobot/Node.js/master?style=flat-square&logo=github&color=%2334D058)](https://majobot.igorkowalczyk.repl.co/)
[![Jekyll](https://img.shields.io/github/workflow/status/igorkowalczyk/majobot/Jekyll/master?style=flat-square&logo=github&color=%2334D058)](https://majobot.igorkowalczyk.repl.co/)
[![GitHub License](https://img.shields.io/github/license/igorkowalczyk/majobot?style=flat-square&logo=github&color=%2334D058)](https://majobot.igorkowalczyk.repl.co/)
[![Version](https://img.shields.io/github/package-json/v/igorkowalczyk/majobot?style=flat-square&logo=github&color=%2334D058)](https://majobot.igorkowalczyk.repl.co/server)

## Invite

Go to [this link](https://discord.com/oauth2/authorize/?permissions=4294967287&scope=bot&client_id=681536055572430918) and add the bot (this requires `MANAGE_GUILD` permission) to your server.
 - [Or to make it easier, visit our website](https://majobot.igorkowalczyk.repl.co/)

## Features
 - ⚙️ Fully customizable
 - 🌆 Build-in Dashboard
 - 📝 Easy Config
 - 💯 150+ Commands
 - 📚 Easy Hosting

## Hosting

We host this bot. Majo.exe *will be* online 24/7. [Invite Majo here!](#invite)
However, if you want to host Majo.exe yourself - [take a look here](#self-hosting)

Deploy Majo.exe to Heroku: [![Deploy to heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/igorkowalczyk/majobot/tree/master)

Run Majo.exe on Replit: [![Run on Repl.it](https://repl.it/badge/github/igorkowalczyk/majobot)](https://repl.it/github/igorkowalczyk/majobot)

#### Self-Hosting
1. Clone [this repository](https://github.com/igorkowalczyk/majobot) `git clone https://github.com/IgorKowalczyk/majobot.git`
2. Run `npm i` to install all dependencies,
3. Grab a Discord Bot token and client secret on [Discord's developer portal](https://discord.com/developers/applications) [Tutorial](#discord-credentials)
4. Fill `config.js`, `emojis_config.js` with your values
5. Create new file named `.env` Remember - the file is super secret, better to not share it.
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
    * `STATUS_WEBHOOK` - Your Stats Webhook URL
    * **Not required (You can leave them blank):**
    * `DOMAIN`^ - your website domain, eg. `https://example.com` or `https://localhost`
    * `PORT`^ - your website port, eg `8080`. [Note: If you are using heroku, don't add this value. Heroku binds port automatically!]
    * `DASHBOARD=[true/false]` - if `true` the bot will be hosted with web dasboard, if `false` the bot will be hosted without web dashboard.
    * `SESSION_SECRET`^ - Session secret key, random sequence of words, letters or numbers
    * `SECRET`^ - Client secret from Discord Developers portal [no. 3]
    * `ANALYTICS` - Google Trakcing ID, for Website analytics [[Tutorial](#analytics-id)]
    * `RECAPTCHA_KEY`^ - Google Recaptcha v2 site key
    * `CONTACT_WEBHOOK_ID`^ - Your contact form webhook ID
    * `CONTACT_WEBHOOK_TOKEN`^ - Your contact form webhook token
7. Run `npm run start`
> Note: See the example [`.env` file below](#example-env-file)!
> Note: Values with `^` are required to run web dashboard!

#### Dashboard hosting
1. In `.env` file set the `DASHBOARD` config to `true` and assign the `PORT` eg. `8080`. ([See example `.env` file](#example-env-file))
2. Fill dashboard config in (`/config/config.js` and `.env`)
3. Add the redirect uri here: https://discord.com/developers/applications/YOUR-BOT-ID/oauth2
    * ```
       https://your-domain.com
       https://your-domain.com/callback
       https://your-domain.com/dashboard
       https://your-domain.com/login
      ```
4. Run `npm run dashboard` in your terminal
5. If everyting is ok go to your dashboard in browser (eg. to `localhost:8000`)

**Additional info**
> If you are hosting the site locally it is best to generate certificates for it. If you have them:
> 1. Change `certs: false` & `localhost: false` values in `config.js` to true
> 2. Place the `server.cert` & `server.key` certs in `/dashboard/certs/` directory

## `.env` File (Main Config)
#### `.env` config table
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
| RECAPTCHA_KEY | Google recaptcha v2 key`*` | :x:/:heavy_check_mark: |
| COOKIES | Your youtube cookies | :heavy_check_mark: |
| CONTACT_WEBHOOK_ID | Your contact form webhook ID | :x: |
| CONTACT_WEBHOOK_TOKEN | Your contact form webhook token | :x: |
| STATUS_WEBHOOK | Your status webhook ID | :heavy_check_mark: |
> - `*` = Required to run the web dashboard!

#### Example `.env` file
<details><summary>Click to see example <code>.env</code> file!</summary>
 
[`.env.example`](https://github.com/igorkowalczyk/majobot/blob/master/config/examples/.env.example)

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
STATUS_WEBHOOK=YOUR_STATUS_WEBHOOK_URL
COOKIES=YOUR_YOUTUBE_COOKIES
RECAPTCHA_KEY=YOUR_RECAPTCHA_KEY

# Not required
DASHBOARD=[true/false]
DOMAIN=YOUR_WEBSITE_DOMAIN
PORT=YOUR_WEBSITE_PORT
SESSION_SECRET=YOUR_SESSION_SECRET_(RANDOM_WORDS)
SECRET=YOUR_BOT_CLIENT_SECRET
ANALYTICS=YOUR_GOOGLE_TRACKING_ID
# Note: !majo is the default prefix, you can change it later.
```
</details>

## Tokens tutorials
##### Discord Credentials
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
