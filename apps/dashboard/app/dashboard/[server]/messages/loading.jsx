/* eslint-disable complexity */

import { ChatBubbleLeftRightIcon, CheckIcon, UserPlusIcon, UserMinusIcon } from "@heroicons/react/24/outline";
import { Block } from "@/components/Block";
import { ButtonPrimary } from "@/components/Buttons";
import { Header1, Header2 } from "@/components/Headers";
import { InputSkeleton } from "@/components/Skeletons";

export const metadata = {
 title: "Custom Messages",
 description: "Customize the messages sent by the bot.",
};

export default async function ServerAutomod() {
 return (
  <>
   <Header1>
    <ChatBubbleLeftRightIcon className="h-9 min-h-9 w-9 min-w-9" />
    Custom messages
   </Header1>

   <Block className="mt-4 !overflow-x-visible">
    <Header2>
     <UserPlusIcon className="h-6 min-h-6 w-6 min-w-6" />
     Welcome Messages
    </Header2>
    <p className="mb-4 text-left">
     <span>Send a welcome message to new members when they join your server.</span>
    </p>

    <div className="my-2 flex flex-row flex-wrap gap-2">
     <span className="flex w-fit cursor-help items-center gap-2 font-bold">
      <CheckIcon className="h-6 min-h-6 w-6 min-w-6" />
      Enabled:
     </span>
     <InputSkeleton className="!w-16 !h-[30px]" />
    </div>
    <ButtonPrimary className="mt-4" disabled>
     <CheckIcon className="h-6 min-h-6 w-6 min-w-6" />
     Save
    </ButtonPrimary>
   </Block>

   <Block className="mt-4 !overflow-x-visible">
    <Header2>
     <UserMinusIcon className="h-6 min-h-6 w-6 min-w-6" />
     Leave Messages
    </Header2>
    <p className="mb-4 text-left">
     <span>Send a leave message to a channel when a user leaves the server.</span>
    </p>

    <div className="my-2 flex flex-row flex-wrap gap-2">
     <span className="flex w-fit cursor-help items-center gap-2 font-bold">
      <CheckIcon className="h-6 min-h-6 w-6 min-w-6" />
      Enabled:
     </span>
     <InputSkeleton className="!w-16 !h-[30px]" />
    </div>
    <ButtonPrimary className="mt-4" disabled>
     <CheckIcon className="h-6 min-h-6 w-6 min-w-6" />
     Save
    </ButtonPrimary>
   </Block>
  </>
 );
}
