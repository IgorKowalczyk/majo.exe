![Header Dashboard](https://github.com/IgorKowalczyk/majo.exe/assets/49127376/f3163dc8-159b-49ab-96f7-388d32bff2e0)

<p align="center">
 <a href="https://majoexe.xyz/server"><img src="https://img.shields.io/discord/666599184844980224?color=%234552ef&logo=discord&label=Discord&style=flat&logoColor=fff" alt="Discord" /></a>
 <a href="https://www.npmjs.com/package/discord.js"><img src="https://img.shields.io/badge/Discord.js-v14-%234552ef?style=flat&logo=npm&logoColor=fff" alt="Discord.js" /></a>
 <a href="https://majoexe.xyz/"><img src="https://img.shields.io/github/actions/workflow/status/igorkowalczyk/majo.exe/codeql-analysis.yml?branch=rebuild&style=flat&label=CodeQL&logo=github&color=%234552ef" alt="CodeQL Checks" /></a>
 <a href="https://majoexe.xyz"><img src="https://img.shields.io/github/license/igorkowalczyk/majo.exe?style=flat&;logo=github&label=License&color=%234552ef" alt="GitHub License" /></a>
</p>

## 🤖 Self-Hosting

1. Clone [this repository]
2. Go to `/packages/database/` directory and follow [Database Setup](/packages/database/README.md) tutorial
3. Grab a Discord Bot token and client secret on [Discord's developer portal](https://discord.com/developers/applications) [Tutorial](#-discord-credentials)
4. Add redirect URL to Discord's developer portal (https://your-website.com/api/auth/callback/discord)
5. Create new file or edit existing `.env` file in root directory of the project
6. In `.env` file set this values:
   - `TOKEN` - Discord bot token [[Tutorial](/apps/bot/README.md#-discord-token)]
   - `SECRET` - Random string (min. length = 32 chars)
   - `CLIENT_SECRET` - Discord bot secret [[Tutorial](/apps/bot/README.md#-discord-secret)]
   - `NEXTAUTH_URL` - Your website URL (with protocol)
   - `NEXT_PUBLIC_URL` - Your website URL (with protocol)
   - `HOTJAR_ID` - Your Hotjar ID (optional)
   - Database URLs [[Tutorial](/packages/database/README.md)]
     - `DATABASE_URL` - Main database URL
     - `DIRECT_URL` - Direct database URL (optional)
7. Go to `/apps/dashboard/` directory
8. Run `pnpm i` to install all dependencies
9. Run `pnpm run dev` or `pnpm run deploy` to start dashboard

## ▲ Vercel Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FIgorKowalczyk%2Fmajo.exe&env=TOKEN,SECRET,CLIENT_ID,CLIENT_SECRET,NEXTAUTH_URL,DATABASE_URL,DIRECT_URL,SHADOW_DATABASE_URL,NEXT_PUBLIC_URL&envDescription=Tokens%20needed%20for%20Dashboard&envLink=https%3A%2F%2Fgithub.com%2Figorkowalczyk%2Fmajo.exe&project-name=majo-exe&repository-name=majo-exe&demo-title=Majo.exe%20-%20Dashboard&demo-description=Majo.exe%20Dashboard%20-%20Next.js%20application%20for%20managing%20Majo.exe%20Discord%20bot.&demo-url=https%3A%2F%2Fbeta.majoexe.xyz&demo-image=https%3A%2F%2Fgithub.com%2FIgorKowalczyk%2Fmajo.exe%2Fassets%2F49127376%2F02d4d63d-2cea-44f2-88b6-7e645dc272ea)

1. Go to `/packages/database/` directory and follow [Database Setup](/packages/database/README.md) tutorial
2. Grab a Discord Bot token and client secret on [Discord's developer portal](https://discord.com/developers/applications) [Tutorial](/apps/dashboard/README.md#-discord-credentials)
3. Add redirect URL to Discord's developer portal (https://your-website.com/api/auth/callback/discord)
4. Import this repository to Vercel (click button above)
5. Set environment variables from your root `.env` file
6. Click `Deploy` button

##### Example `.env` file

Remember - the file is super secret, better to not share it!

```
TOKEN=DISCORD_BOT_TOKEN
SECRET=SECRET_STRING
CLIENT_SECRET=DISCORD_BOT_SECRET
NEXTAUTH_URL=YOUR_WEBSITE_URL
NEXT_PUBLIC_URL=YOUR_WEBSITE_URL

# ... Database credentials
```

> **Warning**:
> This file should be in **root directory** of the project.

---

## 🗜️ Requirements

- `PostgreSQL 13x` or higher
- `Node.js 16x` or higher
- `(Any)` Linux x64\*
- `256MB` of RAM
- `512MB/1GB` of hard drive space

> **Note**:
> \*Debian based distros are recommended, Dashboard can also run on Windows and MacOS but it's not recommended.

## 📝 Contributors

- [@binary-blazer](https://github.com/binary-blazer) (Hosting support)
- [@r-kjha](https://github.com/r-kjha) (Emoji config support, Bug fixes, New features, Testing)
- [@Joao-Victor-Liporini](https://github.com/Joao-Victor-Liporini) (Bug fixes, Command handler improvements, Testing, New features)
- [@krzesl0](https://github.com/krzesl0) (New Features, Bug fixes, Testing)
- [@\_index1337](https://github.com/index1337) (Readme tutorials)
- [@Wafelowski](https://github.com/HeavyWolfPL) (Translation improvements)
- [@Sakshyam6966](https://github.com/Sakshyam6966) (New Features, Bug fixes, Testing)

## 💝 Sponsors

**These wonderful people and services have helped develop Majo.exe, without them this project would not exist. Thanks goes to these wonderful people!**

|                                                                                                                                                             | Sponsor                                                             | Description                                                                                                                                                         |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ![TrestHost Logo](https://media.discordapp.net/attachments/1016532713173426297/1137629737334870038/tresthost.png?width=112&height=112)                      | [**TrestHost**](https://dash.tresthost.me/register?ref=majonez.exe) | **TrestHost is a good and powerful hosting provider** providing servers from the **USA and Germany**. Try us out today!                                             |
| ![Terohost Logo](https://media.discordapp.net/attachments/905722570286960650/1139902959308783677/943e2f13a56ed86da3bfd4ffcbd5094e.png?width=112&height=112) | [Terohost](https://my.terohost.com/aff.php?aff=17)                  | **TeroHost is a Discord Bot hosting** provider that helps take care of all your needs regarding your Discord Bot to ensure your bot perfect uptime, ping and speed. |

## ⁉️ Issues

If you have any issues with the bot please create [new issue here](https://github.com/igorkowalczyk/majo.exe/issues).
When creating new issue please provide as much information as possible. If you can, please provide logs from console.

## 📥 Pull Requests

When submitting a pull request:

- Clone the repo.
- Create a branch off of `master` and give it a meaningful name (e.g. `my-awesome-new-feature`).
- Open a [pull request](https://github.com/igorkowalczyk/majo.exe/pulls) on [GitHub](https://github.com) and describe the feature or fix.

We will review your pull request as soon as possible. We might suggest some changes or improvements.

## 📋 License

This project is licensed under the MIT. See the [LICENSE](https://github.com/igorkowalczyk/majo.exe/blob/master/license.md) file for details
