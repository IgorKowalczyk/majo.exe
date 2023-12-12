import { ArrowRightIcon, ArrowTrendingUpIcon, CheckIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import { dashboardConfig, globalConfig } from "@majoexe/config";
import prismaClient from "@majoexe/database";
import { formatNumber } from "@majoexe/util/functions/util";
import Link from "next/link";
import avatar01 from "public/assets/avatars/01.webp";
import ray from "public/assets/ray.png";
import tada from "public/assets/tada.svg";
import Balancer from "react-wrap-balancer";
import { ButtonSecondary } from "@/components/Buttons";
import GlobeClient from "@/components/client/Globe";
import { AddReaction, HomepageLevelUp } from "@/components/client/Interactions";
import Image from "@/components/client/shared/Image";
import { GradientHeader, Header1 } from "@/components/Headers";
import { Typing } from "@/components/Loaders";
import { LoginButton } from "@/components/LoginButton";

export default async function Main() {
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
  });
  commandsCount++;
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
   <div className="before:md:bg-grid-[#fff] relative z-20 flex min-h-screen w-full items-center justify-center before:absolute before:z-10 before:h-full before:w-full before:opacity-5 before:grayscale">
    <div className="absolute left-0 top-0 z-10 h-full w-full bg-[radial-gradient(circle,rgba(2,0,36,0)0,rgb(16,17,16,100%))]" />
    <div className="relative z-20 -mt-8 flex w-full select-none flex-col items-center justify-center gap-4 px-3 md:w-[90%]">
     <Link href={"/api/invite"} className="before:w-wit min-h-8 before:min-h-8 group relative -mt-4 flex h-8 cursor-pointer items-center justify-center rounded-full bg-gradient-to-tr from-neutral-700/80 via-neutral-700/80 to-[#111012]/80 p-px text-center text-lg font-normal text-neutral-300 duration-200 before:absolute before:inset-0 before:h-8 before:rounded-full before:bg-gradient-to-tr before:from-neutral-700 before:via-neutral-500 before:to-[#111012] before:opacity-0 before:duration-200 hover:before:opacity-100">
      <span className="from-black-10/50 relative mt-px flex h-full w-full items-center rounded-full bg-gradient-to-tr to-[#111012] px-6">
       Introducing Majo.exe
       <ArrowRightIcon className="min-h-4 min-w-4 ml-2 inline-block h-4 w-4 transition-all duration-200 group-hover:translate-x-1" />
      </span>
     </Link>
     <Header1 className={"text-fill-transparent mb-0 justify-center bg-gradient-to-b	from-white to-neutral-400 box-decoration-clone bg-clip-text text-center !font-black !leading-snug xl:!text-5xl 2xl:!text-7xl"}>The only one Discord Bot</Header1>
     <h2 className="max-w-[680px] text-center text-2xl text-white/70">
      <Balancer>Majo.exe will not only keep your server entertained but also assist you with moderation and many other things!</Balancer>
     </h2>
     <div className="mt-2 flex flex-col gap-4 sm:flex-row">
      <LoginButton />
      <ButtonSecondary href="/api/invite">
       <UserPlusIcon className="min-h-5 min-w-5 mr-2 h-5 w-5" aria-hidden="true" role="img" />
       Add to your server
      </ButtonSecondary>
     </div>
    </div>
    <Image alt="Background" width={1000} height={1000} className="pointer-events-none absolute -top-20 left-0 right-0 z-0 mx-auto hidden h-full w-full select-none lg:block" src={ray} loading={"eager"} />
    <div className="absolute bottom-0 z-10 hidden min-h-[500px] w-full translate-y-1/2 flex-col items-center justify-center md:flex">
     <GlobeClient />
     <div className="absolute inset-0 z-[-10] m-auto mt-[100px] h-[580px] w-[580px] rounded-full bg-[#ddd] opacity-5 blur-3xl" />
    </div>
   </div>
   <div className="bg-background-primary relative z-[600]">
    <hr className="m-[0_auto] mb-8 h-px w-full border-none bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.1)_50%,transparent)] px-8 duration-300 motion-reduce:transition-none" />

    <div className="mx-auto pb-10 md:px-8 lg:px-16 xl:w-4/5">
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

     <div className="mx-auto flex w-full flex-col gap-4 px-4 md:grid md:grid-cols-2 lg:grid-cols-3">
      <div className={"bg-background-secondary row-span-1 overflow-hidden rounded-xl border border-neutral-800 p-4 duration-200 hover:bg-neutral-800/50"}>
       <GradientHeader>Image manipulation? We got you!</GradientHeader>
       <p className="mt-2 max-w-[680px] text-white/70">Want to edit an image? Or maybe you want to make a meme?</p>
       <div className="mt-3">
        <div className="flex flex-row items-center gap-1">
         <div className="ml-5 h-3 w-7 rounded-tl-md border-l-2 border-t-2 border-[#4e5058]" />
         <Image src={dashboardConfig.logo} alt="User avatar" quality={95} width={16} height={16} className="min-h-5 min-w-5 h-5 w-5 self-baseline rounded-full" />
         <span className="text-xs">
          <span className="font-bold">Majonez.exe</span> used <span className="text-accent-primary font-bold">/ai</span>
         </span>
        </div>
        <div className="flex items-center gap-1">
         <Image src={dashboardConfig.logo} alt={`${dashboardConfig.title} avatar`} quality={95} width={64} height={64} className="min-h-10 min-w-10 h-10 w-10 self-baseline rounded-full" />
         <div className="flex flex-col">
          <div className="ml-2 flex h-10 flex-row items-center">
           <span className="font-bold">{dashboardConfig.title}</span>{" "}
           <span className="ml-1 flex items-center gap-1 rounded bg-[#5c65f3] px-1 py-[0.12rem] text-xs text-white">
            <CheckIcon className="min-h-4 min-w-4 h-4 w-4 stroke-2" aria-hidden="true" role="img" /> <span className="-mb-px">BOT</span>
           </span>
           <span className="ml-2 text-sm text-gray-400">Today at 4:20 PM</span>
          </div>
          <span className="ml-2 flex items-center gap-2 text-gray-400">
           Generating image
           <Link href={"/assets/avatars/cheese.jpeg"} target="_blank" rel="noopener noreferrer">
            <Typing />
           </Link>
          </span>
         </div>
        </div>
       </div>
      </div>
      <div className={"bg-background-secondary row-span-1 overflow-hidden rounded-xl border border-neutral-800 p-4 duration-200 hover:bg-neutral-800/50"}>
       <GradientHeader>Leveling?</GradientHeader>
       <p className="mt-2 max-w-[680px] text-white/70">Majo.exe has a leveling system that will keep your members active and entertained.</p>
       <HomepageLevelUp logo={dashboardConfig.logo} />
      </div>
      <div className={"bg-background-secondary relative col-span-2 row-span-2 overflow-hidden rounded-xl border border-neutral-800 px-8 py-6 duration-200 hover:bg-neutral-800/50 lg:col-span-1"}>
       <GradientHeader>Moderation? We have it!</GradientHeader>
       <div className="absolute inset-0 z-0 m-auto mt-[100px] h-[580px] w-[580px] rounded-full bg-[#ddd] opacity-5 blur-3xl" />
       <div className="relative z-10">
        <p className="mt-2 max-w-[680px] text-white/70">
         <Balancer>Someone's breaking the rules? You can easily enable Auto-Moderation and Majo.exe will take care of the rest!</Balancer>
        </p>
        <div className="mt-3 flex flex-row items-center gap-1">
         <Image src={dashboardConfig.logo} alt="User avatar" quality={95} width={64} height={64} className="min-h-10 min-w-10 h-10 w-10 self-baseline rounded-full" />
         <span className="ml-2">
          <span className="font-bold">Majonez.exe</span> banned <span className="text-accent-primary font-bold">John Doe</span> 🔨
         </span>
        </div>
        <div className="mt-3 flex flex-row items-center gap-1">
         <Image src={avatar01} alt="User avatar" quality={95} width={64} height={64} className="min-h-10 min-w-10 h-10 w-10 self-baseline rounded-full" />
         <span className="ml-2">
          <span className="font-bold">Jonas</span> enabled <span className="text-accent-primary font-bold">Auto-Moderation</span> ⚙️
         </span>
        </div>

        <div className="mt-3 flex flex-row items-center gap-1">
         <div className="min-h-10 min-w-10 bg-button-secondary h-10 w-10 self-baseline rounded-full" />
         <span className="ml-2 flex items-center gap-2 text-gray-400">
          Listening for other events <Typing />
         </span>
        </div>
       </div>
      </div>
      <div className={"bg-background-secondary relative col-span-2 row-span-2 overflow-hidden rounded-xl border border-neutral-800 duration-200 hover:bg-neutral-800/50"}>
       <div className="relative z-50 h-full">
        <div className="px-8 py-6">
         <Header1 className={"text-fill-transparent mb-0 bg-gradient-to-b from-white	to-neutral-400 box-decoration-clone bg-clip-text !text-left !font-black"}>Know more about your server</Header1>
         <p className="max-w-[680px] text-white/70">
          <Balancer>With Majo.exe you can get to know your server better with the help of the dashboard. You can see the most active members, the most used channels and activity graphs!</Balancer>
         </p>
        </div>

        <div className="z-50 flex flex-col items-center justify-center gap-4 px-8 py-6 md:flex-row">
         <p className="text-accent-primary border-accent-primary/50 bg-accent-primary/20 hover:bg-accent-primary/30 flex cursor-pointer gap-1 rounded-full border px-2 py-1 text-sm font-bold backdrop-blur-md duration-200">
          +{Math.floor(Math.random() * 10 + 15)} users today
          <ArrowTrendingUpIcon className="min-h-5 min-w-5 h-5 w-5 stroke-2" />
         </p>

         <p className="text-accent-primary border-accent-primary/50 bg-accent-primary/20 hover:bg-accent-primary/30 flex cursor-pointer gap-1 rounded-full border px-2 py-1 text-sm font-bold backdrop-blur-md duration-200">
          +{Math.floor(Math.random() * 500 + 100)} messages today
          <ArrowTrendingUpIcon className="min-h-5 min-w-5 h-5 w-5 stroke-2" />
         </p>

         <p className="text-accent-primary border-accent-primary/50 bg-accent-primary/20 hover:bg-accent-primary/30 flex cursor-pointer gap-1 rounded-full border px-2 py-1 text-sm font-bold backdrop-blur-md duration-200">
          +{Math.floor(Math.random() * 80 + 5)}% increase in activity
          <ArrowTrendingUpIcon className="min-h-5 min-w-5 h-5 w-5 stroke-2" />
         </p>
        </div>
       </div>
       <svg viewBox="0 0 512 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 left-0 right-0">
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

       <div className="absolute inset-0 z-10 m-auto mt-[100px] h-[980px] w-[980px] rounded-full bg-[#ddd] opacity-5 blur-3xl" />
      </div>
      <div className={"bg-background-secondary relative col-span-2 row-span-1 overflow-hidden rounded-xl border border-neutral-800 px-8 py-6 duration-200 hover:bg-neutral-800/50 lg:col-span-1"}>
       <GradientHeader>Giveaways? Why not?</GradientHeader>
       <p className="mt-2 max-w-[680px] text-white/70">Want to host a giveaway or a drop? Majo.exe can help you with that! You can easily create and moderate giveaways with few simple commands!</p>
       <div className="my-6 flex items-center gap-1">
        <Image src={dashboardConfig.logo} alt={`${dashboardConfig.title} avatar`} quality={95} width={64} height={64} className="min-h-10 min-w-10 h-10 w-10 self-baseline rounded-full" />
        <div className="flex flex-col">
         <div className="ml-2 flex flex-row items-center">
          <span className="font-bold">{dashboardConfig.title}</span>{" "}
          <span className="ml-1 flex items-center gap-1 rounded bg-[#5c65f3] px-1 py-[0.12rem] text-xs text-white">
           <CheckIcon className="min-h-4 min-w-4 h-4 w-4 stroke-2" aria-hidden="true" role="img" /> <span className="-mb-px">BOT</span>
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

           <Image src={tada} alt={"Giveaway emoji"} quality={95} width={64} height={64} className="min-h-16 min-w-16 h-16 w-16" />
          </div>
         </div>
         <AddReaction reaction={tada} />
        </div>
       </div>
      </div>
     </div>
    </div>
   </div>
  </>
 );
}
