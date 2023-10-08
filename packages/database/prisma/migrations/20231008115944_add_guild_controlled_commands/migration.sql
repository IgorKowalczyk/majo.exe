-- CreateTable
CREATE TABLE "CommandCategories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CommandCategories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "commands" (
    "id" TEXT NOT NULL,
    "command" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "options" JSONB[],
    "category_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "commands_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guild_disabled_commands" (
    "id" TEXT NOT NULL,
    "guild_id" TEXT NOT NULL,
    "command_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "guild_disabled_commands_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guild_disabled_categories" (
    "id" TEXT NOT NULL,
    "guild_id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "guild_disabled_categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CommandCategories_name_key" ON "CommandCategories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "commands_command_key" ON "commands"("command");

-- AddForeignKey
ALTER TABLE "commands" ADD CONSTRAINT "commands_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "CommandCategories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guild_disabled_commands" ADD CONSTRAINT "guild_disabled_commands_command_id_fkey" FOREIGN KEY ("command_id") REFERENCES "commands"("command") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guild_disabled_commands" ADD CONSTRAINT "guild_disabled_commands_guild_id_fkey" FOREIGN KEY ("guild_id") REFERENCES "guilds"("guild_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guild_disabled_categories" ADD CONSTRAINT "guild_disabled_categories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "CommandCategories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guild_disabled_categories" ADD CONSTRAINT "guild_disabled_categories_guild_id_fkey" FOREIGN KEY ("guild_id") REFERENCES "guilds"("guild_id") ON DELETE CASCADE ON UPDATE CASCADE;
