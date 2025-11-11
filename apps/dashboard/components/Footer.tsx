"use client";

import { dashboardConfig } from "@majoexe/config";
import { SparklesIcon } from "lucide-react";
import Link from "next/link";
import { useSelectedLayoutSegment, usePathname } from "next/navigation";
import React, { HTMLAttributes } from "react";
import { buttonVariants } from "@/components/ui/Buttons";
import Image from "@/components/ui/Image";
import { cn } from "@/lib/utils";

export const Footer = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  const segment = useSelectedLayoutSegment();
  const pathname = usePathname();

  return (
    <footer
      {...props}
      className={cn(
        {
          "w-full! md:pl-[18rem]!": segment === "dashboard" && pathname !== "/dashboard",
          "w-full xl:w-4/5": segment !== "dashboard" || pathname === "/dashboard",
        },
        "mx-auto px-4 py-10 md:px-8 lg:px-16",
        className
      )}
    >
      <div className="mx-auto pt-10">
        <div className="grid grid-cols-2 gap-9 md:grid-cols-5">
          <div className="col-span-3 flex flex-col justify-center">
            <div className="flex items-center space-x-5">
              <Link href="/">
                <p className="flex cursor-pointer items-center text-2xl font-semibold">
                  <Image className="mr-2 size-9 min-h-9 min-w-9 rounded-full" src={dashboardConfig.logo} alt={`${dashboardConfig.title} logo`} width={36} height={36} />
                  {dashboardConfig.title}
                </p>
              </Link>
            </div>

            {/* ================== DO NOT REMOVE ================== */}
            {/* YOU ARE NOT ALLOWED TO REMOVE, HIDE OR MODIFY THIS TEXT!
         This project is licensed under the MIT License!   */}
            {/* =================================================== */}
            {!process.env.NEXT_PUBLIC_IS_HOSTED_BY_CREATOR ? (
              <div className="mt-3 text-neutral-300">
                <Link target="_blank" href="https://majoexe.com" className="font-semibold text-accent-primary hover:opacity-80">
                  🔥 Powered by Majo.exe!
                </Link>
                <div className="mt-2">
                  This is a public instance of Majo.exe - a free and open-source Discord bot. You can invite it to your server by clicking on the button below or{" "}
                  <Link href="https://majoexe.com/invite" className="font-semibold text-neutral-200 hover:underline">
                    by clicking here
                  </Link>
                  .
                  <Link className={cn(buttonVariants({ variant: "primary" }), "mt-3 w-fit")} href="https://majoexe.com/invite">
                    <SparklesIcon className="mr-2 size-5" />
                    Invite original Majo.exe
                  </Link>
                </div>
              </div>
            ) : (
              <p className="mt-3 text-neutral-300">🔥 Bot for almost everything - Memes, Image editing, Giveaways, Moderation, Anime and even more!</p>
            )}
            {/* =================================================== */}
            <br />
          </div>

          <div className="col-span-1 text-neutral-300">
            <p className="mt-3 font-semibold text-white sm:mb-3 sm:mt-0">Useful links</p>
            <div>
              <Link href={`${dashboardConfig.url}/discord`} className="mt-2 block duration-100 hover:text-neutral-300 hover:underline motion-reduce:transition-none">
                Discord server
              </Link>
              <Link href={`${dashboardConfig.url}/contact`} className="mt-2 block duration-100 hover:text-neutral-300 hover:underline motion-reduce:transition-none">
                Contact us
              </Link>
              <Link href="https://github.com/igorkowalczyk/majo.exe" className="mt-2 block duration-100 hover:text-neutral-300 hover:underline motion-reduce:transition-none">
                Source code
              </Link>
            </div>
          </div>

          <div className="col-span-1 text-neutral-300">
            <p className="mt-3 font-semibold text-white sm:mb-3 sm:mt-0">Legal</p>
            <div>
              <Link href={`${dashboardConfig.url}/legal/privacy-policy`} className="mt-2 block duration-100 hover:text-neutral-300 hover:underline motion-reduce:transition-none">
                Privacy Policy
              </Link>
              <Link href={`${dashboardConfig.url}/legal/terms-of-service`} className="mt-2 block duration-100 hover:text-neutral-300 hover:underline motion-reduce:transition-none">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-5 flex text-center text-neutral-300">
          {/* ================== DO NOT REMOVE ================== */}
          {/* YOU ARE NOT ALLOWED TO REMOVE, HIDE OR MODIFY THIS TEXT!
         This project is licensed under the MIT License!   */}
          {/* =================================================== */}
          <p className="text-sm font-semibold opacity-80">
            Copyright &copy; 2020 - {new Date().getFullYear()}{" "}
            <Link className="hover:opacity-80" href="https://igorkowalczyk.dev">
              Igor Kowalczyk
            </Link>
            , All rights reserved.
          </p>
          {/* =================================================== */}
        </div>
      </div>
    </footer>
  );
};
