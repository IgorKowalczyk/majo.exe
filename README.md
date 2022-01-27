<img width="170" height="170" align="left" style="float: left; margin: 0 10px 0 0; border-radius: 50%;" alt="Majo.exe Logo" src="https://user-images.githubusercontent.com/49127376/138303201-7f8db506-b11b-40bf-9b89-3966616b16d5.png">  

# Majo.exe

> Majo.exe have almost everything - Fun, Memes, Images, Giveaway Moderation, Anime, NSFW and eveb more!. Majo.exe serve over 150 commands!
<br><br>[![Discord](https://img.shields.io/discord/666599184844980224?color=%2334D058&logo=discord&label=Discord&style=flat-square&logoColor=fff)](https://majoexe.ml/server)
[![Discord.js](https://img.shields.io/badge/Discord.js-v13-%2334d058?style=flat-square&logo=npm&logoColor=fff)](https://www.npmjs.com/package/discord.js)
[![CodeQL Checks](https://img.shields.io/github/workflow/status/igorkowalczyk/majo.exe/CodeQL%20Checks/master?style=flat-square&label=CodeQL&logo=github&color=%2334D058)](https://majoexe.ml/)
[![GitHub License](https://img.shields.io/github/license/igorkowalczyk/majo.exe?style=flat-square&logo=github&label=License&color=%2334D058)](https://majoexe.ml)
[![Version](https://img.shields.io/github/package-json/v/igorkowalczyk/majo.exe?style=flat-square&logo=github&label=Version&color=%2334D058)](https://majoexe.ml/server)
---

## Invite

Go to [this link](https://discord.com/oauth2/authorize/?permissions=4294967287&scope=bot&client_id=681536055572430918) and add the bot (this requires `MANAGE_GUILD` permission) to your server.
 - [Or to make it easier, visit our website](https://majoexe.ml/)

## Features
 - ⚙️ Fully customizable
 - 🌆 Build-in Dashboard
 - 📝 Easy Config
 - 💯 150+ Commands
 - 📚 Easy Hosting

## Hosting

> We host this bot. Majo.exe *will be* online 24/7. [Invite Majo here!](#invite)<br>
> However, if you want to host Majo.exe yourself - [take a look here](#-self-hosting-bot)

| Heroku | Replit | Terohost |
|---|---|---|
| [![Deploy to heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/igorkowalczyk/majo.exe/tree/master) | [![Run on Repl.it](https://repl.it/badge/github/igorkowalczyk/majo.exe)](https://repl.it/github/igorkowalczyk/majo.exe) | [![Run on Terohost](https://raw.githubusercontent.com/IgorKowalczyk/majo.exe/master/src/img/readme/terohost_scaled.png)](https://terohost.com) |

#### 🤖 Self-Hosting (Bot)
1. Clone [this repository](https://github.com/igorkowalczyk/majo.exe) `git clone https://github.com/IgorKowalczyk/majo.exe.git`
2. Run `npm i` to install all dependencies,
3. Grab a Discord Bot token and client secret on [Discord's developer portal](https://discord.com/developers/applications) [Tutorial](#discord-credentials)
4. Fill `/config/config.js`, `/config/emojis_config.js` with your values
5. Create new file named `.env` Remember - the file is super secret, better to not share it.
6. In `.env` file set this values:
    * `TOKEN` - Discord bot token
    * `PREFIX` - Discord bot main prefix
    * `ID` - Your Discord Bot ID
    * `AMEAPI` - your Amethyste API token [[Tutorial](#amethyste-api)]
    * `MYSQL_DATABASE` - Your MYSQL database name
    * `MYSQL_HOST` - Your MYSQL Host Endpoint
    * `MYSQL_PASSWORD` - Your MYSQL user password
    * `MYSQL_USER` - Your MYSQL User name who can acces the database
    * `STATUS_WEBHOOK` - Your status webhook URL (Discord)
    * `ERRORS_WEBHOOK` - Your errors webhook URL (Discord)
7. Run `npm run majo:bot`
> Note: See the example [`.env` file below](#example-env-file)!

---

#### 💾 Self-Hosting (Dashboard)
1. Clone [this repository](https://github.com/igorkowalczyk/majo.exe) `git clone https://github.com/IgorKowalczyk/majo.exe.git`
2. Run `npm i` to install all dependencies,
3. Grab a Discord Bot token and client secret on [Discord's developer portal](https://discord.com/developers/applications) [Tutorial](#discord-credentials)
4. Create new file named `.env` Remember - the file is super secret, better to not share it.
5. In `.env` file set this values:
    * `TOKEN` - Discord bot token
    * `PREFIX` - Discord bot main prefix
    * `DOMAIN` - Your website domain (eg `https://example.com`)
    * `AMEAPI` - Your Amethyste api token
    * `ID` - Your Discord Bot ID
    * `MYSQL_DATABASE` - Your MYSQL database name
    * `MYSQL_HOST` - Your MYSQL Host Endpoint
    * `MYSQL_PASSWORD` - Your MYSQL user password
    * `MYSQL_USER` - Your MYSQL User name who can acces the database
    * `CONTACT_WEBHOOK` - Your Contact Webhook URL (Discord)
    * `PORT` - Your website port
    * `RECAPTCHA_KEY` - Google recaptcha v2 key
    * `SECRET` - Discord bot secret
6. Fill dashboard config in `/config/main_config.js`
7. Add these redirect URI's ([https://discord.com/developers/applications/<YOUR-BOT-ID\>/oauth2](https://discord.com/developers/applications))
    * ```
       https://your-domain.com
       https://your-domain.com/callback
       https://your-domain.com/dashboard
       https://your-domain.com/login
      ```
8. Run `npm run majo:dashboard` in your terminal
9. If everyting is ok go to your dashboard in browser (eg. to `localhost:8000`)
> Note: See the example [`.env` file below](#example-env-file)!

**Additional info**
> If you are hosting dashboard on [Replit](https://replit.com) please run this command to install Node.js 16x:
> * `npm init -y && npm i --save-dev node@16 && npm config set prefix=$(pwd)/node_modules/node && export PATH=$(pwd)/node_modules/node/bin:$PATH`
>
> If you are hosting the site locally it is best to generate certificates for it. If you have them:
> 1. Change `certs: false` & `localhost: false` values in `/config/main_config.js` to true
> 2. Place the `server.cert` & `server.key` certs in `/config/certs/` directory

---

#### 🧱 Self-Hosting (API)
> Soon!


<br>

## `.env` File (Main Config)
#### `.env` config table
| `.env` varriable | Description | Type | Required (Bot) | Required (Dashboard) | Required (API) |
|---|---|:---:|:---:|:---:|:---:|
| `TOKEN` | Discord bot token | String | ✅ | ✅ | ❓ |
| `PREFIX` | The default bot prefix (eg. `!majo`) [Deprecated!] | String | ✅ | ✅ | ❓ |
| `ID` | Your Discord Bot ID | Number | ✅ | ✅ | ❓ |
| `AMEAPI` | Your Amethyste api token | String | ✅ | ✅ | ❓ |
| `MYSQL_DATABASE` | Your MYSQL database name | String | ✅ | ✅ | ❓ |
| `MYSQL_HOST` | Your MYSQL Host | String | ✅ | ✅ | ❓ |
| `MYSQL_USER` | Your MYSQL user | String | ✅ | ✅ | ❓ |
| `MYSQL_PASSWORD` | Your MYSQL password | String | ✅ | ✅ | ❓ |
| `DOMAIN` | Your website domain (eg `https://example.com`) | URL | ❌ | ✅ | ❓ |
| `PORT` | Your webiste port eg. `8008`<br> - Note: Heroku don't need port. Heroku assings port automatically! | Number | ❌ | ✅ | ❓ |
| `DASHBOARD` | The Web-Dashboard config value. (Boolean) [Deprecated!] | Boolean | ❌ | ✅ | ❓ |
| `SECRET` | The bot client secret | String | ❌ | ✅ | ❓ |
| `ANALYTICS` | Google analytics tracking ID, used in Web-Dashboard | String | ❌ | ❌ | ❓ |
| `RECAPTCHA_KEY` | Google recaptcha v2 key | String | ❌ | ✅ | ❓ |
| `CONTACT_WEBHOOK` | Your contact form webhook URL | URL | ❌ | ✅ | ❓ |
| `STATUS_WEBHOOK` | Your status webhook URL | URL | ✅ | ❌ | ❓ |
| `ERRORS_WEBHOOK` | Your errors webhook URL | URL | ✅ | ✅ | ❓ |
| `NODE_ENV` | Environment variable (production/development) | String | ✅ | ✅ | ❓ |
#### Example `.env` file
 
[`.env.example`](https://github.com/igorkowalczyk/majo.exe/blob/master/config/examples/.env.example)

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
CONTACT_WEBHOOK=YOUR_CONTACT_FORM_WEBHOOK
STATUS_WEBHOOK=YOUR_STATUS_WEBHOOK_URL
ERRORS_WEBHOOK=YOUR_ERRORS_WEBHOOK_URL
RECAPTCHA_KEY=YOUR_RECAPTCHA_KEY
NODE_ENV=production/development

# Not required
DASHBOARD=[true/false]
# Deprecated ^
DOMAIN=YOUR_WEBSITE_DOMAIN
PORT=YOUR_WEBSITE_PORT
SECRET=YOUR_BOT_CLIENT_SECRET
ANALYTICS=YOUR_GOOGLE_TRACKING_ID
# Note: !majo is the default prefix, you can change it later.
```

## Requirements
 - MySQL: `<= 5.7`
 - Node.js: `>= 16x`
 - Linux x64 `(Any)`
 - RAM: `>= 250MB`
 - Disk space: `>= 1GB`


## Tokens tutorials
### Discord Credentials
<details>
 <summary>Click here to see Discord API Credentials tutorial!</summary>
 Soon!
</details>

### Amethyste API
<details>
 <summary>Click here to see Amethyste API Credentials tutorial!</summary>
 Soon!
</details>

### Analytics ID
<details>
 <summary>Click here to see Analytics ID tutorial!</summary>
 Soon!
</details>

### Re-Captcha Key
<details>
 <summary>Click here to see Re-Captcha Key tutorial!</summary>
 
1. Go to <a href="https://www.google.com/recaptcha/about/">Google reCAPTCHA About Page</a>
2. Choose v3 Admin Console.
3. If you have never generated a reCAPTCHA key before, you will be redirected to the key generation page.
> If you have generated a reCAPTCHA key before, you will be redirected to the reCAPTCHA dashboard. Here will display the statistics of your past key. And to generate a key, tap the `+` button on the top right.
4. Fill in the information in the form:
> * `Label`: Enter the label to identify the site.<br>
> * `reCAPTCHA type`: Choose the type of reCAPTCHA for this site key<br>
> * `reCAPTCHA v3` : allows you to verify if an interaction is legitimate without any user interaction *[Not recommended!]*<br>
> * `reCAPTCHA v2` *[Recommended!]* :<br>
>    * `I’m not a robot" Checkbox` *[Recommended!]*<br>
>    * `Invisible reCAPTCHA badge`<br>
>    * `reCAPTCHA Android`<br>
> * `Domains`: Enter your domain where the keys will be used.<br>
> * `Owners`: By default, it will receive the email address you log in with. If you want to register for more accounts, enter the email addresses you want to specify<br>
> * `Terms of Service`: Check the box to accept the reCAPTCHA Terms of Service<br>
> * `Send alerts to owners`: Check the box to get alerts if Google detects problems with your site<br>
5. When complete, click the SUBMIT button.

> Written by: <a href="https://github.com/MashedTuna">MashedPotato</a>
</details>


## Contributors
- [@r-kjha](https://github.com/r-kjha) (Emoji config support, Bug fixes, New features, Testing)
- [@Joao-Victor-Liporini](https://github.com/Joao-Victor-Liporini) (Bug fixes, Command handler improvements, Testing, New features)
- [@krzesl0](https://github.com/krzesl0) (New Features, Bug fixes, Testing)
- [@Sakshyam6966](https://github.com/Sakshyam6966) (New Features, Bug fixes, Testing)
- [@Wafelowski](https://github.com/HeavyWolfPL) (Translation improvements)

## Issues
If you have any issues with the page please create [new issue here](https://github.com/igorkowalczyk/majo.exe/issues)

## Pull Requests
When submitting a pull request:
- Clone the repo.
- Create a branch off of master and give it a meaningful name (e.g. my-awesome-new-feature).
- Open a [pull request](https://github.com/igorkowalczyk/majo.exe/pulls) on [GitHub](https://github.com) and describe the feature or fix.

## License
This project is licensed under the MIT. See the [LICENSE](https://github.com/igorkowalczyk/majo.exe/blob/master/license.md) file for details

<details>
 <summary> </summary>
 <h5>The cake is a lie 🍰</h5>
 <a href="https://igorkowalczyk.github.io"><img src="https://komarev.com/ghpvc/?username=majobot&style=flat-square&color=333333&label=Repo+views" alt="Github profile views"></a>
</details>
