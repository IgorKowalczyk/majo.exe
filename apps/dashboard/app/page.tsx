import { dashboardConfig, globalConfig } from "@majoexe/config";
import prismaClient from "@majoexe/database";
import { GuildLogType } from "@majoexe/database/types";
import { pseudoRandom } from "@majoexe/util/functions/util";
import { ApplicationCommandOptionType } from "discord-api-types/v10";
import { CheckIcon, ChevronRightIcon, TrendingUpIcon } from "lucide-react";
import type { Metadata } from "next";
import avatar01 from "public/assets/avatars/01.webp";
import avatar03 from "public/assets/avatars/03.webp";
import avatar05 from "public/assets/avatars/05.webp";
import ray from "public/assets/ray.png";
import tada from "public/assets/tada.svg";
import tadaAnimated from "public/assets/tada_animated.gif";
import { Suspense } from "react";
import Balancer from "react-wrap-balancer";
import { BotReplacement } from "./_components/BotReplacement";
import { ExampleChart } from "./_components/ExampleChart";
import { statisticsChartConfig } from "./dashboard/[server]/statistics/page";
import { AddReaction } from "@/app/_components/AddReaction";
import { LevelUp } from "@/app/_components/LevelUp";
import { Notifications } from "@/app/_components/Notifications";
import { LogDisclosure } from "@/app/dashboard/[server]/dashboard-logs/components/Logs";
import { StatsChart } from "@/components/client/charts/ServerStatsChart";
import { LoginButton } from "@/components/LoginButton";
import { buttonVariants } from "@/components/ui/Buttons";
import { AnimatedShinyText } from "@/components/ui/effects/AnimatedShinyText";
import { BorderBeam } from "@/components/ui/effects/BorderBeam";
import { Fade } from "@/components/ui/effects/FadeText";
import FlickeringGrid from "@/components/ui/effects/FlickeringGrid";
import { NumberTicker } from "@/components/ui/effects/NumberTicker";
import Particles from "@/components/ui/effects/Particles";
import Ripple from "@/components/ui/effects/Ripple";
import { WordPullUp } from "@/components/ui/effects/WordPullUp";
import Header, { headerVariants } from "@/components/ui/Headers";
import { Icons, iconVariants } from "@/components/ui/Icons";
import Image from "@/components/ui/Image";
import { Typing } from "@/components/ui/Loaders";
import { env } from "@/env";
import { Command } from "@/lib/types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/Accordion";

export const metadata: Metadata = {
 title: "Majo.exe - The only one Discord Bot",
 description: "Majo.exe will not only keep your server entertained but also assist you with moderation and many other things!",
};

export default async function Page() {
 const exampleLogs = [
  {
   id: "0",
   type: GuildLogType.CommandEnable,
   guildId: "1234567890",
   authorId: "123456789",
   createdAt: new Date(new Date().getTime() - 2 * 16 * 60 * 15 * 1000).toISOString().toString(),
   content: "Disabled command /help",
   data: {},
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
   type: GuildLogType.VanityUpdate,
   guildId: "1234567890",
   authorId: "123456789",
   createdAt: new Date(new Date().getTime() - 1 * 21 * 60 * 60 * 1000).toISOString().toString(),
   content: "Changed vanity URL to /majo",
   data: {},
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
   type: GuildLogType.CommandCategoryEnable,
   guildId: "1234567890",
   authorId: "123456789",
   createdAt: new Date(new Date().getTime() - 2 * 23 * 60 * 60 * 1000).toISOString().toString(),
   content: "Enabled category Fun",
   data: {},
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

 const faqItems = [
  {
   question: "What is Majo.exe",
   answer:
    "Majo.exe is a multi-purpose Discord bot that offers a wide range of features such as moderation, image manipulation, leveling, auto-moderation, and much more. It's designed to be easy to use and highly customizable - perfect for any server.",
  },
  {
   question: "Do you offer technical support?",
   answer: "Yes! If you have any issues, we're here to help you. Just join our Discord server and ask for help.",
  },
  {
   question: "Is Majo.exe free?",
   answer: "Yes! Majo.exe is free to use and always will be. We are planning to offer premium features in the future, but the core bot will always be free.",
  },
  {
   question: "How do I invite Majo.exe to my server?",
   answer:
    "You can invite Majo.exe to your server by clicking the 'Add to server' button on our website. You'll need to have the 'Manage Server' permission to add the bot to your server.",
  },
  {
   question: "How do I report a bug?",
   answer: "If you find a bug, please report it on our GitHub repository. We'll do our best to fix it as soon as possible.",
  },
 ];

 const allCommands = (await prismaClient.commands.findMany({
  select: {
   name: true,
   options: true,
  },
 })) as unknown as Command[];

 let commandsCount = 0;

 allCommands.forEach((command) => {
  if (!command.options) return;

  command.options.forEach((option) => {
   if (!option) return;
   if (option.type === ApplicationCommandOptionType.Subcommand || option.type === ApplicationCommandOptionType.SubcommandGroup) commandsCount++;
  });

  commandsCount++;
 });
 const guilds = await fetch(`https://discord.com/api/v${globalConfig.apiVersion}/applications/@me`, {
  method: "GET",
  headers: {
   Authorization: `Bot ${env.TOKEN}`,
  },
  next: { revalidate: 3600 },
 });

 const jsonData = await guilds.json();

 return (
  <div className="p-6">
   <div className="relative z-20 flex min-h-screen w-full items-center justify-center">
    <div className="absolute left-0 top-0 z-10 size-full bg-[radial-gradient(circle,rgba(2,0,36,0)0,rgb(16,17,16,100%))]" />
    <div className="relative z-20 -mt-8 flex w-full select-none flex-col items-center justify-center gap-3 px-3 md:w-[90%]">
     <Fade
      framerProps={{
       show: { opacity: 1, transition: { type: "spring", delay: 0.85, duration: 0.5 } },
      }}
     >
      <Link
       href="/api/invite"
       className={cn("group rounded-full border flex transition-all ease-in hover:cursor-pointer  border-neutral-800 bg-neutral-900 hover:border-neutral-700 hover:bg-neutral-800")}
      >
       <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-400 hover:duration-300">
        <span>✨ Introducing Majo.exe</span>
        <ChevronRightIcon className={iconVariants({ variant: "normal", className: "-mr-1 ml-1 transition-transform ease-in-out group-hover:translate-x-0.5" })} />
       </AnimatedShinyText>
      </Link>
     </Fade>
     <WordPullUp
      wordsClassName={cn(headerVariants({ variant: "big", alignment: "center", effects: "gradient" }), "font-black! leading-snug!")}
      words="The only one Discord Bot"
      className="text-center"
     />
     <Fade
      framerProps={{
       show: { opacity: 1, transition: { type: "spring", delay: 0.9, duration: 0.5 } },
      }}
     >
      <Header className={cn(headerVariants({ variant: "h2", alignment: "center" }), "max-w-[680px] font-normal text-white/70")}>
       Majo.exe will not only keep your server entertained but also assist you with moderation and many other things!
      </Header>
     </Fade>
     <Fade
      framerProps={{
       show: { opacity: 1, transition: { type: "spring", delay: 0.95, duration: 0.5 } },
      }}
     >
      <div className="mt-2 flex flex-col gap-3 sm:flex-row">
       <LoginButton />
       <Link href="/api/invite" className={cn(buttonVariants({ variant: "secondary" }))}>
        <Icons.userAdd className={iconVariants({ variant: "button" })} />
        Add to your server
       </Link>
      </div>
     </Fade>
    </div>
    <Particles className="absolute inset-0" quantity={200} ease={80} color={"#fff"} refresh />

    <Image
     alt="Background"
     width={1000}
     height={1000}
     className="pointer-events-none absolute inset-x-0 -top-20 z-0 mx-auto hidden size-full select-none lg:block"
     src={ray.src}
     loading="eager"
    />

    <div className="absolute bottom-0 z-10 hidden min-h-[500px] w-full translate-y-1/2 flex-col items-center justify-center md:flex">
     <Fade
      framerProps={{
       show: { opacity: 1, transition: { type: "spring", delay: 1, duration: 0.5 } },
      }}
     >
      <Image src="/assets/images/globe.png" alt="Globe" width={750} height={750} className="aspect-square max-w-full" loading="lazy" />
      {/* <GlobeClient /> */}
      <div className="absolute inset-0 -z-10 m-auto mt-[100px] size-[580px] rounded-full bg-[#ddd] opacity-5 blur-3xl" />
     </Fade>
    </div>
   </div>
   <div className="relative z-20 bg-background-primary">
    <hr className="m-[0_auto] mb-8 h-px w-full border-none bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.1)_50%,transparent)] px-8 duration-300 motion-reduce:transition-none" />
    <div className="mx-auto mb-32 max-w-[1400px] md:px-8 lg:px-16">
     <div className="mx-auto flex flex-col justify-around gap-3 md:flex-row">
      <div className="flex flex-col items-center justify-center gap-3">
       <Header className={headerVariants({ variant: "h2", effects: "gradient" })}>
        <span>
         <Suspense fallback={<span>{jsonData.approximate_guild_count || 0}</span>}>
          <NumberTicker value={jsonData.approximate_guild_count || 0} />
         </Suspense>
         + servers
        </span>
       </Header>
      </div>
      <div className="flex flex-col items-center justify-center gap-3">
       <Header className={headerVariants({ variant: "h2", effects: "gradient" })}>
        <span>
         <Suspense fallback={<span>{commandsCount}</span>}>
          <NumberTicker value={commandsCount} />
         </Suspense>
         + commands
        </span>
       </Header>
      </div>

      <div className="flex flex-col items-center justify-center gap-3">
       <Header className={headerVariants({ variant: "h2", effects: "gradient" })}>
        <span>
         <Suspense fallback={<span>100000</span>}>
          <NumberTicker value={100000} />
         </Suspense>
         + users
        </span>
       </Header>
      </div>
     </div>

     <p className="my-6 w-full text-center text-sm text-neutral-400">...and counting!</p>

     <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-6 px-4 md:grid md:grid-cols-2 md:px-0 lg:grid-cols-3">
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
           <span className="ml-1 flex items-center gap-1 rounded-sm bg-[#5c65f3] px-1 py-[0.12rem] text-xs text-white">
            <CheckIcon className={iconVariants({ variant: "small" })} /> <span className="-mb-px">BOT</span>
           </span>
           <span className="ml-2 text-sm text-neutral-400">Today at 4:20 PM</span>
          </div>
          <span className="ml-2 flex items-center gap-1  text-neutral-400">
           Generating image
           <Link href="/assets/avatars/cheese.jpeg" target="_blank" rel="noopener noreferrer">
            <Typing className="mx-2" />
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
       <Header
        className={cn(
         headerVariants({ variant: "h2", margin: "normal" }),
         "text-fill-transparent bg-linear-to-b from-white to-neutral-400 box-decoration-clone bg-clip-text font-black"
        )}
       >
        Moderation? We have it!
       </Header>
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
         <Header
          className={cn(
           headerVariants({ variant: "h1", margin: "normal" }),
           "text-fill-transparent bg-linear-to-b from-white to-neutral-400 box-decoration-clone bg-clip-text font-black"
          )}
         >
          Know more about your server
         </Header>
         <p className="max-w-[680px] text-white/70">
          <Balancer>
           With Majo.exe you can get to know your server better with the help of the dashboard. You can see the most active members, the most used channels and activity graphs!
          </Balancer>
         </p>
        </div>
        <div className="z-50 flex flex-col items-center justify-center gap-3 px-8 py-6 md:flex-row">
         <p className="flex cursor-pointer gap-1 rounded-full border border-accent-primary/50 bg-accent-primary/20 px-2 py-1 text-sm font-bold text-accent-primary backdrop-blur-md duration-200 hover:bg-accent-primary/30">
          +{Math.floor(Math.random() * 10 + 15)} users today
          <TrendingUpIcon className={iconVariants({ variant: "normal" })} />
         </p>

         <p className="flex cursor-pointer gap-1 rounded-full border border-accent-primary/50 bg-accent-primary/20 px-2 py-1 text-sm font-bold text-accent-primary backdrop-blur-md duration-200 hover:bg-accent-primary/30">
          +{Math.floor(Math.random() * 500 + 100)} messages today
          <TrendingUpIcon className={iconVariants({ variant: "normal" })} />
         </p>

         <p className="flex cursor-pointer gap-1 rounded-full border border-accent-primary/50 bg-accent-primary/20 px-2 py-1 text-sm font-bold text-accent-primary backdrop-blur-md duration-200 hover:bg-accent-primary/30">
          +{Math.floor(Math.random() * 80 + 5)}% increase in activity
          <TrendingUpIcon className={iconVariants({ variant: "normal" })} />
         </p>
        </div>
       </div>
       <ExampleChart />
       <div className="absolute inset-0 z-10 m-auto mt-[100px] size-[980px] rounded-full bg-[#ddd] opacity-5 blur-3xl" />
      </div>
      <div className="relative col-span-2 row-span-1 overflow-hidden rounded-xl border border-neutral-800 bg-background-secondary px-8 py-6 pb-2 duration-200 hover:bg-neutral-800/50 lg:col-span-1">
       <Header className={headerVariants({ variant: "h2", margin: "normal", effects: "gradient" })}>Giveaways? Why not?</Header>
       <p className="mt-2 max-w-[680px] text-white/70">
        Want to host a giveaway or a drop? Majo.exe can help you with that! You can easily create and moderate giveaways with few simple commands!
       </p>
       <div className="my-6 flex items-center gap-1">
        <Image src={dashboardConfig.logo} alt={`${dashboardConfig.title} avatar`} quality={95} width={40} height={40} className="size-10 shrink-0 self-baseline rounded-full" />
        <div className="flex flex-col">
         <div className="ml-2 flex flex-row items-center">
          <span className="font-bold">{dashboardConfig.title}</span>{" "}
          <span className="ml-1 flex items-center gap-1 rounded-sm bg-[#5c65f3] px-1 py-[0.12rem] text-xs text-white">
           <CheckIcon className={iconVariants({ variant: "small" })} /> <span className="-mb-px">BOT</span>
          </span>
          <span className="ml-2 text-sm text-neutral-400">Today at 4:20 PM</span>
         </div>
         <div
          className="ml-1 mt-2 rounded-sm bg-[#2b2d31] p-4 shadow-lg"
          style={{
           borderLeft: `4px solid ${globalConfig.defaultColor}`,
          }}
         >
          <div className="flex flex-row gap-8">
           <div>
            <span className="font-bold">🎉 New giveaway!</span>
            <span className="mt-1 block text-sm text-neutral-400">React with 🎉 to participate!</span>
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

    <div className="mx-auto mb-32 max-w-[1400px] md:px-8 lg:px-16">
     <div className="mx-auto my-16 flex flex-col gap-8 px-4 lg:flex-row lg:gap-16 lg:px-0">
      <div className="flex w-full flex-col justify-center gap-2 lg:w-2/5">
       <Header className={headerVariants({ variant: "h1", margin: "normal", effects: "gradient" })}>See what's happening in your server</Header>
       <p className="text-white/70">With Majo.exe you can see your server statistics in real-time. You can see the most active members, the most used channels and much more!</p>
      </div>
      <div className="w-full overflow-hidden rounded-xl border border-neutral-800 bg-background-secondary px-8 py-6 duration-200 hover:bg-neutral-800/50 lg:w-3/5">
       <Suspense fallback={<div className="h-56 w-full rounded-xl border border-neutral-800 bg-background-secondary" />}>
        <StatsChart
         title="Members"
         showDateRange={false}
         data={Array.from({ length: 7 }, (_, i) => ({
          date: new Date(Date.now() - i * 86400000).toISOString().split("T")[0] || "",
          Joins: Math.floor(pseudoRandom(i)),
          Leaves: Math.floor(pseudoRandom(i) / 3.33),
         }))}
         categories={["Joins", "Leaves"]}
         chartConfig={statisticsChartConfig}
        />
       </Suspense>
      </div>
     </div>

     <div className="mx-auto my-16 flex flex-col-reverse gap-8 px-4 lg:flex-row lg:gap-16 lg:px-0">
      <div className="w-full lg:w-3/5">
       {exampleLogs.map((log) => (
        <LogDisclosure item={log} key={log.id} preview={true} guildId="123" />
       ))}
      </div>
      <div className="flex w-full flex-col justify-center gap-2 lg:w-2/5">
       <Header className={headerVariants({ variant: "h1", margin: "normal", effects: "gradient" })}>Keep track of everything</Header>
       <p className="text-white/70">
        Majo.exe has a powerful logging system that will keep track of everything that happens in your server. You can easily see who did what and when!
       </p>
      </div>
     </div>

     <div className="mx-auto my-16 flex flex-col gap-8 px-4 lg:flex-row lg:gap-16 lg:px-0">
      <div className="flex w-full flex-col justify-center gap-2 lg:w-2/5">
       <Header className={headerVariants({ variant: "h1", margin: "normal", effects: "gradient" })}>Why so many unnecessary bots?</Header>
       <p className="text-white/70">
        Majo.exe with its many features can replace many bots on your server. You can have moderation, leveling, image manipulation and much more in one bot!
       </p>
      </div>
      <div className="relative w-full overflow-hidden rounded-xl border border-neutral-800 bg-background-secondary px-8 py-6 duration-200 lg:w-3/5">
       <Ripple className="opacity-30" />
       <BotReplacement />
      </div>
     </div>
    </div>
   </div>

   <div className="mx-auto mb-32 max-w-[1400px] md:px-8 lg:px-16">
    <div>
     <Header className={headerVariants({ variant: "medium", margin: "normal", alignment: "center", effects: "gradient" })}>Frequently asked questions</Header>

     <div className="mx-auto mt-9 w-full max-w-3xl rounded-xl">
      {faqItems.map((item, index) => (
       <Accordion type="single" collapsible key={`faq-${item.question}`}>
        <AccordionItem value={`item-${index + 1}`}>
         <AccordionTrigger>{item.question}</AccordionTrigger>
         <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
       </Accordion>
      ))}

      <div className="mt-6 text-center text-sm text-neutral-400">
       Have more questions?{" "}
       <Link href="/contact" className="underline">
        Contact us.
       </Link>
      </div>
     </div>
    </div>

    <div className="relative mx-auto mt-32 h-[600px] max-w-6xl overflow-hidden rounded-3xl border border-neutral-800 bg-transparent pb-10 shadow-2xl md:px-8 lg:px-16">
     <div className="flex flex-col items-center justify-center pt-20">
      <Header className={headerVariants({ variant: "medium", margin: "normal", alignment: "center" })}>What are you waiting for?</Header>
      <p className="mb-6 w-full text-center text-lg text-neutral-300">
       <Balancer>Don't wait ages to add Majo.exe to your server! Invite it now and see it in action!</Balancer>
      </p>

      <Link href="/api/invite" className={cn(buttonVariants({ variant: "primary" }), "mx-auto w-fit")}>
       <Icons.userAdd className={iconVariants({ variant: "button" })} />
       Add to your server
      </Link>
     </div>

     <div className="relative mt-16 flex w-full justify-center overflow-hidden lg:px-16">
      <Image
       src="/assets/images/dash.png"
       alt="Dashboard"
       width={1844}
       height={962}
       className="size-full rounded-md border border-neutral-800 object-cover object-top shadow-lg"
       loading="lazy"
      />
     </div>
     <BorderBeam colorFrom={globalConfig.defaultColor} colorTo={globalConfig.defaultColor} size={450} borderWidth={1.7} />
     <FlickeringGrid
      width={1400}
      height={800}
      squareSize={3}
      color={"#737373"}
      className="pointer-events-none absolute inset-0 -z-10 size-full bg-background-secondary opacity-70"
     />
     <div className="to-[hsla(202, 36%, 96%, 1)] absolute inset-0 -z-10 size-full bg-linear-to-b from-accent-primary/15" />
    </div>
   </div>
  </div>
 );
}
