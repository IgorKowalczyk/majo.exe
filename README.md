<h3 align="center">You're currently on the <code>rebuild</code> branch. The code you find here may not work or contain a lot of bugs. Do not use it in production!</h3>
<h3 align="center">Planned release date: Q3/Q4 2023</h3>

<h3 align="center">⚠️ <a href="https://github.com/IgorKowalczyk/majo.exe/tree/master"/>Go to stable branch ⚠️</h3>

---

<br/>

![Header](https://user-images.githubusercontent.com/49127376/208478832-74eee443-c0fb-4691-beb6-adee42d063e3.png)

<p align="center">
 <a href="https://majoexe.xyz/server"><img src="https://img.shields.io/discord/666599184844980224?color=%234552ef&logo=discord&label=Discord&style=flat&logoColor=fff" alt="Discord" /></a>
 <a href="https://www.npmjs.com/package/discord.js"><img src="https://img.shields.io/badge/Discord.js-v14-%234552ef?style=flat&logo=npm&logoColor=fff" alt="Discord.js" /></a>
 <a href="https://majoexe.xyz/"><img src="https://img.shields.io/github/actions/workflow/status/igorkowalczyk/majo.exe/codeql-analysis.yml?branch=rebuild&style=flat&label=CodeQL&logo=github&color=%234552ef" alt="CodeQL Checks" /></a>
 <a href="https://majoexe.xyz"><img src="https://img.shields.io/github/license/igorkowalczyk/majo.exe?style=flat&;logo=github&label=License&color=%234552ef" alt="GitHub License" /></a>
</p>

## ✨ Features

- ⚙️ Fully customizable
- 🌆 Build-in Dashboard
- 📝 Easy Config
- 💯 150+ Commands
- 📚 Easy Hosting

## 🔗 Invite

Go to [this link](https://discord.com/oauth2/authorize/?permissions=4294967287&scope=bot%20applications.commands&client_id=949342410150924319) and add the bot (this requires `MANAGE_GUILD` permission) to your server.

> - [Or to make it easier, visit our website](https://beta.majoexe.xyz/)

## 🖥️ Hosting

We are hosting Majo.exe on our own servers. Majo.exe _will be_ online 24/7. [Invite Majo here!](https://beta.majoexe.xyz/api/invite)<br>
However, if you want to host Majo.exe yourself see links below.

- **[🤖 Bot setup tutorial](/apps/bot/README.md)**
- **[🔩 Dashboard setup tutorial](/apps/dashboard/README.md)**
- **[📝 Database setup tutorial](/packages/database/README.md)**

> [!WARNING]
> There is one global `.env` file for all projects. **Do not create `.env` file in `apps/bot`, `packages/database` or `apps/dashboard` folders!** **This can cause problems and potential security issues.**

## 🗜️ Requirements

- `PostgreSQL 13x` or higher
- `Node.js 18x` or higher
- `(Any)` Linux x64¹
- `256MB` of RAM
- `512MB/1GB` of hard drive space

> [!NOTE]
>
> 1: Debian based distros are recommended, bot can also run on Windows and MacOS but it's not recommended.

## Global `.env` file

| Variable        | Description                                      | Required (Bot) | Required (Dashboard) |
| --------------- | ------------------------------------------------ | -------------- | -------------------- |
| TOKEN           | Discord bot token                                | ✅             | ✅                   |
| SECRET          | Secret string (minimum 32 characters)            | ❌             | ✅                   |
| CLIENT_ID       | Discord client ID                                | ✅             | ✅                   |
| CLIENT_SECRET   | Discord client secret                            | ❌             | ✅                   |
| NEXTAUTH_URL    | NextAuth.js URL (e.g., http://localhost:3000)    | ❌             | ✅                   |
| NEXT_PUBLIC_URL | Next.js public URL (e.g., http://localhost:3000) | ❌¹            | ✅                   |
| HOTJAR_ID       | [Hotjar](https://hotjar.com) ID                  | ❌             | ❌                   |
| DATABASE_URL    | Main database URL                                | ✅             | ✅                   |
| DIRECT_URL      | Non-pooling database URL                         | ❌             | ❌                   |
| REDIS_URL       | Redis URL²                                       | ❌             | ❌                   |

> [!NOTE]
> 1: `NEXT_PUBLIC_URL` is required only if you want to also include the dashboard. 2. `REDIS_URL` enables caching. If you don't want to use Redis caching, leave this variable empty. Majo.exe will use Memory caching instead.

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

If you have any issues with the page please create [new issue here](https://github.com/igorkowalczyk/majo.exe/issues). When creating new issue please provide as much information as possible. If you can, please provide logs from console.

We will review your pull request as soon as possible. We might suggest some changes or improvements.

## 📥 Pull Requests

When submitting a pull request:

- Clone the repo.
- Create a branch off of `master` and give it a meaningful name (e.g. `my-awesome-new-feature`).
- Open a [pull request](https://github.com/igorkowalczyk/majo.exe/pulls) on [GitHub](https://github.com) and describe the feature or fix.

## 📋 License

This project is licensed under the MIT. See the [LICENSE](https://github.com/igorkowalczyk/majo.exe/blob/master/license.md) file for details

<details>
 <summary>The cake is a lie 🍰</summary>

<a href="https://igorkowalczyk.dev"><img src="https://views.igorkowalczyk.vercel.app/api/badge/majo.exe?style=flat-square&color=333333&label=Repo+views" alt="Github repository views"></a>

</details>
