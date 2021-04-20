> ## *This project is outdated! It will soon be upgraded to `Discord.js v12.3.1`. If you want to see the progress of the work see [@aurolia-css/majo-rebuild](https://github.com/aurolia-css/majo-rebuild) (official repo)*

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

## Deploy
Deploy the app to [Heroku](https://heroku.com)

[![Deploy to heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/igorkowalczyk/majobot/tree/master)

# Self-Hosting

1. Clone [this repository](https://github.com/igorkowalczyk/majobot),
2. Run `npm install`,
3. Grab a token and client secret on [Discord's developer portal](https://discord.com/developers/applications),
4. Fill `config.json` and `dashboard.json` with your variables (`dashboard.json` is the config file for Web Dashboard, ignore this file if you not use Majo Dashboard),
5. Create a `.env` file and add a `TOKEN` environmental variable whose value is the token above. (Do not remember! The `TOKEN` value is Super-Secret)
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
| `.env` | Description | Required |
|---|---|---|
| TOKEN | The bot token, required to run (Do not remember! The `TOKEN` value is Super-Secret) | :heavy_check_mark: |
| PREFIX | The default bot prefix (eg. `!majo`) | :heavy_check_mark: |
| DASHBOARD | The Web-Dashboard config value. (eg. `true/false`) | :x: |
| SECRET | The bot client secret (Do not remember! The `SECRET` value is Super-Secret), required to run Web Dashboard | :x: |
| UA | Google analytics tracking ID, used in Web-Dashboard | :x: |

# Development

### Node.js Version

To test site in `.env` file set the `DASHBOARD=true/false` value. ([See example `.env` file](#example-env-file))

### Jekyll Version
To set up your environment to develop this page, run `bundle install`.

To test site, run `bundle exec jekyll serve` and open your browser at http://localhost:4000. This starts a Jekyll server using your config and the contents. As you make modifications, your site will regenerate and you should see the changes in the browser after a refresh.

# Issues
If you have any issues with the page please create [new issue here](https://github.com/igorkowalczyk/majobot/issues)

# Pull Requests
When submitting a pull request:

- Clone the repo.
- Create a branch off of master and give it a meaningful name (e.g. my-awesome-new-feature).
- Open a [pull request](https://github.com/igorkowalczyk/majobot/pulls) on [GitHub](https://github.com) and describe the feature or fix.

# License
This project is licensed under the MIT. See the [LICENSE](https://github.com/igorkowalczyk/majobot/blob/master/license.md) file for details
