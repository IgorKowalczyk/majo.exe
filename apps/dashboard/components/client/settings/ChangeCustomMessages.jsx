"use client";

import clsx from "clsx";
import { useState } from "react";
import { toast } from "sonner";
import { Block } from "@/components/Block";
import { ButtonPrimary } from "@/components/Buttons";
import { ChannelsSelect } from "@/components/client/shared/ChannelsSelect";
import Switch from "@/components/client/shared/Switch";
import { Tooltip } from "@/components/client/shared/Tooltip";
import { Header2 } from "@/components/Headers";
import { Icons, iconVariants } from "@/components/Icons";
import { Input, Textarea } from "@/components/Input";

export function ChangeWelcomeMessages({ serverId, enabled, title, description, existingChannel, allChannels }) {
 const [isEnabled, setIsEnabled] = useState(enabled ?? false);
 const [loading, setLoading] = useState(false);
 const [newTitle, setNewTitle] = useState(title);
 const [newDescription, setNewDescription] = useState(description);
 const [messageChannel, setMessageChannel] = useState(existingChannel);

 const save = async (change = true) => {
  setLoading(true);
  if (change) setIsEnabled(!isEnabled);
  const loading = toast.loading(`Turning ${!isEnabled ? "on" : "off"} welcome messages...`);

  const res = await fetch("/api/settings/messages/welcome", {
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
   return toast.success(json.message ?? "Welcome messages enabled!", {
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
    <Icons.userAdd className={iconVariants({ variant: "large", className: "stroke-2" })} />
    Welcome Messages
   </Header2>
   <p className="mb-4 text-left">
    <span>Send a welcome message to new members when they join your server.</span>
   </p>

   <div
    className={clsx({
     "pointer-events-none cursor-wait opacity-50": loading,
    })}
   >
    <div className="my-2 flex flex-row flex-wrap gap-2">
     <Tooltip content="Enable or disable welcome messages.">
      <span className="flex w-fit cursor-help items-center gap-2 font-bold">
       <Icons.check className={iconVariants({ variant: "normal" })} />
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
       <Tooltip content="Where should the welcome message be sent?">
        <span className="flex w-fit cursor-help items-center gap-2 font-bold">
         <Icons.hash className={iconVariants({ variant: "normal" })} />
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

      {!messageChannel && (
       <div className="my-4 flex flex-row flex-wrap items-start whitespace-nowrap rounded-md border border-orange-400 bg-orange-400/10 p-4">
        <span className="mr-1 flex flex-row items-center whitespace-nowrap font-bold leading-none">
         <Icons.warning className={iconVariants({ variant: "normal", className: "mr-1 stroke-orange-400" })} />
         Warning:
        </span>
        <span className="whitespace-normal">You must select a channel to send welcome messages to.</span>
       </div>
      )}

      <div className="my-2 flex flex-col flex-wrap gap-2">
       <Tooltip content="The title of the welcome message.">
        <span className="flex w-fit cursor-help items-center gap-2 font-bold">
         <Icons.type className={iconVariants({ variant: "normal" })} />
         Title:
        </span>
       </Tooltip>
       <Input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} disabled={!isEnabled || loading || !messageChannel} placeholder="🎉 Welcome to the server {user}!" className="!max-w-96 font-normal" />
      </div>

      <div className="my-2 flex flex-col flex-wrap gap-2">
       <Tooltip content="The description of the welcome message.">
        <span className="flex w-fit cursor-help items-center gap-2 font-bold">
         <Icons.text className={iconVariants({ variant: "normal" })} />
         Description:
        </span>
       </Tooltip>
       <Textarea type="text" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} disabled={!isEnabled || loading || !messageChannel} placeholder="> Welcome to **{guild}** We hope you enjoy your stay here!" className="!max-w-96 font-normal" />
      </div>

      <div className="border-accent-primary bg-accent-primary/10 my-4 flex flex-row flex-wrap items-start whitespace-nowrap rounded-md border p-4">
       <span className="mr-1  flex flex-row items-center whitespace-nowrap font-bold leading-none">
        <Icons.info className={iconVariants({ variant: "normal", className: "stroke-accent-primary mr-1" })} />
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
       <Icons.refresh className={iconVariants({ variant: "button", className: "animate-spin" })} />
       Saving...
      </>
     ) : (
      <>
       <Icons.check className={iconVariants({ variant: "button" })} />
       Save
      </>
     )}
    </ButtonPrimary>
   </div>
  </>
 );
}

export function ChangeLeaveMessages({ serverId, enabled, title, description, existingChannel, allChannels }) {
 const [isEnabled, setIsEnabled] = useState(enabled ?? false);
 const [loading, setLoading] = useState(false);
 const [newTitle, setNewTitle] = useState(title);
 const [newDescription, setNewDescription] = useState(description);
 const [messageChannel, setMessageChannel] = useState(existingChannel);

 const save = async (change = true) => {
  setLoading(true);
  if (change) setIsEnabled(!isEnabled);
  const loading = toast.loading(`Turning ${!isEnabled ? "on" : "off"} leave messages...`);

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
    <Icons.userMinus className={iconVariants({ variant: "large", className: "stroke-2" })} />
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
       <Icons.check className={iconVariants({ variant: "normal" })} />
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
         <Icons.hash className={iconVariants({ variant: "normal" })} />
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

      {!messageChannel && (
       <div className="my-4 flex flex-row flex-wrap items-start whitespace-nowrap rounded-md border border-orange-400 bg-orange-400/10 p-4">
        <span className="mr-1 flex flex-row items-center whitespace-nowrap font-bold leading-none">
         <Icons.warning className={iconVariants({ variant: "normal", className: "mr-1 stroke-orange-400" })} />
         Warning:
        </span>
        <span className="whitespace-normal">You must select a channel to send leave messages to.</span>
       </div>
      )}

      <div className="my-2 flex flex-col flex-wrap gap-2">
       <Tooltip content="The title of the leave message.">
        <span className="flex w-fit cursor-help items-center gap-2 font-bold">
         <Icons.type className={iconVariants({ variant: "normal" })} />
         Title:
        </span>
       </Tooltip>
       <Input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} disabled={!isEnabled || loading || !messageChannel} placeholder="👋 Goodbye {user}!" className="!max-w-96 font-normal" />
      </div>

      <div className="my-2 flex flex-col flex-wrap gap-2">
       <Tooltip content="The description of the leave message.">
        <span className="flex w-fit cursor-help items-center gap-2 font-bold">
         <Icons.text className={iconVariants({ variant: "normal" })} />
         Description:
        </span>
       </Tooltip>
       <Textarea type="text" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} disabled={!isEnabled || loading || !messageChannel} placeholder="> We're sorry to see you go!" className="!max-w-96 font-normal" />
      </div>

      <div className="border-accent-primary bg-accent-primary/10 my-4 flex flex-row flex-wrap items-start whitespace-nowrap rounded-md border p-4">
       <span className="mr-1  flex flex-row items-center whitespace-nowrap font-bold leading-none">
        <Icons.info className={iconVariants({ variant: "normal", className: "stroke-accent-primary mr-1" })} />
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
       <Icons.refresh className={iconVariants({ variant: "button", className: "animate-spin" })} />
       Saving...
      </>
     ) : (
      <>
       <Icons.check className={iconVariants({ variant: "button" })} />
       Save
      </>
     )}
    </ButtonPrimary>
   </div>
  </>
 );
}
