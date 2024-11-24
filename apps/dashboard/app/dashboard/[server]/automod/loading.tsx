import { Block } from "@/components/Block";
import { Button } from "@/components/Buttons";
import Header, { Header3, headerVariants } from "@/components/Headers";
import { Icons, iconVariants } from "@/components/Icons";
import { NavBadge } from "@/components/nav/client/SideNav";
import { Skeleton } from "@/components/Skeletons";
import { cn } from "@/lib/utils";

export default function Loading() {
 return (
  <>
   <Header className={cn(headerVariants({ variant: "h1", margin: "normal" }))}>
    <Icons.Bot className={iconVariants({ variant: "extraLarge" })} />
    Automod
   </Header>
   <p className="mb-4 text-left text-base md:text-lg">Automatically moderate your server, block bad words, links and other things.</p>
   <Block className="mb-4">
    <Header className={cn(headerVariants({ variant: "h2" }))}>
     <Icons.userBlock className={iconVariants({ variant: "large", className: "!stroke-2" })} />
     Anti-Invite <Icons.refresh className={iconVariants({ variant: "large", className: "stroke-accent-primary animate-spin" })} />
    </Header>
    <p className="mb-4 text-left">
     <span>Automatically delete all messages containing Discord server invites.</span>
    </p>

    <div>
     <Block className="mb-4 !py-3">
      <Header3>
       <Icons.hide className={iconVariants({ variant: "large" })} /> Exempt:
      </Header3>
      <span className="mb-4 font-normal">What should be ignored by the rule?</span>

      <div className="flex flex-row flex-wrap gap-2">
       <span className="flex w-fit items-center gap-2 font-bold">
        <Icons.Users className={iconVariants({ variant: "normal", className: "stroke-accent-primary" })} />
        Ignore Roles:
       </span>
       <Skeleton className="h-[37.6px] w-40" />
      </div>

      <div className="mt-2 flex flex-row flex-wrap gap-2">
       <span className="flex w-fit items-center gap-2 font-bold">
        <Icons.Hash className={iconVariants({ variant: "normal", className: "stroke-accent-primary" })} />
        Ignore Channels:
       </span>
       <Skeleton className="h-[37.6px] w-40" />
      </div>

      <p className="mt-2 gap-2 text-sm text-white/70">
       <span className="font-bold">Pssst!</span> Members with Admin or Manage Server permissions are always excluded from automod.
      </p>
     </Block>

     <Block className="mb-4 !py-3">
      <Header3>
       <Icons.ShieldMinus className={iconVariants({ variant: "large" })} /> Actions:
      </Header3>
      <span className="mb-4 font-normal">What should I do when a member triggers the rule?</span>

      <div className="my-2 flex flex-row flex-wrap gap-2">
       <span className="flex w-fit items-center gap-2 font-bold">
        <Icons.Trash className={iconVariants({ variant: "normal", className: "stroke-red-400" })} />
        Delete message:
       </span>
       <Skeleton className="h-[30px] w-12" />
      </div>

      <div className="my-2 flex flex-row flex-wrap gap-2">
       <span className="flex w-fit items-center gap-2 font-bold">
        <Icons.Timer className={iconVariants({ variant: "normal", className: "stroke-red-400" })} />
        Timeout member:
       </span>
       <Skeleton className="h-[37.6px] w-40" />
      </div>

      <div className="my-2 flex flex-row flex-wrap gap-2">
       <span className="flex w-fit items-center gap-2 font-bold">
        <Icons.messageWarning className={iconVariants({ variant: "normal", className: "stroke-red-400" })} />
        Log to channel:
       </span>
       <Skeleton className="h-[37.6px] w-40" />
      </div>
     </Block>

     <Button variant="primary" className="mt-4" disabled={true}>
      <Icons.Check className={iconVariants({ variant: "button" })} />
      Save
     </Button>
    </div>
   </Block>

   <Block className="mb-4">
    <Header className={cn(headerVariants({ variant: "h2" }))}>
     <Icons.unlink className={iconVariants({ variant: "large", className: "!stroke-2" })} />
     Anti-Link <Icons.refresh className={iconVariants({ variant: "large", className: "stroke-accent-primary animate-spin" })} />
    </Header>
    <p className="mb-4 text-left">
     <span>Automatically delete all messages containing links.</span>
    </p>

    <div>
     <Block className="mb-4 !py-3">
      <Header3>
       <Icons.hide className={iconVariants({ variant: "large" })} /> Exempt:
      </Header3>
      <span className="mb-4 font-normal">What should be ignored by the rule?</span>
      <div className="flex flex-row flex-wrap gap-2">
       <span className="flex w-fit items-center gap-2 font-bold">
        <Icons.Users className={iconVariants({ variant: "normal", className: "stroke-accent-primary" })} />
        Ignore Roles:
       </span>
       <Skeleton className="h-[37.6px] w-40" />
      </div>

      <div className="mt-2 flex flex-row flex-wrap gap-2">
       <span className="flex w-fit items-center gap-2 font-bold">
        <Icons.Hash className={iconVariants({ variant: "normal", className: "stroke-accent-primary" })} />
        Ignore Channels:
       </span>
       <Skeleton className="h-[37.6px] w-40" />
      </div>

      <p className="mt-2 gap-2 text-sm text-white/70">
       <span className="font-bold">Pssst!</span> Members with Admin or Manage Server permissions are always excluded from automod.
      </p>
     </Block>

     <Block className="mb-4 !py-3">
      <Header3>
       <Icons.ShieldMinus className={iconVariants({ variant: "large" })} /> Actions:
      </Header3>
      <span className="mb-4 font-normal">What should I do when a member triggers the rule?</span>

      <div className="my-2 flex flex-row flex-wrap gap-2">
       <span className="flex w-fit items-center gap-2 font-bold">
        <Icons.Trash className={iconVariants({ variant: "normal", className: "stroke-red-400" })} />
        Delete message:
       </span>
       <Skeleton className="h-[30px] w-12" />
      </div>

      <div className="my-2 flex flex-row flex-wrap gap-2">
       <span className="flex w-fit items-center gap-2 font-bold">
        <Icons.Timer className={iconVariants({ variant: "normal", className: "stroke-red-400" })} />
        Timeout member:
       </span>
       <Skeleton className="h-[37.6px] w-40" />
      </div>

      <div className="my-2 flex flex-row flex-wrap gap-2">
       <span className="flex w-fit items-center gap-2 font-bold">
        <Icons.messageWarning className={iconVariants({ variant: "normal", className: "stroke-red-400" })} />
        Log to channel:
       </span>
       <Skeleton className="h-[37.6px] w-40" />
      </div>
     </Block>

     <Button variant="primary" className="mt-4" disabled={true}>
      <Icons.Check className={iconVariants({ variant: "button" })} />
      Save
     </Button>
    </div>
   </Block>
   <Block className="mb-4">
    <Header className={cn(headerVariants({ variant: "h2" }))}>
     <Icons.mention className={iconVariants({ variant: "large" })} />
     Anti-Mention <NavBadge>Coming Soon</NavBadge>
    </Header>
    <p className="mb-4 text-left">
     <span>Automatically delete all messages containing user mentions.</span>
    </p>
   </Block>
   <Block className="mb-4">
    <Header className={cn(headerVariants({ variant: "h2" }))}>
     <Icons.messageOff className={iconVariants({ variant: "large" })} />
     Anti-Spam <NavBadge>Coming Soon</NavBadge>
    </Header>
    <p className="mb-4 text-left">
     <span>Automatically delete all messages deemed as spam.</span>
    </p>
   </Block>
   <Block className="mb-4">
    <Header className={cn(headerVariants({ variant: "h2" }))}>
     <Icons.ShieldBan className={iconVariants({ variant: "large" })} />
     Anti-Badwords <NavBadge>Coming Soon</NavBadge>
    </Header>
    <p className="mb-4 text-left">
     <span>Automatically delete all messages containing bad words or phrases.</span>
    </p>
   </Block>
  </>
 );
}
