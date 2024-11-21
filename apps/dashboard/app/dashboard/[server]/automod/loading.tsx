import { Block } from "@/components/Block";
import { ButtonPrimary } from "@/components/Buttons";
import { Header1, Header2, Header3, Header5 } from "@/components/Headers";
import "tippy.js/dist/backdrop.css";
import "tippy.js/animations/shift-away.css";
import "tippy.js/dist/tippy.css";
import { Icons, iconVariants } from "@/components/Icons";
import { NavBadge } from "@/components/nav/client/SideNav";
import { InputSkeleton } from "@/components/Skeletons";

export default function Loading() {
 return (
  <>
   <Header1>
    <Icons.bot className={iconVariants({ variant: "extraLarge" })} />
    Automod
   </Header1>
   <Header5 className="mb-4 mt-2 !justify-start !text-left">
    <span>Automatically moderate your server, block bad words, links and other things.</span>
   </Header5>
   <Block className="mb-4">
    <Header2>
     <Icons.userBlock className={iconVariants({ variant: "large", className: "!stroke-2" })} />
     Anti-Invite <Icons.refresh className={iconVariants({ variant: "large", className: "stroke-accent-primary animate-spin" })} />
    </Header2>
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
        <Icons.users className={iconVariants({ variant: "normal", className: "stroke-accent-primary" })} />
        Ignore Roles:
       </span>
       <InputSkeleton className="!h-[37.6px] !w-40" />
      </div>

      <div className="mt-2 flex flex-row flex-wrap gap-2">
       <span className="flex w-fit items-center gap-2 font-bold">
        <Icons.hash className={iconVariants({ variant: "normal", className: "stroke-accent-primary" })} />
        Ignore Channels:
       </span>
       <InputSkeleton className="!h-[37.6px] !w-40" />
      </div>

      <p className="mt-2 gap-2 text-sm text-white/70">
       <span className="font-bold">Pssst!</span> Members with Admin or Manage Server permissions are always excluded from automod.
      </p>
     </Block>

     <Block className="mb-4 !py-3">
      <Header3>
       <Icons.shieldMinus className={iconVariants({ variant: "large" })} /> Actions:
      </Header3>
      <span className="mb-4 font-normal">What should I do when a member triggers the rule?</span>

      <div className="my-2 flex flex-row flex-wrap gap-2">
       <span className="flex w-fit items-center gap-2 font-bold">
        <Icons.trash className={iconVariants({ variant: "normal", className: "stroke-red-400" })} />
        Delete message:
       </span>
       <InputSkeleton className="!h-[30px] !w-12" />
      </div>

      <div className="my-2 flex flex-row flex-wrap gap-2">
       <span className="flex w-fit items-center gap-2 font-bold">
        <Icons.timer className={iconVariants({ variant: "normal", className: "stroke-red-400" })} />
        Timeout member:
       </span>
       <InputSkeleton className="!h-[37.6px] !w-40" />
      </div>

      <div className="my-2 flex flex-row flex-wrap gap-2">
       <span className="flex w-fit items-center gap-2 font-bold">
        <Icons.messageWarning className={iconVariants({ variant: "normal", className: "stroke-red-400" })} />
        Log to channel:
       </span>
       <InputSkeleton className="!h-[37.6px] !w-40" />
      </div>
     </Block>

     <ButtonPrimary className="mt-4" disabled={true}>
      <>
       <Icons.check className={iconVariants({ variant: "button" })} />
       Save
      </>
     </ButtonPrimary>
    </div>
   </Block>

   <Block className="mb-4">
    <Header2>
     <Icons.unlink className={iconVariants({ variant: "large", className: "!stroke-2" })} />
     Anti-Link <Icons.refresh className={iconVariants({ variant: "large", className: "stroke-accent-primary animate-spin" })} />
    </Header2>
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
        <Icons.users className={iconVariants({ variant: "normal", className: "stroke-accent-primary" })} />
        Ignore Roles:
       </span>
       <InputSkeleton className="!h-[37.6px] !w-40" />
      </div>

      <div className="mt-2 flex flex-row flex-wrap gap-2">
       <span className="flex w-fit items-center gap-2 font-bold">
        <Icons.hash className={iconVariants({ variant: "normal", className: "stroke-accent-primary" })} />
        Ignore Channels:
       </span>
       <InputSkeleton className="!h-[37.6px] !w-40" />
      </div>

      <p className="mt-2 gap-2 text-sm text-white/70">
       <span className="font-bold">Pssst!</span> Members with Admin or Manage Server permissions are always excluded from automod.
      </p>
     </Block>

     <Block className="mb-4 !py-3">
      <Header3>
       <Icons.shieldMinus className={iconVariants({ variant: "large" })} /> Actions:
      </Header3>
      <span className="mb-4 font-normal">What should I do when a member triggers the rule?</span>

      <div className="my-2 flex flex-row flex-wrap gap-2">
       <span className="flex w-fit items-center gap-2 font-bold">
        <Icons.trash className={iconVariants({ variant: "normal", className: "stroke-red-400" })} />
        Delete message:
       </span>
       <InputSkeleton className="!h-[30px] !w-12" />
      </div>

      <div className="my-2 flex flex-row flex-wrap gap-2">
       <span className="flex w-fit items-center gap-2 font-bold">
        <Icons.timer className={iconVariants({ variant: "normal", className: "stroke-red-400" })} />
        Timeout member:
       </span>
       <InputSkeleton className="!h-[37.6px] !w-40" />
      </div>

      <div className="my-2 flex flex-row flex-wrap gap-2">
       <span className="flex w-fit items-center gap-2 font-bold">
        <Icons.messageWarning className={iconVariants({ variant: "normal", className: "stroke-red-400" })} />
        Log to channel:
       </span>
       <InputSkeleton className="!h-[37.6px] !w-40" />
      </div>
     </Block>

     <ButtonPrimary className="mt-4" disabled={true}>
      <>
       <Icons.check className={iconVariants({ variant: "button" })} />
       Save
      </>
     </ButtonPrimary>
    </div>
   </Block>
   <Block className="mb-4">
    <Header2>
     <Icons.mention className={iconVariants({ variant: "large" })} />
     Anti-Mention <NavBadge>Coming Soon</NavBadge>
    </Header2>
    <p className="mb-4 text-left">
     <span>Automatically delete all messages containing user mentions.</span>
    </p>
   </Block>
   <Block className="mb-4">
    <Header2>
     <Icons.messageOff className={iconVariants({ variant: "large" })} />
     Anti-Spam <NavBadge>Coming Soon</NavBadge>
    </Header2>
    <p className="mb-4 text-left">
     <span>Automatically delete all messages deemed as spam.</span>
    </p>
   </Block>
   <Block className="mb-4">
    <Header2>
     <Icons.shieldBan className={iconVariants({ variant: "large" })} />
     Anti-Badwords <NavBadge>Coming Soon</NavBadge>
    </Header2>
    <p className="mb-4 text-left">
     <span>Automatically delete all messages containing bad words or phrases.</span>
    </p>
   </Block>
  </>
 );
}
