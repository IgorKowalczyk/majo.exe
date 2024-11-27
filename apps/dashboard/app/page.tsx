import { dashboardConfig, globalConfig } from "@majoexe/config";
import prismaClient from "@majoexe/database";
import { formatNumber, pseudoRandom } from "@majoexe/util/functions/util";
import Link from "next/link";
import avatar01 from "public/assets/avatars/01.webp";
import avatar03 from "public/assets/avatars/03.webp";
import avatar05 from "public/assets/avatars/05.webp";
import ray from "public/assets/ray.png";
import tada from "public/assets/tada.svg";
import tadaAnimated from "public/assets/tada_animated.gif";
import { Suspense } from "react";
import Balancer from "react-wrap-balancer";
import { AddReaction } from "@/app/_components/AddReaction";
import Faq from "@/app/_components/Faq";
import { LevelUp } from "@/app/_components/LevelUp";
import { buttonVariants } from "@/components/ui/Buttons";
import { LogDisclosure } from "@/app/dashboard/[server]/logs/components/Logs";
import { AnimatedShinyText } from "@/components/ui/effects/AnimatedShinyText";
import AreaChart from "@/components/client/shared/AreaChart";
import Image from "@/components/ui/Image";
import Header, { headerVariants } from "@/components/ui/Headers";
import { Icons, iconVariants } from "@/components/ui/Icons";
import { Typing } from "@/components/ui/Loaders";
import { LoginButton } from "@/components/LoginButton";
import { Notifications } from "@/app/_components/Notifications";
import { Command } from "@/lib/types";
import { ApplicationCommandOptionType } from "discord-api-types/v10";
import { cn } from "@/lib/utils";

export default async function HomePage() {
 const exampleLogs = [
  {
   id: "0",
   type: "command_change",
   guildId: "1234567890",
   authorId: "123456789",
   createdAt: new Date(new Date().getTime() - 2 * 16 * 60 * 15 * 1000).toISOString().toString(),
   content: "Disabled command /help",
   user: {
    discordId: "544164729354977282",
    global_name: "Robert",
    name: "Robert",
    //avatar: "0",
    fullAvatar: avatar03.src,
    avatar: "",
    discriminator: "0",
   },
  },
  {
   id: "1",
   type: "vanity",
   guildId: "1234567890",
   authorId: "123456789",
   createdAt: new Date(new Date().getTime() - 1 * 21 * 60 * 60 * 1000).toISOString().toString(),
   content: "Changed vanity URL to /majo",
   user: {
    discordId: "689210472345677282",
    global_name: "Jonas",
    name: "Jonas",
    //avatar: "0",
    fullAvatar: avatar01.src,
    avatar: "",
    discriminator: "0",
   },
  },
  {
   id: "2",
   type: "category_change",
   guildId: "1234567890",
   authorId: "123456789",
   createdAt: new Date(new Date().getTime() - 2 * 23 * 60 * 60 * 1000).toISOString().toString(),
   content: "Enabled category Fun",
   user: {
    discordId: "989210472345677282",
    global_name: "Ethan",
    name: "Ethan",
    //avatar: "0",
    fullAvatar: avatar05.src,
    avatar: "",
    discriminator: "0",
   },
  },
 ];

 const allCommands = (await prismaClient.commands.findMany({
  select: {
   name: true,
   options: true,
  },
 })) as unknown as Command[];

 let commandsCount = 0;

 allCommands.map((command) => {
  if (!command.options) return;

  command.options.map((option) => {
   if (!option) return;
   if (option.type === ApplicationCommandOptionType.Subcommand || option.type === ApplicationCommandOptionType.SubcommandGroup) commandsCount++;
   return option;
  });

  commandsCount++;
  return command;
 });

 const guilds = await fetch(`https://discord.com/api/v${globalConfig.apiVersion}/applications/@me`, {
  method: "GET",
  headers: {
   Authorization: `Bot ${process.env.TOKEN}`,
  },
  next: { revalidate: 3600 },
 });

 const jsonData = await guilds.json();

 return (
  <>
   <div className="relative z-20 flex min-h-screen w-full items-center justify-center before:absolute before:z-10 before:size-full before:opacity-5 before:grayscale before:md:bg-grid-[#fff]">
    <div className="absolute left-0 top-0 z-10 size-full bg-[radial-gradient(circle,rgba(2,0,36,0)0,rgb(16,17,16,100%))]" />
    <div className="relative z-20 -mt-8 flex w-full select-none flex-col items-center justify-center gap-4 px-3 md:w-[90%]">
     <Link href="/api/invite" className={cn("group rounded-full border border-white/5 bg-neutral-900 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-800")}>
      <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-400 hover:duration-300">
       <span>✨ Introducing Majo.exe</span>
       <Icons.arrowRight className={iconVariants({ variant: "normal", className: "-mr-1 ml-1 transition-transform ease-in-out group-hover:translate-x-0.5" })} />
      </AnimatedShinyText>
     </Link>

     <Header className={cn(headerVariants({ variant: "big", alignment: "center", effects: "gradient" }), "!font-black !leading-snug ")}>The only one Discord Bot</Header>
     <Header className={cn(headerVariants({ variant: "h2", alignment: "center" }), "text-white/70 font-normal max-w-[680px]")}>
      <Balancer>Majo.exe will not only keep your server entertained but also assist you with moderation and many other things!</Balancer>
     </Header>
     <div className="mt-2 flex flex-col gap-4 sm:flex-row">
      <LoginButton />
      <Link href="/api/invite" className={cn(buttonVariants({ variant: "secondary" }))}>
       <Icons.userAdd className={iconVariants({ variant: "button" })} />
       Add to your server
      </Link>
     </div>
    </div>
    <Image alt="Background" width={1000} height={1000} className="pointer-events-none absolute inset-x-0 -top-20 z-0 mx-auto hidden size-full select-none lg:block" src={ray.src} loading="eager" />
    <div className="absolute bottom-0 z-10 hidden min-h-[500px] w-full translate-y-1/2 flex-col items-center justify-center md:flex">
     <Image src="/assets/images/globe.png" alt="Globe" width={750} height={750} className="aspect-square max-w-full" loading="lazy" />
     {/* <GlobeClient /> */}
     <div className="absolute inset-0 -z-10 m-auto mt-[100px] size-[580px] rounded-full bg-[#ddd] opacity-5 blur-3xl" />
    </div>
   </div>
   <div className="relative z-20 bg-background-primary">
    <hr className="m-[0_auto] mb-8 h-px w-full border-none bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.1)_50%,transparent)] px-8 duration-300 motion-reduce:transition-none" />

    <div className="mx-auto max-w-7xl pb-10 md:px-8 lg:px-16">
     <div className="mx-auto flex flex-col justify-around gap-4 md:flex-row">
      <div className="flex flex-col items-center justify-center gap-4">
       <Header className={headerVariants({ variant: "h2", effects: "gradient" })}>{formatNumber(jsonData.approximate_guild_count || 0)}+ servers</Header>
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
       <Header className={headerVariants({ variant: "h2", effects: "gradient" })}>{formatNumber(commandsCount)}+ commands</Header>
      </div>

      <div className="flex flex-col items-center justify-center gap-4">
       <Header className={headerVariants({ variant: "h2", effects: "gradient" })}>{formatNumber(100000)}+ users</Header>
      </div>
     </div>

     <p className="my-6 w-full text-center text-white/70">...and counting!</p>

     <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 md:grid md:grid-cols-2 md:px-0 lg:grid-cols-3">
      <div className="row-span-1 overflow-hidden rounded-xl border border-neutral-800 bg-background-secondary p-4 duration-200 hover:bg-neutral-800/50">
       <Header className={headerVariants({ variant: "h2", effects: "gradient" })}>Image manipulation? We got you!</Header>
       <p className="mt-2 max-w-[680px] text-white/70">Want to edit an image? Or maybe you want to make a meme?</p>
       <div className="mt-3">
        <div className="flex flex-row items-center gap-1">
         <div className="ml-5 h-3 w-7 rounded-tl-md border-l-2 border-t-2 border-button-secondary" />
         <Image src={dashboardConfig.logo} alt="User avatar" quality={95} width={20} height={20} className="size-5 shrink-0 self-baseline rounded-full" />
         <span className="text-xs">
          <span className="font-bold">Majonez.exe</span> used <span className="font-bold text-accent-primary">/ai</span>
         </span>
        </div>
        <div className="flex items-center gap-1">
         <Image src={dashboardConfig.logo} alt={`${dashboardConfig.title} avatar`} quality={95} width={40} height={40} className="size-10 shrink-0 self-baseline rounded-full" />
         <div className="flex flex-col">
          <div className="ml-2 flex h-10 flex-row items-center">
           <span className="font-bold">{dashboardConfig.title}</span>{" "}
           <span className="ml-1 flex items-center gap-1 rounded bg-[#5c65f3] px-1 py-[0.12rem] text-xs text-white">
            <Icons.Check className={iconVariants({ variant: "small" })} /> <span className="-mb-px">BOT</span>
           </span>
           <span className="ml-2 text-sm text-gray-400">Today at 4:20 PM</span>
          </div>
          <span className="ml-2 flex items-center gap-2 text-gray-400">
           Generating image
           <Link href="/assets/avatars/cheese.jpeg" target="_blank" rel="noopener noreferrer">
            <Typing />
           </Link>
          </span>
         </div>
        </div>
       </div>
      </div>
      <div className="row-span-1 overflow-hidden rounded-xl border border-neutral-800 bg-background-secondary p-4 duration-200 hover:bg-neutral-800/50">
       <Header className={headerVariants({ variant: "h2", margin: "normal", effects: "gradient" })}>Leveling?</Header>
       <p className="mt-2 max-w-[680px] text-white/70">Majo.exe has a leveling system that will keep your members active and entertained.</p>
       <LevelUp avatar={dashboardConfig.logo} username="Majonez.exe" />
      </div>
      <div className="relative col-span-2 row-span-2 overflow-hidden rounded-xl border border-neutral-800 bg-background-secondary px-8 py-6 duration-200 hover:bg-neutral-800/50 lg:col-span-1">
       <Header className={cn(headerVariants({ variant: "h2", margin: "normal" }), "bg-gradient-to-b from-white to-neutral-400 box-decoration-clone bg-clip-text font-black text-fill-transparent")}>Moderation? We have it!</Header>
       <div className="absolute inset-0 z-0 m-auto mt-[100px] size-[580px] rounded-full bg-[#ddd] opacity-5 blur-3xl" />
       <div className="relative z-10">
        <p className="mt-2 max-w-[680px] text-white/70">
         <Balancer>Someone's breaking the rules? You can easily enable Auto-Moderation and Majo.exe will take care of the rest!</Balancer>
        </p>
        <div className="mt-3 h-48 overflow-hidden">
         <Notifications />
        </div>
       </div>
      </div>
      <div className="relative col-span-2 row-span-2 overflow-hidden rounded-xl border border-neutral-800 bg-background-secondary duration-200 hover:bg-neutral-800/50">
       <div className="relative z-50 h-full">
        <div className="px-8 py-6">
         <Header className={cn(headerVariants({ variant: "h1", margin: "normal" }), "bg-gradient-to-b from-white to-neutral-400 box-decoration-clone bg-clip-text font-black text-fill-transparent")}>Know more about your server</Header>
         <p className="max-w-[680px] text-white/70">
          <Balancer>With Majo.exe you can get to know your server better with the help of the dashboard. You can see the most active members, the most used channels and activity graphs!</Balancer>
         </p>
        </div>

        <div className="z-50 flex flex-col items-center justify-center gap-4 px-8 py-6 md:flex-row">
         <p className="flex cursor-pointer gap-1 rounded-full border border-accent-primary/50 bg-accent-primary/20 px-2 py-1 text-sm font-bold text-accent-primary backdrop-blur-md duration-200 hover:bg-accent-primary/30">
          +{Math.floor(Math.random() * 10 + 15)} users today
          <Icons.TrendingUp className={iconVariants({ variant: "normal" })} />
         </p>

         <p className="flex cursor-pointer gap-1 rounded-full border border-accent-primary/50 bg-accent-primary/20 px-2 py-1 text-sm font-bold text-accent-primary backdrop-blur-md duration-200 hover:bg-accent-primary/30">
          +{Math.floor(Math.random() * 500 + 100)} messages today
          <Icons.TrendingUp className={iconVariants({ variant: "normal" })} />
         </p>

         <p className="flex cursor-pointer gap-1 rounded-full border border-accent-primary/50 bg-accent-primary/20 px-2 py-1 text-sm font-bold text-accent-primary backdrop-blur-md duration-200 hover:bg-accent-primary/30">
          +{Math.floor(Math.random() * 80 + 5)}% increase in activity
          <Icons.TrendingUp className={iconVariants({ variant: "normal" })} />
         </p>
        </div>
       </div>
       <svg viewBox="0 0 512 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-x-0 bottom-0">
        <g id="Frame" clipPath="url(#chart-clip)">
         <path d="M0 119.141C5.632 118.328 16.896 116.991 28.16 115.076C39.424 113.162 45.056 110.603 56.32 109.569C67.584 108.535 73.216 111.017 84.48 109.907C95.744 108.798 101.376 105.376 112.64 104.021C123.904 102.666 129.536 105.474 140.8 103.131C152.064 100.787 157.696 93.9799 168.96 92.3035C180.224 90.628 185.856 95.9134 197.12 94.7504C208.384 93.5865 214.016 89.5922 225.28 86.4866C236.544 83.3811 242.176 82.357 253.44 79.2217C264.704 76.0863 270.336 70.9047 281.6 70.8081C292.864 70.7125 298.496 79.698 309.76 78.7399C321.024 77.7817 326.656 72.4313 337.92 66.0162C349.184 59.6012 354.816 48.3726 366.08 46.6665C377.344 44.9603 382.976 58.2199 394.24 57.4845C405.504 56.7501 411.136 50.4054 422.4 42.9925C433.664 35.5796 439.296 22.542 450.56 20.418C461.824 18.2941 467.456 31.6818 478.72 32.3747C489.984 33.0686 506.368 22.9011 512 21.203V120H0V119.141Z" fill={globalConfig.defaultColor} fillOpacity="0.1" />
         <path d="M-10 121.5C-4.368 120.687 16.896 116.991 28.16 115.076C39.424 113.162 45.056 110.603 56.32 109.569C67.584 108.535 73.216 111.017 84.48 109.907C95.744 108.798 101.376 105.376 112.64 104.021C123.904 102.666 129.536 105.474 140.8 103.131C152.064 100.787 157.696 93.9799 168.96 92.3035C180.224 90.628 185.856 95.9134 197.12 94.7504C208.384 93.5865 214.016 89.5922 225.28 86.4866C236.544 83.3811 242.176 82.357 253.44 79.2217C264.704 76.0863 270.336 70.9047 281.6 70.8081C292.864 70.7125 298.496 79.698 309.76 78.7399C321.024 77.7817 326.656 72.4313 337.92 66.0162C349.184 59.6012 354.816 48.3726 366.08 46.6665C377.344 44.9603 382.976 58.2199 394.24 57.4845C405.504 56.7501 411.136 50.4054 422.4 42.9925C433.664 35.5796 439.296 22.542 450.56 20.418C461.824 18.2941 467.456 31.6818 478.72 32.3747C489.984 33.0686 509.568 22.1161 515.2 20.418" stroke={globalConfig.defaultColor} strokeWidth="2" />
        </g>
        <defs>
         <clipPath id="chart-clip">
          <rect width="512" height="120" fill="white" />
         </clipPath>
        </defs>
       </svg>

       <div className="absolute inset-0 z-10 m-auto mt-[100px] size-[980px] rounded-full bg-[#ddd] opacity-5 blur-3xl" />
      </div>
      <div className="relative col-span-2 row-span-1 overflow-hidden rounded-xl border border-neutral-800 bg-background-secondary px-8 py-6 duration-200 hover:bg-neutral-800/50 lg:col-span-1">
       <Header className={headerVariants({ variant: "h2", margin: "normal", effects: "gradient" })}>Giveaways? Why not?</Header>
       <p className="mt-2 max-w-[680px] text-white/70">Want to host a giveaway or a drop? Majo.exe can help you with that! You can easily create and moderate giveaways with few simple commands!</p>
       <div className="my-6 flex items-center gap-1">
        <Image src={dashboardConfig.logo} alt={`${dashboardConfig.title} avatar`} quality={95} width={40} height={40} className="size-10 shrink-0 self-baseline rounded-full" />
        <div className="flex flex-col">
         <div className="ml-2 flex flex-row items-center">
          <span className="font-bold">{dashboardConfig.title}</span>{" "}
          <span className="ml-1 flex items-center gap-1 rounded bg-[#5c65f3] px-1 py-[0.12rem] text-xs text-white">
           <Icons.Check className={iconVariants({ variant: "small" })} /> <span className="-mb-px">BOT</span>
          </span>
          <span className="ml-2 text-sm text-gray-400">Today at 4:20 PM</span>
         </div>
         <div
          className="ml-1 mt-2 rounded bg-[#2b2d31] p-4 shadow-lg"
          style={{
           borderLeft: `4px solid ${globalConfig.defaultColor}`,
          }}
         >
          <div className="flex flex-row gap-8">
           <div>
            <span className="font-bold">🎉 New giveaway!</span>
            <span className="mt-1 block text-sm text-gray-400">React with 🎉 to participate!</span>
           </div>

           <Image src={tadaAnimated.src} alt="Giveaway emoji" quality={95} width={64} height={64} className="size-16 shrink-0" />
          </div>
         </div>
         <AddReaction reaction={tada} />
        </div>
       </div>
      </div>
     </div>
    </div>

    <div className="mx-auto mt-12 pb-10 md:px-8 lg:px-16">
     <Header className={headerVariants({ variant: "medium", margin: "normal", alignment: "center", effects: "gradient" })}>
      Trusted by more than <span className="bg-gradient-to-b from-accent-primary to-accent-primary box-decoration-clone bg-clip-text text-fill-transparent">{formatNumber(jsonData.approximate_guild_count || 0)}+</span> servers
     </Header>
     <p className="mb-6 mt-3 w-full text-center text-white/70">
      <Balancer>
       Majo.exe is trusted by more than {formatNumber(jsonData.approximate_guild_count || 0)} servers and {formatNumber(100000)} users! Join them and see what Majo.exe can do for you!
      </Balancer>
     </p>

     <Link href="/api/invite" className={cn(buttonVariants({ variant: "secondary" }), "mx-auto w-fit")}>
      <Icons.userAdd className={iconVariants({ variant: "button" })} />
      Add to your server
     </Link>

     <Icons.arrowDown className="mx-auto mt-12 size-8 animate-bounce text-accent-primary" />

     <div className="mx-auto my-16 flex max-w-7xl flex-col gap-8 px-4 lg:flex-row lg:gap-16 lg:px-0">
      <div className="flex w-full flex-col justify-center gap-2 lg:w-2/5">
       <Header className={headerVariants({ variant: "h1", margin: "normal", effects: "gradient" })}>See what's happening in your server</Header>
       <p className="text-white/70">With Majo.exe you can see your server statistics in real-time. You can see the most active members, the most used channels and much more!</p>
      </div>
      <div className="w-full overflow-hidden rounded-xl border border-neutral-800 bg-background-secondary py-6 pl-4 pr-8 duration-200 hover:bg-neutral-800/50 lg:w-3/5">
       <Suspense fallback={<div className="h-56 w-full rounded-xl border border-neutral-800 bg-background-secondary" />}>
        <AreaChart
         className="h-56"
         data={Array.from({ length: 30 }, (_, i) => ({
          date: new Date(Date.now() - i * 86400000).toISOString().split("T")[0],
          Joins: Math.floor(pseudoRandom(i)),
         }))}
         index="date"
         categories={["Joins"]}
         yAxisWidth={50}
         showYAxis={true}
         showXAxis={false}
        />
       </Suspense>
      </div>
     </div>

     <div className="mx-auto my-16 flex max-w-7xl flex-col-reverse gap-6 px-4 lg:flex-row lg:gap-16 lg:px-0">
      <div className="w-full lg:w-3/5">
       {exampleLogs.map((log) => (
        <LogDisclosure item={log} key={log.id} preview={true} guildId="123" />
       ))}
      </div>
      <div className="flex w-full flex-col justify-center gap-2 lg:w-2/5">
       <Header className={headerVariants({ variant: "h1", margin: "normal", effects: "gradient" })}>Keep track of everything</Header>
       <p className="text-white/70">Majo.exe has a powerful logging system that will keep track of everything that happens in your server. You can easily see who did what and when!</p>
      </div>
     </div>
    </div>
   </div>
   <div className="mx-auto pb-10 md:px-8 lg:px-16">
    <Header className={headerVariants({ variant: "medium", margin: "normal", alignment: "center", effects: "gradient" })}>Frequently asked questions</Header>

    <Faq />
   </div>

   <div className="mx-auto mt-12 pb-10 md:px-8 lg:px-16">
    <Header className={headerVariants({ variant: "medium", margin: "normal", alignment: "center", effects: "gradient" })}>What are you waiting for?</Header>
    <p className="mb-6 mt-3 w-full text-center text-white/70">
     <Balancer>Don't wait ages to add Majo.exe to your server! Invite it now and see it in action!</Balancer>
    </p>

    <Link href="/api/invite" className={cn(buttonVariants({ variant: "primary" }), "mx-auto w-fit")}>
     <Icons.userAdd className={iconVariants({ variant: "button" })} />
     Add to your server
    </Link>
   </div>
  </>
 );
}
