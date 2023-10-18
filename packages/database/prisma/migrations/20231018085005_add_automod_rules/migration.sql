-- CreateTable
CREATE TABLE "auto_mod" (
    "id" TEXT NOT NULL,
    "guild_id" TEXT NOT NULL,
    "rule_id" TEXT NOT NULL,
    "rule_type" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "auto_mod_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "auto_mod_rule_id_key" ON "auto_mod"("rule_id");

-- AddForeignKey
ALTER TABLE "auto_mod" ADD CONSTRAINT "auto_mod_guild_id_fkey" FOREIGN KEY ("guild_id") REFERENCES "guilds"("guild_id") ON DELETE CASCADE ON UPDATE CASCADE;
