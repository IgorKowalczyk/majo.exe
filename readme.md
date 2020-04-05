# Discord "Majo.exe" bot.

## Getting started

1. Clone this repository
2. Run `npm install`
3. Grab a token on [Discord's developer portal](https://discordapp.com/developers/applications)
4. Create a `.env` file and add a `BOT_TOKEN` environmental variable whose value is the token above and add a `PREFIX` - this is your bot prefix (The `.env` file was private).
5. Run `npm run dev`

## Example `.env` file

```
# Environment Config

# store your secrets and config variables in here
# only invited collaborators will be able to see your .env values

# reference these in your code with process.env.SECRET


TOKEN=YOUR-TOKEN-GOES-HERE
PREFIX=!majo

# !majo is the default prefix, you can change it later.

# note: .env is a shell file so there can't be spaces around =

```

## Prefix

- `!majo {command - eg. help}` is default prefix of the bot.

## Invite this bot
(Note: the bot may be offline!)
[Invite] (https://discordapp.com/oauth2/authorize?client_id=681536055572430918&scope=bot&permissions=2146958591)