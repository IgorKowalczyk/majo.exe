"use client";

import { InformationCircleIcon, ArrowPathIcon, CheckIcon, HashtagIcon, Bars3CenterLeftIcon, ChatBubbleLeftIcon, UserMinusIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useState } from "react";
import { toast } from "sonner";
import { Block } from "@/components/Block";
import { ButtonPrimary } from "@/components/Buttons";
import { ChannelsSelect } from "@/components/client/shared/ChannelsSelect";
import Switch from "@/components/client/shared/Switch";
import { Tooltip } from "@/components/client/shared/Tooltip";
import { Header2 } from "@/components/Headers";
import { Input, Textarea } from "@/components/Input";

export function ChangeLeaveMessages({ serverId, enabled, title, description, existingChannel, allChannels }) {
 const [isEnabled, setIsEnabled] = useState(enabled ?? false);
 const [loading, setLoading] = useState(false);
 const [newTitle, setNewTitle] = useState(title);
 const [newDescription, setNewDescription] = useState(description);
 const [messageChannel, setMessageChannel] = useState(existingChannel);

 const save = async (change = true) => {
  setLoading(true);
  if (change) setIsEnabled(!isEnabled);
  const loading = toast.loading(`Turning ${isEnabled ? "on" : "off"} leave messages...`);

  const res = await fetch("/api/settings/messages/leave", {
   method: "POST",
   headers: {
    "Content-Type": "application/json",
   },
   body: JSON.stringify({
    id: serverId,
    enabled: change ? !isEnabled : isEnabled,
    title: newTitle,
    description: newDescription,
    channel: messageChannel,
   }),
  });

  setLoading(false);

  if (!res.ok) {
   if (change) setIsEnabled(isEnabled);
   try {
    const json = await res.json();
    return toast.error(json.error ?? "Something went wrong", {
     id: loading,
    });
   } catch (e) {
    return toast.error("Something went wrong", {
     id: loading,
    });
   }
  }

  const json = await res.json();

  if (json.code === 200) {
   return toast.success(json.message ?? "Leave messages enabled!", {
    id: loading,
   });
  } else {
   change && setIsEnabled(isEnabled);
   return toast.error(json.error ?? "Something went wrong", {
    id: loading,
   });
  }
 };

 return (
  <>
   <Header2>
    <UserMinusIcon className="h-6 min-h-6 w-6 min-w-6" />
    Leave Messages
   </Header2>
   <p className="mb-4 text-left">
    <span>Send a leave message to a channel when a user leaves the server.</span>
   </p>

   <div
    className={clsx({
     "pointer-events-none cursor-wait opacity-50": loading,
    })}
   >
    <div className="my-2 flex flex-row flex-wrap gap-2">
     <Tooltip content="Enable or disable leave messages.">
      <span className="flex w-fit cursor-help items-center gap-2 font-bold">
       <CheckIcon className="h-6 min-h-6 w-6 min-w-6" />
       Enabled:
      </span>
     </Tooltip>
     <Switch enabled={isEnabled} onChange={() => setIsEnabled(!isEnabled)} disabled={loading} />
    </div>

    <div
     className={clsx(
      {
       "pointer-events-none max-h-[0px] opacity-0": !isEnabled,
       "pointer-events-auto max-h-[9999px] opacity-100": isEnabled,
      },
      "duration-200"
     )}
    >
     <Block>
      <div className="mb-2 flex w-fit flex-col flex-wrap gap-2">
       <Tooltip content="Where should the leave message be sent?">
        <span className="flex w-fit cursor-help items-center gap-2 font-bold">
         <HashtagIcon className="h-6 min-h-6 w-6 min-w-6" />
         Channel:
        </span>
       </Tooltip>
       <ChannelsSelect // prettier
        allChannels={allChannels}
        exemptChannels={messageChannel}
        setExemptChannels={(value) => setMessageChannel(value)}
        multiple={false}
       />
      </div>

      <div className="my-2 flex flex-col flex-wrap gap-2">
       <Tooltip content="The title of the leave message.">
        <span className="flex w-fit cursor-help items-center gap-2 font-bold">
         <ChatBubbleLeftIcon className="h-6 min-h-6 w-6 min-w-6" />
         Title:
        </span>
       </Tooltip>
       <Input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} disabled={!isEnabled || loading || !messageChannel} placeholder="👋 Goodbye {user}!" className="!max-w-96 font-normal" />
      </div>

      <div className="my-2 flex flex-col flex-wrap gap-2">
       <Tooltip content="The description of the leave message.">
        <span className="flex w-fit cursor-help items-center gap-2 font-bold">
         <Bars3CenterLeftIcon className="h-6 min-h-6 w-6 min-w-6" />
         Description:
        </span>
       </Tooltip>
       <Textarea type="text" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} disabled={!isEnabled || loading || !messageChannel} placeholder="> We're sorry to see you go!" className="!max-w-96 font-normal" />
      </div>

      <div className="border-accent-primary bg-accent-primary/10 my-4 flex flex-row flex-wrap items-start whitespace-nowrap rounded-md border p-4">
       <span className="mr-1  flex flex-row items-center whitespace-nowrap font-bold leading-none">
        <InformationCircleIcon className="stroke-accent-primary mr-1 h-5 min-h-5 w-5 min-w-5" />
        Note:
       </span>
       <span className="whitespace-normal leading-none">
        Discord markdown is supported. Use <code>{"{user}"}</code> to mention the user and <code>{"{guild}"}</code> to display the server name.
       </span>
      </div>
     </Block>
    </div>
    <ButtonPrimary className="mt-4" onClick={() => save(false)} disabled={!messageChannel || loading}>
     {loading ? (
      <>
       <ArrowPathIcon className="-ml-1 mr-3 h-5 w-5 animate-spin text-white" aria-hidden="true" />
       Saving...
      </>
     ) : (
      <>
       <CheckIcon className="-ml-1 mr-3 h-5 w-5 text-white" aria-hidden="true" />
       Save
      </>
     )}
    </ButtonPrimary>
   </div>
  </>
 );
}
