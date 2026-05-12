![Header](https://github.com/IgorKowalczyk/majo.exe/assets/49127376/8fd53e0b-1902-460c-9d6c-7d42ea84f8bb)

<p align="center">
 <a href="https://majoexe.com/server"><img src="https://img.shields.io/discord/695282860399001640?color=%234552ef&logo=discord&label=Discord&style=flat&logoColor=fff" alt="Discord" /></a>
 <a href="https://www.npmjs.com/package/discord.js"><img src="https://img.shields.io/badge/Discord.js-v14-%234552ef?style=flat&logo=npm&logoColor=fff" alt="Discord.js" /></a>
 <a href="https://majoexe.com/"><img src="https://img.shields.io/github/actions/workflow/status/igorkowalczyk/majo.exe/codeql-analysis.yml?branch=master&style=flat&label=CodeQL&logo=github&color=%234552ef" alt="CodeQL Checks" /></a>
 <a href="https://majoexe.com"><img src="https://img.shields.io/github/license/igorkowalczyk/majo.exe?style=flat&;logo=github&label=License&color=%234552ef" alt="GitHub License" /></a>
</p>

## ✨ Features

- ⚙️ **Fully Customizable:** Tailor Majo.exe to your preferences with comprehensive customization options.
- 🌆 **Built-in Dashboard:** Manage your Majo.exe settings effortlessly through our intuitive dashboard.
- 📝 **Easy Configuration:** Streamlined configuration process that makes setting up a breeze.
- 💯 **150+ Commands:** Access over 150 versatile commands to enrich your server's experience.
- 📚 **Easy Hosting:** Effortlessly host Majo.exe on your servers and keep it online 24/7.

## 🔗 Invite

Go to [this link](https://discord.com/oauth2/authorize/?permissions=4294967287&scope=bot%20applications.commands&client_id=949342410150924319) and add the bot (this requires `MANAGE_GUILD` permission) to your server.

[Or to make it easier, visit our website](https://majoexe.com/)

## 🖥️ Hosting

We are hosting Majo.exe on our own servers. Majo.exe will be online 24/7. [Invite Majo here!](https://majoexe.com/api/invite)  
However, if you want to host Majo.exe yourself, you can do it. [Check out our tutorials](#-tutorials) to learn how to do it.

<!-- prettier-ignore-start -->
> [!IMPORTANT]
> **This project is not for beginners.** If you are not familiar with Node.js, Prisma, Discord.js or any other technology used in this project, you should not host Majo.exe yourself!
<!-- prettier-ignore-end -->

### 📝 Tutorials

- **[🤖 Bot setup tutorial](/apps/bot/README.md)**
- **[🔩 Dashboard setup tutorial](/apps/dashboard/README.md)**
- **[📝 Database setup tutorial](/packages/database/README.md)**

## ⚙️ System Requirements

Ensure your setup meets these prerequisites before setting up Majo.exe:

- `PostgreSQL 14x` or higher
- `Node.js 18x` or higher
- `(Any)` Linux x64¹
- `~512MB` of RAM (minimum)
- `~3GB` of hard drive space (minimum)

<!-- prettier-ignore-start -->
> [!NOTE]
> 1. Debian based distros are recommended, bot can also run on Windows and MacOS but it's not recommended.
<!-- prettier-ignore-end -->

## 🔒 `.env` files

| Variable                    | Description                                              | Required (Bot) | Required (Dashboard) |
| --------------------------- | -------------------------------------------------------- | -------------- | -------------------- |
| `TOKEN`                     | Discord bot token                                        | `✅ Yes`       | `✅ Yes`             |
| `CLIENT_ID`                 | Discord client ID                                        | `✅ Yes`       | `✅ Yes`             |
| `CLIENT_SECRET`             | Discord client secret                                    | `❌ No`        | `✅ Yes`             |
| `DATABASE_URL`              | Main database connection string                          | `✅ Yes`       | `✅ Yes`             |
| `DATABASE_URL_UNPOOLED`     | Non-pooling database connection string                   | `❌ No`        | `❌ No`              |
| `REDIS_URL`                 | Redis Cache connection string                            | `✅ Yes`       | `✅ Yes`             |
| `SECRET`                    | Secret string (minimum 32 characters)                    | `❌ No`        | `✅ Yes`             |
| `NEXTAUTH_URL`              | NextAuth.js URL (e.g., http://localhost:3000)            | `❌ No`        | `✅ Yes`             |
| `NEXT_PUBLIC_URL`           | Next.js public URL (e.g., http://localhost:3000)         | `❌ No`¹       | `✅ Yes`             |
| `HOTJAR_ID`                 | [Hotjar](https://hotjar.com) ID                          | `❌ No`        | `❌ No`              |
| `DISCORD_SUPPORT_SERVER_ID` | Discord support server ID                                | `❌ No`        | `❌ No`²             |
| `TOPGG_API_KEY`             | [top.gg](https://top.gg) API key                         | `❌ No`        | `❌ No`³             |
| `DISCORD_BOT_LIST_API_KEY`  | [discordbotlist.com](https://discordbotlist.com) API key | `❌ No`        | `❌ No`⁴             |

<!-- prettier-ignore-start -->
> [!NOTE]
> 1. `NEXT_PUBLIC_URL` is required only if you want to also host the dashboard.
> 2. `DISCORD_SUPPORT_SERVER_ID` is required only if you want to automatically add users to your own Discord server when they log in to the dashboard. Please note that the bot needs `Manage Server` permission in the server!\
> 3. `TOPGG_API_KEY` is required only if you want to automatically post server count to [top.gg](https://top.gg).
> 4. `DISCORD_BOT_LIST_API_KEY` is required only if you want to automatically post server count, stats and more to [discordbotlist.com](https://discordbotlist.com).

<!-- prettier-ignore-end -->

## 📝 Contributors

- [**@binary-blazer**](https://github.com/binary-blazer) - Hosting support
- [**@TsukiyoDevs**](https://github.com/TsukiyoDevs) - Bug fixes, New features, Testing
- [**@r-kjha**](https://github.com/r-kjha) - Emoji config support, Bug fixes, New features, Testing
- [**@Joao-Victor-Liporini**](https://github.com/Joao-Victor-Liporini) - Bug fixes, Command handler improvements, Testing, New features
- [**@evandev**](https://github.com/xefew) - Bug fixes, Testing
- [**iWeedy\_**](https://github.com/i-weedy) - Testing
- [**@krzesl0**](https://github.com/krzesl0) - New Features, Bug fixes, Testing
- [**@\_index1337**](https://github.com/index1337) - Readme tutorials
- [**@Wafelowski**](https://github.com/HeavyWolfPL) - Translation improvements
- [**@Sakshyam6966**](https://github.com/Sakshyam6966) - New Features, Bug fixes, Testing

<!-- ## 💝 Sponsors

**These wonderful people and services have helped develop Majo.exe, without them this project would not exist. Thanks goes to these wonderful people!**

|                                                                      | Sponsor                                                             | Description                                                                                                             |
| -------------------------------------------------------------------- | ------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------- |
| ![TrestHost Logo](https://majoexe.com/assets/sponsors/tresthost.png) | [**TrestHost**](https://dash.tresthost.me/register?ref=majonez.exe) | **TrestHost is a good and powerful hosting provider** providing servers from the **USA and Germany**. Try us out today! | -->

## ⁉️ Issues

If you have any issues with the page please create [new issue here](https://github.com/igorkowalczyk/majo.exe/issues). When creating new issue please provide as much information as possible. If you can, please provide logs from console.

We will review your pull request as soon as possible. We might suggest some changes or improvements.

## 📥 Pull Requests

When submitting a pull request:

- Clone the repository (`git clone https://github.com/igorkowalczyk/majo.exe`)
- Create a branch off of `master` and give it a meaningful name (e.g. `my-awesome-new-feature`).
- Open a [pull request](https://github.com/igorkowalczyk/majo.exe/pulls) on [GitHub](https://github.com) and describe the feature or fix.

## 📋 License

This project is licensed under the MIT. See the [LICENSE](https://github.com/igorkowalczyk/majo.exe/blob/master/license.md) file for details

<details>
 <summary>The cake is a lie 🍰</summary>

<a href="https://igorkowalczyk.dev"><img src="https://views.igorkowalczyk.vercel.app/api/badge/majo.exe?style=flat-square&color=333333&label=Repo+views" alt="Github repository views"></a>

</details>
