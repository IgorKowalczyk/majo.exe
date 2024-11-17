import { dashboardConfig, globalConfig } from "@majoexe/config";
import prismaClient from "@majoexe/database";
import { formatNumber } from "@majoexe/util/functions/util";
import Link from "next/link";
import avatar01 from "public/assets/avatars/01.webp";
import avatar02 from "public/assets/avatars/02.webp";
import avatar03 from "public/assets/avatars/03.webp";
import avatar04 from "public/assets/avatars/04.webp";
import avatar05 from "public/assets/avatars/05.webp";
import avatar06 from "public/assets/avatars/06.webp";
import avatar07 from "public/assets/avatars/07.webp";
import ray from "public/assets/ray.png";
import tada from "public/assets/tada.svg";
import tadaAnimated from "public/assets/tada_animated.gif";
import { Suspense } from "react";
import Balancer from "react-wrap-balancer";
import { twMerge } from "tailwind-merge";
import { AddReaction } from "./_components/home/AddReaction";
import Faq from "./_components/home/Faq";
import { LevelUp } from "./_components/home/LevelUp";
import { ButtonPrimary, ButtonSecondary } from "@/components/Buttons";
// import GlobeClient from "@/components/client/Globe";
import { LogDisclosure } from "@/components/client/lists/Logs";
import { AnimatedList } from "@/components/client/shared/AnimatedList";
import AnimatedShinyText from "@/components/client/shared/AnimatedShinyText";
import AreaChart from "@/components/client/shared/AreaChart";
import Image from "@/components/client/shared/Image";
import { GradientHeader, Header1, Header2 } from "@/components/Headers";
import { Icons, iconVariants } from "@/components/Icons";
import { Typing } from "@/components/Loaders";
import { LoginButton } from "@/components/LoginButton";
// import TextRevealByWord from "@/components/client/shared/TextRevealByWord";

const exampleLogs = [
 {
  id: "0",
  type: "command_change",
  createdAt: new Date(new Date().getTime() - 2 * 16 * 60 * 15 * 1000).toISOString().toString(),
  content: "Disabled command /help",
  user: {
   id: "544164729354977282",
   global_name: "Robert",
   //avatar: "0",
   fullAvatar: avatar03,
   discriminator: "0",
  },
 },
 {
  id: "1",
  type: "vanity",
  createdAt: new Date(new Date().getTime() - 1 * 21 * 60 * 60 * 1000).toISOString().toString(),
  content: "Changed vanity URL to /majo",
  user: {
   id: "689210472345677282",
   global_name: "Jonas",
   //avatar: "0",
   fullAvatar: avatar01,
   discriminator: "0",
  },
 },
 {
  id: "2",
  type: "category_change",
  // date 3 days ago
  createdAt: new Date(new Date().getTime() - 2 * 23 * 60 * 60 * 1000).toISOString().toString(),
  content: "Enabled category Fun",
  user: {
   id: "989210472345677282",
   global_name: "Ethan",
   //avatar: "0",
   fullAvatar: avatar05,
   discriminator: "0",
  },
 },
];

function pseudoRandom(index) {
 const seed = index;
 const random1 = Math.sin(seed) * 10000;
 const baseValue1 = random1 - Math.floor(random1);
 const random2 = Math.cos(seed * 2) * 10000;
 const baseValue2 = random2 - Math.floor(random2);
 const growthFactor = Math.pow(index + 1, 1.5);
 const variationFactor = 26;

 const result = (baseValue1 + baseValue2) * (1 + variationFactor) + growthFactor;
 return result;
}

const generateRandomData = (length) => {
 const data = [];
 for (let i = 0; i < length; i++) {
  data.push({
   date: new Date(new Date().getTime() - i * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
   Joins: Math.floor(pseudoRandom(i)),
  });
 }
 return data;
};

const exampleStatsData = generateRandomData(30);

let notifications = [
 {
  author: "Amelia",
  avatar: avatar02,
  content: (
   <span>
    enabled <span className="font-bold text-accent-primary">AutoMod</span>
   </span>
  ),
 },
 {
  author: "Zoe",
  avatar: avatar07,
  content: (
   <span>
    banned <span className="font-bold text-accent-primary">John Doe</span>
   </span>
  ),
 },
 {
  author: "Michael",
  avatar: avatar04,
  content: (
   <span>
    warned <span className="font-bold text-accent-primary">Jane Smith</span>
   </span>
  ),
 },
 {
  author: "Leani" /* ;-; good old times */,
  avatar: avatar06,
  content: (
   <span>
    disabled <span className="font-bold text-accent-primary">/help</span> command
   </span>
  ),
 },
 {
  author: "Ethan",
  avatar: avatar05,
  content: (
   <span>
    set vanity to <span className="font-bold text-accent-primary">/majo</span>
   </span>
  ),
 },
 {
  author: "Oliver",
  avatar: avatar03,
  content: (
   <span>
    enabled category <span className="font-bold text-accent-primary">Moderation</span>
   </span>
  ),
 },
];

notifications = Array.from({ length: 10 }, () => notifications).flat();

export default async function HomePage() {
 const allCommands = await prismaClient.commands.findMany({
  select: {
   name: true,
   options: true,
  },
 });

 let commandsCount = 0;
 allCommands.map((command) => {
  command.options?.map((option) => {
   if (option.type === 1 || option.type === 2) commandsCount++;
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
     <Link href="/api/invite" className={twMerge("group rounded-full border border-white/5 bg-neutral-900 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-800")}>
      <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-400 hover:duration-300">
       <span>✨ Introducing Majo.exe</span>
       <Icons.arrowRight className={iconVariants({ variant: "normal", className: "-mr-1 ml-1 transition-transform ease-in-out group-hover:translate-x-0.5" })} />
      </AnimatedShinyText>
     </Link>

     <Header1 className="mb-0 justify-center bg-gradient-to-b from-white to-neutral-400 box-decoration-clone bg-clip-text text-center !font-black !leading-snug text-fill-transparent xl:!text-5xl 2xl:!text-7xl">The only one Discord Bot</Header1>
     <Header2 className="mb-0 max-w-[680px] text-center font-normal text-white/70">
      <Balancer>Majo.exe will not only keep your server entertained but also assist you with moderation and many other things!</Balancer>
     </Header2>
     <div className="mt-2 flex flex-col gap-4 sm:flex-row">
      <LoginButton />
      <ButtonSecondary href="/api/invite">
       <Icons.userAdd className={iconVariants({ variant: "button" })} />
       Add to your server
      </ButtonSecondary>
     </div>
    </div>
    <Image alt="Background" width={1000} height={1000} className="pointer-events-none absolute inset-x-0 -top-20 z-0 mx-auto hidden size-full select-none lg:block" src={ray} loading="eager" />
    <div className="absolute bottom-0 z-10 hidden min-h-[500px] w-full translate-y-1/2 flex-col items-center justify-center md:flex">
     {/* <GlobeClient /> */}
     <div className="absolute inset-0 -z-10 m-auto mt-[100px] size-[580px] rounded-full bg-[#ddd] opacity-5 blur-3xl" />
    </div>
   </div>
   <div className="relative z-[600] bg-background-primary">
    <hr className="m-[0_auto] mb-8 h-px w-full border-none bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.1)_50%,transparent)] px-8 duration-300 motion-reduce:transition-none" />

    <div className="mx-auto max-w-7xl pb-10 md:px-8 lg:px-16">
     <div className="mx-auto flex flex-col justify-around gap-4 md:flex-row">
      <div className="flex flex-col items-center justify-center gap-4">
       <GradientHeader>{formatNumber(jsonData.approximate_guild_count || 0)}+ servers</GradientHeader>
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
       <GradientHeader>{formatNumber(commandsCount)}+ commands</GradientHeader>
      </div>

      <div className="flex flex-col items-center justify-center gap-4">
       <GradientHeader>{formatNumber(100000)}+ users</GradientHeader>
      </div>
     </div>

     <p className="my-6 w-full text-center text-white/70">...and counting!</p>

     <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 md:grid md:grid-cols-2 md:px-0 lg:grid-cols-3">
      <div className="row-span-1 overflow-hidden rounded-xl border border-neutral-800 bg-background-secondary p-4 duration-200 hover:bg-neutral-800/50">
       <GradientHeader>Image manipulation? We got you!</GradientHeader>
       <p className="mt-2 max-w-[680px] text-white/70">Want to edit an image? Or maybe you want to make a meme?</p>
       <div className="mt-3">
        <div className="flex flex-row items-center gap-1">
         <div className="ml-5 h-3 w-7 rounded-tl-md border-l-2 border-t-2 border-button-secondary" />
         <Image src={dashboardConfig.logo} alt="User avatar" quality={95} width={20} height={20} className="size-5 min-h-5 min-w-5 self-baseline rounded-full" />
         <span className="text-xs">
          <span className="font-bold">Majonez.exe</span> used <span className="font-bold text-accent-primary">/ai</span>
         </span>
        </div>
        <div className="flex items-center gap-1">
         <Image src={dashboardConfig.logo} alt={`${dashboardConfig.title} avatar`} quality={95} width={40} height={40} className="size-10 min-h-10 min-w-10 self-baseline rounded-full" />
         <div className="flex flex-col">
          <div className="ml-2 flex h-10 flex-row items-center">
           <span className="font-bold">{dashboardConfig.title}</span>{" "}
           <span className="ml-1 flex items-center gap-1 rounded bg-[#5c65f3] px-1 py-[0.12rem] text-xs text-white">
            <Icons.check className={iconVariants({ variant: "small" })} /> <span className="-mb-px">BOT</span>
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
       <GradientHeader>Leveling?</GradientHeader>
       <p className="mt-2 max-w-[680px] text-white/70">Majo.exe has a leveling system that will keep your members active and entertained.</p>
       <LevelUp avatar={dashboardConfig.logo} username="Majonez.exe" />
      </div>
      <div className="relative col-span-2 row-span-2 overflow-hidden rounded-xl border border-neutral-800 bg-background-secondary px-8 py-6 duration-200 hover:bg-neutral-800/50 lg:col-span-1">
       <GradientHeader>Moderation? We have it!</GradientHeader>
       <div className="absolute inset-0 z-0 m-auto mt-[100px] size-[580px] rounded-full bg-[#ddd] opacity-5 blur-3xl" />
       <div className="relative z-10">
        <p className="mt-2 max-w-[680px] text-white/70">
         <Balancer>Someone's breaking the rules? You can easily enable Auto-Moderation and Majo.exe will take care of the rest!</Balancer>
        </p>
        <div className="mt-3 h-48 overflow-hidden">
         <AnimatedList>
          {notifications.map((item, index) => (
           <figure
            key={`notification-${item.content}-${index}-${item.author}
           `}
            className="relative mx-auto min-h-fit w-full max-w-[400px] transform-gpu overflow-hidden transition-all duration-200 ease-in-out"
           >
            <div className="mt-1 flex flex-row items-center gap-1">
             <Image src={item.avatar} alt={`${item.author} avatar`} quality={95} width={20} height={20} className="size-5 self-baseline rounded-full" />
             <span className="ml-2 text-sm">
              <span className="font-bold">{item.author}</span> {item.content}
             </span>
            </div>
           </figure>
          ))}
         </AnimatedList>
        </div>
       </div>
      </div>
      <div className="relative col-span-2 row-span-2 overflow-hidden rounded-xl border border-neutral-800 bg-background-secondary duration-200 hover:bg-neutral-800/50">
       <div className="relative z-50 h-full">
        <div className="px-8 py-6">
         <Header1 className="mb-0 bg-gradient-to-b from-white to-neutral-400 box-decoration-clone bg-clip-text !text-left !font-black text-fill-transparent">Know more about your server</Header1>
         <p className="max-w-[680px] text-white/70">
          <Balancer>With Majo.exe you can get to know your server better with the help of the dashboard. You can see the most active members, the most used channels and activity graphs!</Balancer>
         </p>
        </div>

        <div className="z-50 flex flex-col items-center justify-center gap-4 px-8 py-6 md:flex-row">
         <p className="flex cursor-pointer gap-1 rounded-full border border-accent-primary/50 bg-accent-primary/20 px-2 py-1 text-sm font-bold text-accent-primary backdrop-blur-md duration-200 hover:bg-accent-primary/30">
          +{Math.floor(Math.random() * 10 + 15)} users today
          <Icons.trendingUp className={iconVariants({ variant: "normal" })} />
         </p>

         <p className="flex cursor-pointer gap-1 rounded-full border border-accent-primary/50 bg-accent-primary/20 px-2 py-1 text-sm font-bold text-accent-primary backdrop-blur-md duration-200 hover:bg-accent-primary/30">
          +{Math.floor(Math.random() * 500 + 100)} messages today
          <Icons.trendingUp className={iconVariants({ variant: "normal" })} />
         </p>

         <p className="flex cursor-pointer gap-1 rounded-full border border-accent-primary/50 bg-accent-primary/20 px-2 py-1 text-sm font-bold text-accent-primary backdrop-blur-md duration-200 hover:bg-accent-primary/30">
          +{Math.floor(Math.random() * 80 + 5)}% increase in activity
          <Icons.trendingUp className={iconVariants({ variant: "normal" })} />
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
       <GradientHeader>Giveaways? Why not?</GradientHeader>
       <p className="mt-2 max-w-[680px] text-white/70">Want to host a giveaway or a drop? Majo.exe can help you with that! You can easily create and moderate giveaways with few simple commands!</p>
       <div className="my-6 flex items-center gap-1">
        <Image src={dashboardConfig.logo} alt={`${dashboardConfig.title} avatar`} quality={95} width={40} height={40} className="size-10 min-h-10 min-w-10 self-baseline rounded-full" />
        <div className="flex flex-col">
         <div className="ml-2 flex flex-row items-center">
          <span className="font-bold">{dashboardConfig.title}</span>{" "}
          <span className="ml-1 flex items-center gap-1 rounded bg-[#5c65f3] px-1 py-[0.12rem] text-xs text-white">
           <Icons.check className={iconVariants({ variant: "small" })} /> <span className="-mb-px">BOT</span>
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

           <Image src={tadaAnimated} alt="Giveaway emoji" quality={95} width={64} height={64} className="size-16 min-h-16 min-w-16" />
          </div>
         </div>
         <AddReaction reaction={tada} />
        </div>
       </div>
      </div>
     </div>
    </div>

    <div className="mx-auto mt-12 pb-10 md:px-8 lg:px-16">
     <GradientHeader className="!block !text-center !text-3xl md:!text-4xl">
      Trusted by more than <span className="bg-gradient-to-b from-accent-primary to-accent-primary box-decoration-clone bg-clip-text text-fill-transparent">{formatNumber(jsonData.approximate_guild_count || 0)}+</span> servers
     </GradientHeader>
     <p className="mb-6 mt-3 w-full text-center text-white/70">
      <Balancer>
       Majo.exe is trusted by more than {formatNumber(jsonData.approximate_guild_count || 0)} servers and {formatNumber(100000)} users! Join them and see what Majo.exe can do for you!
      </Balancer>
     </p>

     <ButtonSecondary href="/api/invite" className="mx-auto w-fit">
      <Icons.userAdd className={iconVariants({ variant: "button" })} />
      Add to your server
     </ButtonSecondary>

     <Icons.arrowDown className="mx-auto mt-12 size-8 animate-bounce text-accent-primary" />

     <div className="mx-auto my-16 flex max-w-7xl flex-col gap-8 px-4 lg:flex-row lg:gap-16 lg:px-0">
      <div className="flex w-full flex-col justify-center gap-2 lg:w-2/5">
       <Header1>See what's happening in your server</Header1>
       <p className="text-white/70">With Majo.exe you can see your server statistics in real-time. You can see the most active members, the most used channels and much more!</p>
      </div>
      <div className="w-full overflow-hidden rounded-xl border border-neutral-800 bg-background-secondary py-6 pl-4 pr-8 duration-200 hover:bg-neutral-800/50 lg:w-3/5">
       <Suspense fallback={<div className="h-56 w-full rounded-xl border border-neutral-800 bg-background-secondary" />}>
        <AreaChart className="h-56" data={exampleStatsData} index="date" categories={["Joins"]} yAxisWidth={50} showYAxis={true} showXAxis={false} />
       </Suspense>
      </div>
     </div>

     <div className="mx-auto my-16 flex max-w-7xl flex-col-reverse gap-6 px-4 lg:flex-row lg:gap-16 lg:px-0">
      <div className="w-full lg:w-3/5">
       {exampleLogs.map((log) => (
        <LogDisclosure item={log} key={log.id} preview={true} />
       ))}
      </div>
      <div className="flex w-full flex-col justify-center gap-2 lg:w-2/5">
       <Header1>Keep track of everything</Header1>
       <p className="text-white/70">Majo.exe has a powerful logging system that will keep track of everything that happens in your server. You can easily see who did what and when!</p>
      </div>
     </div>
    </div>
   </div>
   <div className="mx-auto pb-10 md:px-8 lg:px-16">
    <GradientHeader className="!block !text-center !text-3xl md:!text-4xl">Frequently asked questions</GradientHeader>
    <Faq />
   </div>

   <div className="mx-auto mt-12 pb-10 md:px-8 lg:px-16">
    <GradientHeader className="!block !text-center !text-3xl md:!text-4xl">What are you waiting for?</GradientHeader>
    <p className="mb-6 mt-3 w-full text-center text-white/70">
     <Balancer>Don't wait ages to add Majo.exe to your server! Invite it now and see it in action!</Balancer>
    </p>

    <ButtonPrimary href="/api/invite" className="mx-auto w-fit">
     <Icons.userAdd className={iconVariants({ variant: "button" })} />
     Add to your server
    </ButtonPrimary>
   </div>
   {/* <Icons.arrowDown className="text-accent-primary mx-auto mt-12 size-8 animate-bounce" />

   <div className="z-10 flex min-h-[16rem] items-center justify-center">
    <TextRevealByWord text={`I don't know what to write here. TODO: Add more content`} className="w-full" />
   </div> */}
  </>
 );
}
