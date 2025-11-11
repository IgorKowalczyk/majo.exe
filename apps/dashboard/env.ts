import { vercel } from "@t3-oss/env-core/presets-zod";
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  extends: [vercel()],
  server: {
    SECRET: z.string().min(1),
    NEXTAUTH_URL: z.string().url().min(1),
    HOTJAR_ID: z.string().optional(),
    TOKEN: z.string().min(1),
    CLIENT_ID: z.string().min(1),
    CLIENT_SECRET: z.string().min(1),
    DISCORD_SUPPORT_SERVER_ID: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_URL: z.string().url().min(3),
  },
  runtimeEnv: {
    SECRET: process.env.SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    HOTJAR_ID: process.env.HOTJAR_ID,
    TOKEN: process.env.TOKEN,
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    DISCORD_SUPPORT_SERVER_ID: process.env.DISCORD_SUPPORT_SERVER_ID,
  },
});
