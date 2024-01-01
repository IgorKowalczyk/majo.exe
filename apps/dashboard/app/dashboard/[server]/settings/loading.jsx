import { Block } from "@/components/Block";
import { ButtonPrimary } from "@/components/Buttons";
import { RedButton } from "@/components/Buttons";
import { Header1, Header2, Header3 } from "@/components/Headers";
import { Icons, iconVariants } from "@/components/Icons";
import { GraphSkeleton, InputSkeleton, TextSkeleton } from "@/components/Skeletons";

export default async function Loading() {
 return (
  <>
   <Header1>
    <Icons.settings className={iconVariants({ variant: "extraLarge" })} />
    Settings
   </Header1>
   <Block className="mt-4">
    <Header2>
     <Icons.paintBrush className={iconVariants({ variant: "large", className: "!stroke-2" })} />
     Default Embed Color
    </Header2>
    <p className="mb-4 text-left">Change the color of the embeds sent by the bot. This will not affect embeds sent by other bots.</p>
    <GraphSkeleton className="mt-10 h-60" />
   </Block>

   <Block className="mt-4">
    <Header2>
     <Icons.shieldCheck className={iconVariants({ variant: "large", className: "!stroke-2" })} />
     Dashboard Access
    </Header2>
    <p className="mb-4 text-left">
     Everyone with the roles that have the <code>MANAGE_GUILD</code> or <code>ADMINISTRATOR</code> permission can access the dashboard.
    </p>

    <div className="flex flex-wrap items-center justify-start gap-2">
     {Array.from({ length: 8 }).map((_, i) => (
      <TextSkeleton
       key={i}
       className="!h-[42px] min-w-[150px]"
       style={{
        width: `${Math.floor(Math.random() * (150 - 64 + 1) + 64)}px !important`,
       }}
      />
     ))}
    </div>
   </Block>
   <Block className="mt-4">
    <Header2>
     <Icons.users className={iconVariants({ variant: "large", className: "!stroke-2" })} />
     Public Dashboard
    </Header2>
    <p className="mb-4 text-left">
     Everyone with the link can view public dashboard overview. This is useful for communities that want to show off their server. <span className="font-bold">The dashboard overview do not include any sensitive information.</span>
    </p>

    <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
     <Block className="flex flex-col items-start justify-start gap-2">
      <Header3>
       <Icons.check className={iconVariants({ variant: "large", className: "rounded-md border border-green-400 stroke-green-400 p-1" })} />
       Things that are shown:
      </Header3>
      <ul className="list-inside list-disc">
       <li>Server name and description</li>
       <li>Server member count</li>
       <li>Leaderboard</li>
       <li>Server emojis and stickers</li>
      </ul>
     </Block>
     <Block className="flex flex-col items-start justify-start gap-2">
      <Header3>
       <Icons.close className={iconVariants({ variant: "large", className: "rounded-md border border-red-400 stroke-red-400 p-1" })} />
       Things that are not shown:
      </Header3>
      <ul className="list-inside list-disc">
       <li>Server statistics</li>
       <li>Server settings</li>
       <li>Server moderation</li>
       <li>Server logs</li>
      </ul>
     </Block>
    </div>

    <InputSkeleton className="!max-w-none" />
    <InputSkeleton className="mt-4 !max-w-none" />

    <div className="border-accent-primary bg-accent-primary/10 mt-4 flex flex-row items-start whitespace-nowrap rounded-md border p-4">
     <span className="mr-1 flex flex-row items-center whitespace-nowrap font-bold">
      <Icons.info className={iconVariants({ variant: "normal", className: "stroke-accent-primary mr-1" })} />
      Note:
     </span>
     <span className="whitespace-normal">The public dashboard will be visible to everyone with the link!</span>
    </div>
   </Block>
   <Block className="mt-4">
    <Header2>
     <Icons.download className={iconVariants({ variant: "large", className: "!stroke-2" })} />
     Download data
    </Header2>
    <p className="mt-2 leading-none text-white/70">
     Download all server data in a <code>.json</code> file. This includes logs, settings, moderation and more.
    </p>
    <ButtonPrimary className="mt-4 w-fit" disabled={true}>
     <Icons.download className={iconVariants({ variant: "button" })} />
     Download data
    </ButtonPrimary>
   </Block>
   <Block theme="danger" className="mt-4">
    <Header2 className="text-red-400">
     <Icons.warning className={iconVariants({ variant: "large", className: "stroke-red-400 stroke-2" })} />
     Delete server data
    </Header2>
    <p className="mt-2 text-white/70">If you want to delete all data related to this server, you can do so by clicking the button below. This action is irreversible.</p>
    <RedButton className="mt-4" disabled={true}>
     <Icons.trash className={iconVariants({ variant: "button" })} /> Delete server data
    </RedButton>
   </Block>
  </>
 );
}
