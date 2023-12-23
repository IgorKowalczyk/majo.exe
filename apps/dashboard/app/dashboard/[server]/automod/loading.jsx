/* eslint-disable complexity */

import { ArrowPathIcon, AtSymbolIcon, ChatBubbleBottomCenterTextIcon, ChatBubbleLeftEllipsisIcon, CheckIcon, ClockIcon, EyeSlashIcon, HashtagIcon, LinkIcon, NoSymbolIcon, TrashIcon, UserGroupIcon, UserPlusIcon, WrenchIcon } from "@heroicons/react/24/outline";
import { Block } from "@/components/Block";
import { ButtonPrimary } from "@/components/Buttons";
import { Header1, Header2, Header3, Header5 } from "@/components/Headers";
import "tippy.js/dist/backdrop.css";
import "tippy.js/animations/shift-away.css";
import "tippy.js/dist/tippy.css";
import { NavBadge } from "@/components/nav/client/SideNav";
import { InputSkeleton } from "@/components/Skeletons";

export const metadata = {
 title: "Leaderboard",
 description: "View the leaderboard for your server.",
};

export default async function ServerAutomod() {
 return (
  <>
   <Header1>
    <ChatBubbleBottomCenterTextIcon className="h-9 min-h-9 w-9 min-w-9" />
    Automod
   </Header1>
   <Header5 className="mb-4 mt-2 !justify-start !text-left">
    <span>Automatically moderate your server, block bad words, links and other things.</span>
   </Header5>
   <Block className="mb-4">
    <Header2>
     <UserPlusIcon className="h-6 min-h-6 w-6 min-w-6" />
     Anti-Invite <ArrowPathIcon className="stroke-accent-primary h-6 min-h-6 w-6 min-w-6 animate-spin" />
    </Header2>
    <p className="mb-4 text-left">
     <span>Automatically delete all messages containing Discord server invites.</span>
    </p>

    <div>
     <Block className="mb-4 !py-3">
      <Header3>
       <EyeSlashIcon className="h-6 min-h-6 w-6 min-w-6" /> Ignored:
      </Header3>
      <span className="mb-4 font-normal">What should I ignore?</span>

      <div className="flex flex-row flex-wrap gap-2">
       <span className="flex w-fit items-center gap-2 font-bold">
        <UserGroupIcon className="stroke-accent-primary h-5 min-h-5 w-5 min-w-5" aria-hidden="true" />
        Ignore Roles:
       </span>
       <InputSkeleton className="!h-[37.6px] !w-40" />
      </div>

      <div className="mt-2 flex flex-row flex-wrap gap-2">
       <span className="flex w-fit items-center gap-2 font-bold">
        <HashtagIcon className="stroke-accent-primary h-5 min-h-5 w-5 min-w-5" aria-hidden="true" />
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
       <WrenchIcon className="h-6 min-h-6 w-6 min-w-6" /> Actions:
      </Header3>
      <span className="mb-4 font-normal">What should I do when a member triggers the rule?</span>

      <div className="my-2 flex flex-row flex-wrap gap-2">
       <span className="flex w-fit items-center gap-2 font-bold">
        <TrashIcon className="h-6 min-h-6 w-6 min-w-6 stroke-red-400" />
        Delete message:
       </span>
       <InputSkeleton className="!h-[30px] !w-12" />
      </div>

      <div className="my-2 flex flex-row flex-wrap gap-2">
       <span className="flex w-fit items-center gap-2 font-bold">
        <ClockIcon className="h-6 min-h-6 w-6 min-w-6 stroke-red-400" />
        Timeout member:
       </span>
       <InputSkeleton className="!h-[37.6px] !w-40" />
      </div>

      <div className="my-2 flex flex-row flex-wrap  gap-2">
       <span className="flex w-fit items-center gap-2 font-bold">
        <ChatBubbleBottomCenterTextIcon className="h-6 min-h-6 w-6 min-w-6 stroke-red-400" />
        Log to channel:
       </span>
       <InputSkeleton className="!h-[37.6px] !w-40" />
      </div>
     </Block>

     <ButtonPrimary className="mt-4" disabled={true}>
      <>
       <CheckIcon className="-ml-1 mr-3 h-5 w-5 text-white" aria-hidden="true" />
       Save
      </>
     </ButtonPrimary>
    </div>
   </Block>

   <Block className="mb-4">
    <Header2>
     <LinkIcon className="h-6 min-h-6 w-6 min-w-6" />
     Anti-Link <ArrowPathIcon className="stroke-accent-primary h-6 min-h-6 w-6 min-w-6 animate-spin" />
    </Header2>
    <p className="mb-4 text-left">
     <span>Automatically delete all messages containing links.</span>
    </p>

    <div>
     <Block className="mb-4 !py-3">
      <Header3>
       <EyeSlashIcon className="h-6 min-h-6 w-6 min-w-6" /> Ignored:
      </Header3>
      <span className="mb-4 font-normal">What should I ignore?</span>

      <div className="flex flex-row flex-wrap gap-2">
       <span className="flex w-fit items-center gap-2 font-bold">
        <UserGroupIcon className="stroke-accent-primary h-5 min-h-5 w-5 min-w-5" aria-hidden="true" />
        Ignore Roles:
       </span>
       <InputSkeleton className="!h-[37.6px] !w-40" />
      </div>

      <div className="mt-2 flex flex-row flex-wrap gap-2">
       <span className="flex w-fit items-center gap-2 font-bold">
        <HashtagIcon className="stroke-accent-primary h-5 min-h-5 w-5 min-w-5" aria-hidden="true" />
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
       <WrenchIcon className="h-6 min-h-6 w-6 min-w-6" /> Actions:
      </Header3>
      <span className="mb-4 font-normal">What should I do when a member triggers the rule?</span>

      <div className="my-2 flex flex-row flex-wrap gap-2">
       <span className="flex w-fit items-center gap-2 font-bold">
        <TrashIcon className="h-6 min-h-6 w-6 min-w-6 stroke-red-400" />
        Delete message:
       </span>
       <InputSkeleton className="!h-[30px] !w-12" />
      </div>

      <div className="my-2 flex flex-row flex-wrap gap-2">
       <span className="flex w-fit items-center gap-2 font-bold">
        <ClockIcon className="h-6 min-h-6 w-6 min-w-6 stroke-red-400" />
        Timeout member:
       </span>
       <InputSkeleton className="!h-[37.6px] !w-40" />
      </div>

      <div className="my-2 flex flex-row flex-wrap  gap-2">
       <span className="flex w-fit items-center gap-2 font-bold">
        <ChatBubbleBottomCenterTextIcon className="h-6 min-h-6 w-6 min-w-6 stroke-red-400" />
        Log to channel:
       </span>
       <InputSkeleton className="!h-[37.6px] !w-40" />
      </div>
     </Block>

     <ButtonPrimary className="mt-4" disabled={true}>
      <>
       <CheckIcon className="-ml-1 mr-3 h-5 w-5 text-white" aria-hidden="true" />
       Save
      </>
     </ButtonPrimary>
    </div>
   </Block>
   <Block className="mb-4">
    <Header2>
     <AtSymbolIcon className="h-6 min-h-6 w-6 min-w-6" />
     Anti-Mention <NavBadge>Coming Soon</NavBadge>
    </Header2>
    <p className="mb-4 text-left">
     <span>Automatically delete all messages containing user mentions.</span>
    </p>
   </Block>
   <Block className="mb-4">
    <Header2>
     <ChatBubbleLeftEllipsisIcon className="h-6 min-h-6 w-6 min-w-6" />
     Anti-Spam <NavBadge>Coming Soon</NavBadge>
    </Header2>
    <p className="mb-4 text-left">
     <span>Automatically delete all messages deemed as spam.</span>
    </p>
   </Block>
   <Block className="mb-4">
    <Header2>
     <NoSymbolIcon className="h-6 min-h-6 w-6 min-w-6" />
     Anti-Badwords <NavBadge>Coming Soon</NavBadge>
    </Header2>
    <p className="mb-4 text-left">
     <span>Automatically delete all messages containing bad words or phrases.</span>
    </p>
   </Block>
  </>
 );
}
