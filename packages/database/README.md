![Header - Database](https://github.com/IgorKowalczyk/majo.exe/assets/49127376/1c77665d-a599-4aa2-ae04-b4f7c2e810c9)

<p align="center">
 <a href="https://majoexe.xyz/server"><img src="https://img.shields.io/discord/695282860399001640?color=%234552ef&logo=discord&label=Discord&style=flat&logoColor=fff" alt="Discord" /></a>
 <a href="https://www.npmjs.com/package/discord.js"><img src="https://img.shields.io/badge/Discord.js-v14-%234552ef?style=flat&logo=npm&logoColor=fff" alt="Discord.js" /></a>
 <a href="https://majoexe.xyz/"><img src="https://img.shields.io/github/actions/workflow/status/igorkowalczyk/majo.exe/codeql-analysis.yml?branch=master&style=flat&label=CodeQL&logo=github&color=%234552ef" alt="CodeQL Checks" /></a>
 <a href="https://majoexe.xyz"><img src="https://img.shields.io/github/license/igorkowalczyk/majo.exe?style=flat&;logo=github&label=License&color=%234552ef" alt="GitHub License" /></a>
</p>

## 📝 Description

- `/prisma/schema.prisma` contains database schema. It's used by [Prisma](https://www.prisma.io/) to generate database client.
- `/prisma/migrations` contains database migrations. They are used to update database. Do not edit them manually.
- `/src/client.js` contains database client. It's used by Majo.exe to interact with database. It also includes edge client for Prisma Data Proxy.
- `/src/redis.js` contains Redis client. It's used by Majo.exe to cache queries and data. It supports Redis and memory cache depending on configuration. It also includes functions to add, remove and get data from cache.
- `/src/seed.js` contains database seed. It's used to populate database with initial data like bot slash commands. It's executed by `pnpm prisma:seed` or `pnpm prisma:generate` command.

> [!IMPORTANT]
> Never share your `.env` file with anyone. It contains sensitive data like database credentials, tokens and secrets. Leakage of this data can cause serious security issues.

## 🗜️ PostgreSQL

> [!NOTE]
> Before you start, make sure that you ran `pnpm install` command in root directory of the project.

### 🐘 Neon.tech

1. Create new [Neon](https://neon.tech/) account and create new PostgreSQL database.
2. Create new file or edit existing `.env` file in root directory of the project
3. In `.env` file set these values:
   - `DATABASE_URL` - pooling database connection string
   - `DIRECT_URL` - non-pooling database connection string
4. Run `pnpm install` to install dependencies.
5. Run `pnpm prisma:migrate` to generate & apply initial migration.
6. Run `pnpm prisma:generate` to generate database client.

### 🐳 Local PostgreSQL (Docker)

1. Install Docker by following the instructions at https://docs.docker.com/get-docker/.
2. Pull the PostgreSQL Docker image for version 15 (`docker pull postgres:15`) or use existing one.
3. Create a new container using the PostgreSQL image (`docker run --name majoexe -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres:15`)
4. Create new file or edit existing `.env` file in root directory of the project
5. In `.env` file set this values:
   - `DATABASE_URL=postgresql://postgres:postgres@localhost:5432/majoexe`
   - `DIRECT_URL=postgresql://postgres:postgres@localhost:5432/majoexe`
6. Run `pnpm install` to install dependencies.
7. Run `pnpm prisma:migrate` to generate & apply initial migration.
8. Run `pnpm prisma:generate` to generate database client.

> [!NOTE]
> Majo.exe can also work with other databases like MongoDB and MySQL. You can find more information about it in [Prisma documentation](https://www.prisma.io/docs/concepts/database-connectors). If you want to use other database you have to change `DATABASE_URL` in `.env` file and change schema in `/prisma/schema.prisma` file.

---

## ⌛ Caching [optional]

### ☁ Redis Cloud

1. Create new [Redis Cloud](https://app.redislabs.com/) account and create new Redis database.
2. Create new file or edit existing `.env` file in root directory of the project
3. In `.env` file set this values:
   - `REDIS_URL`- `ioredis` connection string (`redis://[...]`) from Redis Cloud
4. That's it! Majo.exe will automatically cache data in Redis Cloud.

### 🐳 Local Redis (Docker)

1. Install Docker by following the instructions at https://docs.docker.com/get-docker/.
2. Pull the Redis Docker image (`docker pull redis`) or use existing one.
3. Create a new container using the Redis image (`docker run --name redis -p 6379:6379 -d redis`)
4. Create new file or edit existing `.env` file in root directory of the project
5. In `.env` file set these values:
   - `REDIS_URL`- `ioredis` connection string (`redis://localhost:6379`)
6. That's it! Majo.exe will automatically cache data in Redis.

> [!NOTE]
> If you do not set `REDIS_URL` in `.env` file Majo.exe will use memory cache instead of Redis. Memory cache is not persistent and will be cleared after restarting Majo.exe. Memory cache will consume more resources than Redis cache.

---

## 🔒 Example `.env` file

```
DATABASE_URL=DATABASE_URL
DIRECT_URL=DIRECT_DATABASE_URL

REDIS_URL=REDIS_URL
```

> [!WARNING]
> This file should be in **root directory** of the project. This file is **super secret**, better to not share it!

---

## 📝 Contributors

- [**@binary-blazer**](https://github.com/binary-blazer) - Hosting support
- [**@r-kjha**](https://github.com/r-kjha) - Emoji config support, Bug fixes, New features, Testing
- [**@Joao-Victor-Liporini**](https://github.com/Joao-Victor-Liporini) - Bug fixes, Command handler improvements, Testing, New features
- [**@evandev**](https://github.com/xefew) - Bug fixes, Testing
- [**@krzesl0**](https://github.com/krzesl0) - New Features, Bug fixes, Testing
- [**@\_index1337**](https://github.com/index1337) - Readme tutorials
- [**@Wafelowski**](https://github.com/HeavyWolfPL) - Translation improvements
- [**@Sakshyam6966**](https://github.com/Sakshyam6966) - New Features, Bug fixes, Testing

## 💝 Sponsors

**These wonderful people and services have helped develop Majo.exe, without them this project would not exist. Thanks goes to these wonderful people!**

|                                                                                                                                        | Sponsor                                                             | Description                                                                                                             |
| -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------- |
| ![TrestHost Logo](https://majoexe.xyz/assets/sponsors/tresthost.png) | [**TrestHost**](https://dash.tresthost.me/register?ref=majonez.exe) | **TrestHost is a good and powerful hosting provider** providing servers from the **USA and Germany**. Try us out today! |

## ⁉️ Issues

If you have any issues with the bot please create [new issue here](https://github.com/igorkowalczyk/majo.exe/issues).
When creating a new issue please provide as much information as possible. If you can, please provide logs from console.

## 📥 Pull Requests

When submitting a pull request:

- Clone the repo.
- Create a branch off of `master` and give it a meaningful name (e.g. `my-awesome-new-feature`).
- Open a [pull request](https://github.com/igorkowalczyk/majo.exe/pulls) on [GitHub](https://github.com) and describe the feature or fix.

We will review your pull request as soon as possible. We might suggest some changes or improvements.

## 📋 License

This project is licensed under the MIT. See the [LICENSE](https://github.com/igorkowalczyk/majo.exe/blob/master/license.md) file for details
