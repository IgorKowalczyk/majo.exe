# Majo.exe Database

## 📝 Description

- `/prisma/schema.prisma` contains database schema. It's used by [Prisma](https://www.prisma.io/) to generate database client.
- `/prisma/migrations` contains database migrations. They are used to update database.
- `/index.js` contains database client. It's used by Majo.exe to interact with database.
- _[WIP]_ `/src/client.js` contains database client. It's used by Majo.exe to interact with database.
- _[WIP]_ `/src/client.edge.js` contains database edge client. It's used by Majo.exe dashboard to interact with database.

## 🗜️ Setup [preferred]

1. Create new [Neon](https://neon.tech/) account and create new database.
2. Copy database connection string and paste it to `.env` file `DATABASE_URL`
3. Copy non-pooling database connection string and paste it to `.env` file `DIRECT_URL`
4. Create new database and copy non-pooling database connection string and paste it to `.env` file `SHADOW_DATABASE_URL`

- Note: Neon doesn't support creating databases, you have to create it manually. Prisma require shadow database to generate migrations.

5. In `/packages/database` run `pnpm install` to install dependencies.
6. In `/packages/database` run `pnpm prisma migrate dev --name init` to generate & apply initial migration.
7. In `/packages/database` run `pnpm prisma generate` to generate database client.

## 📝 Contributors

- [@r-kjha](https://github.com/r-kjha) (Emoji config support, Bug fixes, New features, Testing)
- [@Joao-Victor-Liporini](https://github.com/Joao-Victor-Liporini) (Bug fixes, Command handler improvements, Testing, New features)
- [@krzesl0](https://github.com/krzesl0) (New Features, Bug fixes, Testing)
- [@\_index1337](https://github.com/index1337) (Readme tutorials)
- [@Wafelowski](https://github.com/HeavyWolfPL) (Translation improvements)
- [@Sakshyam6966](https://github.com/Sakshyam6966) (New Features, Bug fixes, Testing)

## 💝 Sponsors

**These wonderful people and services have helped develop Majo.exe, without them this project would not exist. Thanks goes to these wonderful people!**

| Sponsor                                            | Description                                                                                                                                                         |
| -------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [Terohost](https://my.terohost.com/aff.php?aff=17) | **TeroHost is a Discord Bot hosting** provider that helps take care of all your needs regarding your Discord Bot to ensure your bot perfect uptime, ping and speed. |

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
