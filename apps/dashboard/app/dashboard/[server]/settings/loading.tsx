import { Block } from "@/components/ui/Block";
import { Button } from "@/components/ui/Buttons";
import Header, { headerVariants } from "@/components/ui/Headers";
import { Icons, iconVariants } from "@/components/ui/Icons";
import { Skeleton } from "@/components/ui/Skeletons";
import { cn } from "@/lib/utils";

export default function Loading() {
 return (
  <>
   <Header className={cn(headerVariants({ variant: "h1", margin: "normal" }))}>
    <Icons.Settings className={iconVariants({ variant: "extraLarge" })} />
    Settings
   </Header>
   <p className="mb-4 text-left text-base md:text-lg">Configure the settings of the bot in your server.</p>
   <Block className="mt-4">
    <Header className={cn(headerVariants({ variant: "h2" }))}>
     <Icons.paintBrush className={iconVariants({ variant: "large", className: "stroke-2!" })} />
     Default Embed Color
    </Header>
    <p className="mb-4 text-left">Change the color of the embeds sent by the bot. This will not affect embeds sent by other bots.</p>
    <Skeleton className="mt-10 h-60" />
   </Block>
   <Block className="mt-4">
    <Header className={cn(headerVariants({ variant: "h2" }))}>
     <Icons.ShieldCheck className={iconVariants({ variant: "large", className: "stroke-2!" })} />
     Dashboard Access
    </Header>
    <p className="mb-4 text-left">
     Everyone with the roles that have the <code>MANAGE_GUILD</code> or <code>ADMINISTRATOR</code> permission can access the dashboard.
    </p>

    <div className="flex flex-wrap items-center justify-start gap-2">
     {Array.from({ length: 8 }).map((_, i) => (
      <Skeleton
       key={`role-${i}`}
       className="h-[42px] min-w-[150px]"
       style={{
        width: `${Math.floor(Math.random() * (150 - 64 + 1) + 64)}px !important`,
       }}
      />
     ))}
    </div>
   </Block>
   <Block className="mt-4">
    <Header className={cn(headerVariants({ variant: "h2" }))}>
     <Icons.Users className={iconVariants({ variant: "large", className: "stroke-2!" })} />
     Public Dashboard
    </Header>
    <p className="mb-4 text-left">
     Everyone with the link can view public dashboard overview. This is useful for communities that want to show off their server. <span className="font-bold">The dashboard overview do not include any sensitive information.</span>
    </p>

    <div className="mb-4 grid grid-cols-1 gap-3 lg:grid-cols-2">
     <Block className="flex flex-col items-start justify-start gap-2">
      <Header className={cn(headerVariants({ variant: "h3" }))}>
       <Icons.Check className={iconVariants({ variant: "large", className: "stroke-green-500" })} />
       Things that are shown:
      </Header>
      <ul className="list-inside list-disc">
       <li>Server name and description</li>
       <li>Server member count</li>
       <li>Leaderboard</li>
       <li>Server emojis and stickers</li>
      </ul>
     </Block>
     <Block className="flex flex-col items-start justify-start gap-2">
      <Header className={cn(headerVariants({ variant: "h3" }))}>
       <Icons.close className={iconVariants({ variant: "large", className: "stroke-red-400" })} />
       Things that are not shown:
      </Header>
      <ul className="list-inside list-disc">
       <li>Server statistics</li>
       <li>Server settings</li>
       <li>Server moderation</li>
       <li>Server logs</li>
      </ul>
     </Block>
    </div>

    <Skeleton className="h-10 max-w-none!" />
    <Skeleton className="mt-4 h-10 max-w-none!" />

    <div className="mt-4 flex flex-row items-start whitespace-nowrap rounded-lg border border-accent-primary bg-accent-primary/10 p-4">
     <span className="mr-1 flex flex-row items-center whitespace-nowrap font-bold">
      <Icons.Info className={iconVariants({ variant: "normal", className: "stroke-accent-primary mr-1" })} />
      Note:
     </span>
     <span className="whitespace-normal">The public dashboard will be visible to everyone with the link!</span>
    </div>
   </Block>
   <Block className="mt-4">
    <Header className={cn(headerVariants({ variant: "h2" }))}>
     <Icons.Download className={iconVariants({ variant: "large", className: "stroke-2!" })} />
     Download data
    </Header>
    <p className="mt-2 leading-none text-white/70">
     Download all server data in a <code>.json</code> file. This includes logs, settings, moderation and more.
    </p>
    <Button variant="primary" className="mt-4 w-fit" disabled={true}>
     <Icons.Download className={iconVariants({ variant: "button" })} />
     Download data
    </Button>
   </Block>
   <Block theme="danger" className="mt-4">
    <Header className={cn(headerVariants({ variant: "h2" }))}>
     <Icons.warning className={iconVariants({ variant: "large", className: "stroke-red-400 stroke-2" })} />
     Delete server data
    </Header>
    <p className="mt-2 text-white/70">If you want to delete all data related to this server, you can do so by clicking the button below. This action is irreversible.</p>
    <Button variant="red" className="mt-4" disabled={true}>
     <Icons.Trash className={iconVariants({ variant: "button" })} /> Delete server data
    </Button>
   </Block>
  </>
 );
}
