"use client";

import { toHTML } from "@odiffey/discord-markdown";
import clsx from "clsx";
import { useState } from "react";
import { toast } from "sonner";
import { Block } from "@/components/Block";
import { Button } from "@/components/Buttons";
import { ChannelsSelect } from "@/components/client/shared/ChannelsSelect";
import Switch from "@/components/client/shared/Switch";
import { Tooltip } from "@/components/client/shared/Tooltip";
import { EmbedTitle, Embed, EmbedDescription, EmbedImage } from "@/components/Embed";
import { Header2 } from "@/components/Headers";
import { Icons, iconVariants } from "@/components/Icons";
import { Input, Textarea } from "@/components/Input";
import { globalConfig } from "@majoexe/config";

export function ChangeMessages({ serverId, enabled, title, description, existingChannel, allChannels, type, defaultMessages, replacedData }) {
 const [isEnabled, setIsEnabled] = useState(enabled ?? false);
 const [loading, setLoading] = useState(false);
 const [newTitle, setNewTitle] = useState(title);
 const [newDescription, setNewDescription] = useState(description);
 const [messageChannel, setMessageChannel] = useState(existingChannel);

 const save = async (change = true) => {
  setLoading(true);
  if (change) setIsEnabled(!isEnabled);
  const loading = toast.loading(`Turning ${isEnabled ? "on" : "off"} ${type} messages...`);

  const res = await fetch(`/api/settings/messages/${type}`, {
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
    console.log(e);
    return toast.error("Something went wrong", {
     id: loading,
    });
   }
  }

  const json = await res.json();

  if (json.code === 200) {
   return toast.success(json.message, {
    id: loading,
   });
  } else {
   change && setIsEnabled(isEnabled);
   return toast.error(json.error ?? "Something went wrong", {
    id: loading,
   });
  }
 };

 if (!allChannels) return null;

 return (
  <>
   {type === "welcome" ? (
    <>
     <Header2>
      <Icons.userAdd className={iconVariants({ variant: "large", className: "!stroke-2" })} />
      Welcome messages
     </Header2>
     <p className="mb-4 text-left">Send a message when a user joins the server.</p>
    </>
   ) : (
    <>
     <Header2>
      <Icons.userMinus className={iconVariants({ variant: "large", className: "!stroke-2" })} />
      Leave messages
     </Header2>
     <p className="mb-4 text-left">Send a message when a user leaves the server.</p>
    </>
   )}
   <div
    className={clsx({
     "pointer-events-none cursor-wait opacity-50": loading,
    })}
   >
    <div className="my-4 flex flex-row flex-wrap gap-2">
     <Tooltip content="Enable or disable welcome messages.">
      <span className="flex w-fit cursor-help items-center gap-2 font-bold">
       <Icons.Check className={iconVariants({ variant: "normal" })} />
       Enabled:
      </span>
     </Tooltip>
     <Switch enabled={isEnabled} onChange={() => setIsEnabled(!isEnabled)} disabled={loading} />
    </div>

    <div
     className={clsx(
      {
       "max-h-0 opacity-0": isEnabled,
       "max-h-[500px] opacity-100": !isEnabled,
      },
      "transition-all duration-200 ease-in-out"
     )}
    >
     <div className="my-4 flex flex-row flex-wrap items-start overflow-hidden whitespace-nowrap rounded-md border border-accent-primary bg-accent-primary/10 p-4 duration-200 will-change-transform">
      <span className="mr-1 flex flex-row items-center whitespace-nowrap font-bold">
       <Icons.Info className={iconVariants({ variant: "normal", className: "stroke-accent-primary mr-1" })} />
       Note:
      </span>
      <span className="whitespace-normal">You have to enable this message to configure it.</span>
     </div>
    </div>

    <Block
     className={clsx(
      {
       "pointer-events-none cursor-not-allowed opacity-50": !isEnabled && !loading,
       "pointer-events-none opacity-50": loading,
       "cursor-default opacity-100": isEnabled,
      },
      "border-0 p-0 duration-200 md:border md:border-neutral-800 md:p-6"
     )}
    >
     <div className="flex flex-col gap-4 xl:flex-row xl:gap-8">
      <div className="w-full">
       <div className="mb-2 flex w-fit flex-col flex-wrap gap-2">
        <Tooltip content="Where should the welcome message be sent?">
         <span className="flex w-fit cursor-help items-center gap-2 font-bold">
          <Icons.Hash className={iconVariants({ variant: "normal" })} />
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

       <div
        className={clsx(
         {
          "max-h-0 opacity-0": messageChannel,
          "max-h-[500px] opacity-100": !messageChannel,
         },
         "transition-all duration-200 ease-in-out"
        )}
       >
        <div className="my-4 flex w-fit flex-row flex-wrap items-start whitespace-nowrap rounded-md border border-orange-400 bg-orange-400/10 p-4">
         <span className="mr-1 flex flex-row items-center whitespace-nowrap font-bold leading-none">
          <Icons.warning className={iconVariants({ variant: "normal", className: "mr-1 stroke-orange-400" })} />
          Warning:
         </span>
         <span className="whitespace-normal">You must select a channel to send {type} messages to.</span>
        </div>
       </div>

       <div className="my-2 flex flex-col flex-wrap gap-2">
        <Tooltip content="The title of the welcome message.">
         <span className="flex w-fit cursor-help items-center gap-2 font-bold">
          <Icons.Type className={iconVariants({ variant: "normal" })} />
          Title:
         </span>
        </Tooltip>
        <Input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} disabled={!isEnabled || loading || !messageChannel} placeholder={defaultMessages.title} className="!max-w-96 font-normal" />
       </div>

       <div className="my-2 flex flex-col flex-wrap gap-2">
        <Tooltip content="The description of the welcome message.">
         <span className="flex w-fit cursor-help items-center gap-2 font-bold">
          <Icons.Text className={iconVariants({ variant: "normal" })} />
          Description:
         </span>
        </Tooltip>
        <Textarea value={newDescription} onChange={(e) => setNewDescription(e.target.value)} disabled={!isEnabled || loading || !messageChannel} placeholder={defaultMessages.description} className="!max-w-96 font-normal" />
       </div>

       <div className="my-4 w-fit whitespace-nowrap rounded-md border border-accent-primary bg-accent-primary/10 p-4">
        <div className="mr-1 flex flex-row items-center whitespace-nowrap font-bold">
         <Icons.Info className={iconVariants({ variant: "normal", className: "stroke-accent-primary mr-1" })} />
         Note:
        </div>
        <div className="mt-1 whitespace-normal">
         <p>Discord markdown is supported.</p>
         <p className="leading-none">
          Use <code>{"{user}"}</code> to mention the user and <code>{"{guild}"}</code> to display the server name.
         </p>
        </div>
       </div>
      </div>
      <div className="w-full">
       <span className="flex w-full items-center gap-2 font-bold">
        <Icons.viewing className={iconVariants({ variant: "normal" })} />
        Embed preview:
       </span>
       <Embed color={globalConfig.defaultColor}>
        <EmbedTitle>{(newTitle || defaultMessages.title).replaceAll(/{user}/g, replacedData.user).replaceAll(/{guild}/g, replacedData.guild)}</EmbedTitle>
        <EmbedDescription>
         <p className="prose prose-invert" dangerouslySetInnerHTML={{ __html: toHTML((newDescription?.trim() || defaultMessages.description).replaceAll(/{user}/g, replacedData.user).replaceAll(/{guild}/g, replacedData.guild || "")) }} />
        </EmbedDescription>
        <EmbedImage />
       </Embed>
      </div>
     </div>
    </Block>
    <Button variant="primary" className="mt-4" onClick={() => save(false)} disabled={!messageChannel || loading}>
     {loading ? (
      <>
       <Icons.refresh className={iconVariants({ variant: "button", className: "animate-spin" })} />
       Saving...
      </>
     ) : (
      <>
       <Icons.Check className={iconVariants({ variant: "button" })} />
       Save
      </>
     )}
    </Button>
   </div>
  </>
 );
}
