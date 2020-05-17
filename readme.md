# Majo.exe

An advanced Discord bot, contains commands for moderation, fun, music, economics and NSFW. It has 100+ commands.


<img src="https://top.gg/api/widget/681536055572430918.svg?usernamecolor=99aab5&topcolor=23272a&certifiedcolor=99aab5&middlecolor=2c2f33&datacolor=fff&labelcolor=99aab5"><br>
<img src="https://top.gg/api/widget/owner/681536055572430918.svg?usernamecolor=99aab5&topcolor=23272a&certifiedcolor=99aab5&middlecolor=2c2f33&datacolor=fff&labelcolor=99aab5&noavatar=true"> <img src="https://top.gg/api/widget/status/681536055572430918.svg?usernamecolor=99aab5&topcolor=23272a&certifiedcolor=99aab5&middlecolor=2c2f33&datacolor=fff&labelcolor=99aab5&noavatar=true"> <img src="https://top.gg/api/widget/upvotes/681536055572430918.svg?usernamecolor=99aab5&topcolor=23272a&certifiedcolor=99aab5&middlecolor=2c2f33&datacolor=fff&labelcolor=99aab5&noavatar=true"> <img src="https://top.gg/api/widget/servers/681536055572430918.svg?usernamecolor=99aab5&topcolor=23272a&certifiedcolor=99aab5&middlecolor=2c2f33&datacolor=fff&labelcolor=99aab5&noavatar=true"> <img src="https://top.gg/api/widget/lib/681536055572430918.svg?usernamecolor=99aab5&topcolor=23272a&certifiedcolor=99aab5&middlecolor=2c2f33&datacolor=fff&labelcolor=99aab5&noavatar=true"> 
---

# Invite

Go to [this link](https://igorkowalczyk.github.io/majobot/invite) and authorize the bot (requires server manage premission) to your server.

# Hosting

We host this bot. Majo.exe will be online 24/7.

# Self-Hosting

1. Clone [this repository](https://github.com/igorkowalczyk/majobot)
2. Run `npm install`
3. Grab a token on [Discord's developer portal](https://discord.com/developers/applications)
4. Create a `.env` file and add a `BOT_TOKEN` environmental variable whose value is the token above, add a `PREFIX` - this is your bot prefix and add a `DASHBOARD=[true/false]` value - if `true` the bot will be hosted with web dasboard, if `false` the bot will be hosted without web dashboard (The `.env` file was private).
5. Run `node index.js`

## Example `.env` file

```
# Environment Config

# store your secrets and config variables in here
# only invited collaborators will be able to see your .env values

# reference these in your code with process.env.SECRET


TOKEN=YOUR-TOKEN-GOES-HERE
PREFIX=!majo
DASHBOARD=true

# !majo is the default prefix, you can change it later.

# note: .env is a shell file so there can't be spaces around =

```
