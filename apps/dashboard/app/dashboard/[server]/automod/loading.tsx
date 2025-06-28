import {
 HashIcon,
 UsersIcon,
 BotIcon,
 ShieldMinusIcon,
 MoveVerticalIcon,
 CheckIcon,
 ShieldBanIcon,
 ArrowDownIcon,
 ShieldXIcon,
 AtSignIcon,
 ShieldPlusIcon,
 LoaderCircleIcon,
 Link2OffIcon,
} from "lucide-react";
import { DeleteMessageLoader } from "./components/DeleteMessage";
import { LogToChannelLoader } from "./components/LogChannel";
import { TimeoutMemberLoader } from "./components/TimeoutMember";
import { Badge } from "@/components/ui/Badge";
import { Block } from "@/components/ui/Block";
import { Button } from "@/components/ui/Buttons";
import Header, { headerVariants } from "@/components/ui/Headers";
import { Icons, iconVariants } from "@/components/ui/Icons";
import { Skeleton } from "@/components/ui/Skeletons";
import { cn } from "@/lib/utils";

const IgnoreRolesLoader = () => (
 <div className="flex w-fit flex-row flex-wrap items-center gap-2 text-center font-bold">
  <span className="flex w-fit items-center gap-2 font-bold">
   <UsersIcon className={iconVariants({ variant: "normal", className: "stroke-accent-primary" })} />
   Ignore Roles:
  </span>
  <Skeleton className="h-[37.6px] w-40" />
 </div>
);

const IgnoreChannelsLoader = () => (
 <div className="mt-2 flex w-fit flex-row flex-wrap items-center gap-2 text-center font-bold">
  <span className="flex w-fit items-center gap-2 font-bold">
   <HashIcon className={iconVariants({ variant: "normal", className: "stroke-accent-primary" })} />
   Ignore Channels:
  </span>
  <Skeleton className="h-[37.6px] w-40" />
 </div>
);

export default function Loading() {
 return (
  <>
   <Header className={cn(headerVariants({ variant: "h1", margin: "normal" }))}>
    <BotIcon className={iconVariants({ variant: "extraLarge" })} />
    Automod
   </Header>
   <p className="mb-4 text-left text-base md:text-lg">Automatically moderate your server, block bad words, links and other things.</p>
   <Block className="mb-4">
    <Header className={cn(headerVariants({ variant: "h2", margin: "normal" }))}>
     <Icons.userBlock className={iconVariants({ variant: "large", className: "stroke-2!" })} />
     Anti-Invite <LoaderCircleIcon className={iconVariants({ variant: "large", className: "stroke-accent-primary animate-spin" })} />
    </Header>
    <p className="mb-4 text-left">
     <span>Automatically delete all messages containing Discord server invites.</span>
    </p>

    <Block className="mb-4 py-3!">
     <Header className={cn(headerVariants({ variant: "h3" }))}>
      <Icons.hide className={iconVariants({ variant: "large" })} /> Exempt:
     </Header>
     <span className="mb-4 font-normal">What should be ignored by the rule?</span>
     <IgnoreRolesLoader />
     <IgnoreChannelsLoader />
     <p className="mt-2 gap-2 text-sm text-white/70">
      <span className="font-bold">Pssst!</span> Members with Admin or Manage Server permissions are always excluded from automod.
     </p>
    </Block>

    <MoveVerticalIcon className={cn(iconVariants({ variant: "large" }), "mx-6 mb-4 opacity-50")} />

    <Block className="mb-4 py-3!">
     <Header className={cn(headerVariants({ variant: "h3" }))}>
      <ShieldMinusIcon className={iconVariants({ variant: "large" })} /> Actions:
     </Header>
     <span className="mb-4 font-normal">What should I do when a member triggers the rule?</span>

     <DeleteMessageLoader />
     <TimeoutMemberLoader />
     <LogToChannelLoader />
    </Block>

    <Button variant="primary" className="mt-4" disabled={true}>
     <CheckIcon className={iconVariants({ variant: "button" })} />
     Save
    </Button>
   </Block>

   <Block className="mb-4">
    <Header className={cn(headerVariants({ variant: "h2", margin: "normal" }))}>
     <Link2OffIcon className={iconVariants({ variant: "large", className: "stroke-2!" })} />
     Anti-Link <LoaderCircleIcon className={iconVariants({ variant: "large", className: "stroke-accent-primary animate-spin" })} />
    </Header>
    <p className="mb-4 text-left">
     <span>Automatically delete all messages containing links.</span>
    </p>

    <Block className="mb-4 py-3!">
     <Header className={cn(headerVariants({ variant: "h3" }))}>
      <Icons.hide className={iconVariants({ variant: "large" })} /> Exempt:
     </Header>
     <span className="mb-4 font-normal">What should be ignored by the rule?</span>

     <IgnoreRolesLoader />
     <IgnoreChannelsLoader />

     <p className="mt-2 gap-2 text-sm text-white/70">
      <span className="font-bold">Pssst!</span> Members with Admin or Manage Server permissions are always excluded from automod.
     </p>
    </Block>

    <MoveVerticalIcon className={cn(iconVariants({ variant: "large" }), "mx-6 mb-4 opacity-50")} />

    <Block className="mb-4 py-3!">
     <Header className={cn(headerVariants({ variant: "h3" }))}>
      <ShieldMinusIcon className={iconVariants({ variant: "large" })} /> Actions:
     </Header>
     <span className="mb-4 font-normal">What should I do when a member triggers the rule?</span>
     <DeleteMessageLoader />
     <TimeoutMemberLoader />
     <LogToChannelLoader />
    </Block>

    <Button variant="primary" className="mt-4" disabled={true}>
     <CheckIcon className={iconVariants({ variant: "button" })} />
     Save
    </Button>
   </Block>
   <Block className="mb-4">
    <Header className={cn(headerVariants({ variant: "h2", margin: "normal" }))}>
     <AtSignIcon className={iconVariants({ variant: "large" })} />
     Anti-Mention
    </Header>
    <p className="mb-4 text-left">
     <span>Automatically delete all messages containing user mentions.</span>
    </p>
    <Block className="mb-4 py-3!">
     <Header className={cn(headerVariants({ variant: "h3" }))}>
      <Icons.hide className={iconVariants({ variant: "large" })} /> Exempt:
     </Header>
     <span className="mb-4 font-normal">What should be ignored by the rule?</span>

     <IgnoreRolesLoader />
     <IgnoreChannelsLoader />

     <p className="mt-2 gap-2 text-sm text-white/70">
      <span className="font-bold">Pssst!</span> Members with Admin or Manage Server permissions are always excluded from automod.
     </p>
    </Block>

    <MoveVerticalIcon className={cn(iconVariants({ variant: "large" }), "mx-6 mb-4 opacity-50")} />

    <Block className="mb-4 py-3!">
     <Header className={cn(headerVariants({ variant: "h3" }))}>
      <ShieldMinusIcon className={iconVariants({ variant: "large" })} /> Actions:
     </Header>
     <span className="mb-4 font-normal">What should I do when a member triggers the rule?</span>

     <DeleteMessageLoader />
     <TimeoutMemberLoader />
     <LogToChannelLoader />
    </Block>

    <ArrowDownIcon className={cn(iconVariants({ variant: "large" }), "mx-6 mb-4 opacity-50")} />

    <Block className="mb-4 py-3!">
     <Header className={cn(headerVariants({ variant: "h3" }))}>
      <ShieldXIcon className={iconVariants({ variant: "large" })} /> Limits:
     </Header>

     <div className="my-2 flex flex-row flex-wrap gap-2">
      <span className="flex w-fit cursor-help items-center gap-2 font-bold">
       <AtSignIcon className={iconVariants({ variant: "normal", className: "stroke-red-400" })} />
       How many mentions are allowed in a single message?
      </span>

      <Skeleton className="h-[37.6px] w-40" />
     </div>

     <div className="my-2 flex flex-row flex-wrap gap-2">
      <span className="flex w-fit cursor-help items-center gap-2 font-bold">
       <ShieldPlusIcon className={iconVariants({ variant: "normal", className: "stroke-red-400" })} />
       Enable Mention Raid Protection
      </span>

      <Skeleton className="h-[37.6px] w-40" />
     </div>
    </Block>
   </Block>
   <Block className="mb-4">
    <Header className={cn(headerVariants({ variant: "h2", margin: "normal" }))}>
     <Icons.messageOff className={iconVariants({ variant: "large", className: "stroke-2!" })} />
     Anti-Spam <LoaderCircleIcon className={iconVariants({ variant: "large", className: "stroke-accent-primary animate-spin" })} />
    </Header>
    <p className="mb-4 text-left">
     <span>Automatically delete all spam messages.</span>
    </p>

    <Block className="mb-4 py-3!">
     <Header className={cn(headerVariants({ variant: "h3" }))}>
      <Icons.hide className={iconVariants({ variant: "large" })} /> Exempt:
     </Header>
     <span className="mb-4 font-normal">What should be ignored by the rule?</span>

     <IgnoreRolesLoader />
     <IgnoreChannelsLoader />

     <p className="mt-2 gap-2 text-sm text-white/70">
      <span className="font-bold">Pssst!</span> Members with Admin or Manage Server permissions are always excluded from automod.
     </p>
    </Block>

    <MoveVerticalIcon className={cn(iconVariants({ variant: "large" }), "mx-6 mb-4 opacity-50")} />

    <Block className="mb-4 py-3!">
     <Header className={cn(headerVariants({ variant: "h3" }))}>
      <ShieldMinusIcon className={iconVariants({ variant: "large" })} /> Actions:
     </Header>
     <span className="mb-4 font-normal">What should I do when a member triggers the rule?</span>

     <DeleteMessageLoader />
     <LogToChannelLoader />
    </Block>

    <Button variant="primary" className="mt-4" disabled={true}>
     <CheckIcon className={iconVariants({ variant: "button" })} />
     Save
    </Button>
   </Block>
   <Block className="mb-4">
    <Header className={cn(headerVariants({ variant: "h2", margin: "normal" }))}>
     <ShieldBanIcon className={iconVariants({ variant: "large" })} />
     Anti-Badwords <Badge>Coming Soon</Badge>
    </Header>
    <p className="mb-4 text-left">
     <span>Automatically delete all messages containing bad words or phrases.</span>
    </p>

    <p className="mb-4 text-left font-bold">
     <span>
      Enabling this rule here is not yet supported. Please use the <code>/automod anti-bad-words enable</code> command in chat.
     </span>
    </p>
   </Block>
  </>
 );
}
