"use client";

import clsx from "clsx";
import { useState } from "react";
import { toast } from "sonner";
import { Block } from "@/components/Block";
import { Button } from "@/components/Buttons";
import { ChannelsSelect } from "@/components/client/shared/ChannelsSelect";
import { RolesSelect } from "@/components/client/shared/RolesSelect";
import Switch from "@/components/client/shared/Switch";
import { TimeSelect } from "@/components/client/shared/TimeSelect";
import { Tooltip } from "@/components/client/shared/Tooltip";
import { Header2, Header3 } from "@/components/Headers";
import { Icons, iconVariants } from "@/components/Icons";

export function AntiLink({ serverId, enabled, existingActions, existingExemptRoles, existingExemptChannels, allRoles, allChannels }) {
 const [isEnabled, setIsEnabled] = useState(enabled ?? false);
 const [loading, setLoading] = useState(false);
 const [actions, setActions] = useState(existingActions || []);
 const [exemptRoles, setExemptRoles] = useState(existingExemptRoles || []);
 const [exemptChannels, setExemptChannels] = useState(existingExemptChannels || []);

 const save = async (change = true) => {
  setLoading(true);
  if (change) setIsEnabled(!isEnabled);
  const loading = toast.loading(`Turning ${!isEnabled ? "on" : "off"} anti-link...`);

  const res = await fetch("/api/settings/automod/anti-link", {
   method: "POST",
   headers: {
    "Content-Type": "application/json",
   },
   body: JSON.stringify({
    id: serverId,
    enabled: change ? !isEnabled : isEnabled,
    actions,
    exemptRoles,
    exemptChannels,
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
   return toast.success(json.message ?? "Anti-link enabled!", {
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
    <Icons.unlink className={iconVariants({ variant: "large", className: "!stroke-2" })} />
    Anti-Link <Switch enabled={isEnabled} onChange={save} disabled={loading} />
   </Header2>
   <p className="mb-4 text-left">
    <span>Automatically delete all messages containing links.</span>
   </p>

   <div
    className={clsx(
     {
      "max-h-0 opacity-0": isEnabled,
      "max-h-[500px] opacity-100": !isEnabled,
     },
     "transition-all duration-200 ease-in-out"
    )}
   >
    <div className="my-4 flex flex-row flex-wrap items-start whitespace-nowrap rounded-md border border-accent-primary bg-accent-primary/10 p-4">
     <span className="mr-1 flex flex-row items-center whitespace-nowrap font-bold">
      <Icons.Info className={iconVariants({ variant: "normal", className: "stroke-accent-primary mr-1" })} />
      Note:
     </span>
     <span className="whitespace-normal">You have to enable this rule to change its settings!</span>
    </div>
   </div>

   <div
    className={clsx({
     "pointer-events-none cursor-not-allowed opacity-50": !isEnabled && !loading,
     "pointer-events-none opacity-50": loading,
     "cursor-default opacity-100": isEnabled,
    })}
   >
    <Block className="mb-4 !py-3">
     <Header3>
      <Icons.hide className={iconVariants({ variant: "large" })} /> Exempt:
     </Header3>
     <span className="mb-4 font-normal">What should be ignored by the rule?</span>
     <div className="flex w-fit flex-row flex-wrap items-center gap-2 text-center font-bold">
      <Tooltip content="Ignore certain roles from triggering the rule.">
       <span className="flex cursor-help items-center gap-2">
        <Icons.Users className={iconVariants({ variant: "normal", className: "stroke-accent-primary" })} />
        Ignore Roles:
       </span>
      </Tooltip>
      <RolesSelect // prettier
       allRoles={allRoles}
       exemptRoles={exemptRoles}
       setExemptRoles={setExemptRoles}
      />
     </div>

     <div className="mt-2 flex w-fit flex-row flex-wrap items-center gap-2 text-center font-bold">
      <Tooltip content="Ignore certain channels from being moderated.">
       <span className="flex cursor-help items-center gap-2">
        <Icons.Hash className={iconVariants({ variant: "normal", className: "stroke-accent-primary" })} />
        Ignore Channels:
       </span>
      </Tooltip>
      <ChannelsSelect // prettier
       allChannels={allChannels}
       exemptChannels={exemptChannels}
       setExemptChannels={setExemptChannels}
      />
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
      <Tooltip content="Delete the message that triggered the rule.">
       <span className="flex w-fit cursor-help items-center gap-2 font-bold">
        <Icons.Trash className={iconVariants({ variant: "normal", className: "stroke-red-400" })} />
        Delete message:
       </span>
      </Tooltip>
      <Switch // prettier
       enabled={actions.some((action) => action.type === 1)}
       onChange={() => setActions(actions.some((action) => action.type === 1) ? actions.filter((action) => action.type !== 1) : [...actions, { type: 1, metadata: { custom_message: "Message blocked due to containing an invite link. Rule added by Majo.exe" } }])}
      />
     </div>

     <div className="my-2 flex flex-row flex-wrap gap-2">
      <Tooltip content="Timeout the member that triggered the rule.">
       <span className="flex w-fit cursor-help items-center gap-2 font-bold">
        <Icons.Timer className={iconVariants({ variant: "normal", className: "stroke-red-400" })} />
        Timeout member:
       </span>
      </Tooltip>
      <TimeSelect // prettier
       selectedChoice={actions.find((action) => action.type === 3)?.metadata?.duration_seconds || 0}
       setSelectedChoice={(value) => setActions(actions.some((action) => action.type === 3) ? actions.map((action) => (action.type === 3 ? { ...action, metadata: { duration_seconds: value } } : action)) : [...actions, { type: 3, metadata: { duration_seconds: value } }])}
      />
     </div>

     <div className="my-2 flex flex-row flex-wrap gap-2">
      <Tooltip content="Send a message to selected channel when a member triggers the rule.">
       <span className="flex w-fit cursor-help items-center gap-2 font-bold">
        <Icons.messageWarning className={iconVariants({ variant: "normal", className: "stroke-red-400" })} />
        Log to channel:
       </span>
      </Tooltip>
      <ChannelsSelect // prettier
       allChannels={[{ id: "1", name: "Disabled", type: 0 }, ...allChannels]}
       exemptChannels={actions.find((action) => action.type === 2)?.metadata?.channel_id || "1"}
       setExemptChannels={(value) => setActions(actions.some((action) => action.type === 2) ? actions.map((action) => (action.type === 2 ? { ...action, metadata: { channel_id: value } } : action)) : [...actions, { type: 2, metadata: { channel_id: value } }])}
       multiple={false}
      />
     </div>

     {(!actions || actions.length === 0) && isEnabled && !loading && (
      <>
       <div className="my-4 flex flex-row items-start whitespace-nowrap rounded-md border border-red-400 bg-red-400/10 p-4 text-red-400">
        <span className="mr-1 flex flex-row items-center whitespace-nowrap font-bold">
         <Icons.warning className={iconVariants({ variant: "normal", className: "mr-1 stroke-red-400" })} />
         Warning:
        </span>
        <span className="whitespace-normal">You have to select at least one action!</span>
       </div>
      </>
     )}
    </Block>

    <Button variant="primary" className="mt-4" onClick={() => save(false)} disabled={!isEnabled || loading || !actions || actions.length === 0}>
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
