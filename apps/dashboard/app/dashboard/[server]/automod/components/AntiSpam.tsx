"use client";

import { APIAutoModerationRule, APIGuildChannel, GuildChannelType } from "discord-api-types/v10";
import React, { useState } from "react";
import { toast } from "sonner";
import DeleteMessage from "./DeleteMessage";
import LogChannel from "./LogChannel";
import { Block } from "@/components/ui/Block";
import { Button } from "@/components/ui/Buttons";
import { ChannelsSelect } from "@/components/ui/ChannelsSelect";
import Header, { headerVariants } from "@/components/ui/Headers";
import { Icons, iconVariants } from "@/components/ui/Icons";
import { RolesSelect } from "@/components/ui/RolesSelect";
import { Switch } from "@/components/ui/Switch";
import { Tooltip } from "@/components/ui/Tooltip";
import { cn } from "@/lib/utils";

export interface AntiSpamProps {
 serverId: APIAutoModerationRule["guild_id"];
 enabled: APIAutoModerationRule["enabled"];
 existingActions: APIAutoModerationRule["actions"];
 existingExemptRoles: APIAutoModerationRule["exempt_roles"];
 existingExemptChannels: APIAutoModerationRule["exempt_channels"];
 allRoles: ({
  id: string;
  name: string;
  color: string;
 } | null)[];
 allChannels: APIGuildChannel<GuildChannelType>[] | null[];
}

export const AntiSpam = React.forwardRef<HTMLDivElement, AntiSpamProps>(({ serverId, enabled, existingActions, existingExemptRoles, existingExemptChannels, allRoles, allChannels }, ref) => {
 const [isEnabled, setIsEnabled] = useState(enabled ?? false);
 const [loading, setLoading] = useState(false);
 const [actions, setActions] = useState(existingActions || []);
 const [exemptRoles, setExemptRoles] = useState(existingExemptRoles || []);
 const [exemptChannels, setExemptChannels] = useState(existingExemptChannels || []);

 const save = async (change = true) => {
  setLoading(true);
  if (change) setIsEnabled(!isEnabled);
  const loading = toast.loading(`Turning ${!isEnabled ? "on" : "off"} anti-spam...`);

  const res = await fetch("/api/settings/automod/anti-spam", {
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
   return toast.success(json.message ?? "Anti-spam enabled!", {
    id: loading,
   });
  }

  if (change) setIsEnabled(isEnabled);
  return toast.error(json.error ?? "Something went wrong", {
   id: loading,
  });
 };

 return (
  <div ref={ref}>
   <Header className={cn(headerVariants({ variant: "h2", margin: "normal" }))}>
    <Icons.messageOff className={iconVariants({ variant: "large", className: "!stroke-2" })} />
    Anti-Spam <Switch checked={isEnabled} onChange={save} disabled={loading} />
   </Header>
   <p className="mb-4 text-left">
    <span>Automatically delete all spam messages.</span>
   </p>

   <div
    className={cn(
     {
      "max-h-0 opacity-0": isEnabled,
      "max-h-[500px] opacity-100": !isEnabled,
     },
     "transition-all duration-200 ease-in-out"
    )}
   >
    <div className="my-4 flex flex-row flex-wrap items-start whitespace-nowrap rounded-lg border border-accent-primary bg-accent-primary/10 p-4">
     <span className="mr-1 flex flex-row items-center whitespace-nowrap font-bold">
      <Icons.Info className={iconVariants({ variant: "normal", className: "stroke-accent-primary mr-1" })} />
      Note:
     </span>
     <span className="whitespace-normal">You have to enable this rule to change its settings!</span>
    </div>
   </div>

   <div
    className={cn(
     {
      "pointer-events-none cursor-not-allowed opacity-50": !isEnabled && !loading,
      "pointer-events-none opacity-50": loading,
      "cursor-default opacity-100": isEnabled,
     },
     "relative"
    )}
   >
    {/* <div className={cn({ "pointer-events-none z-10 bg-gradient-to-t from-background-secondary to-90% inset-0 absolute": !isEnabled && !loading })} /> */}
    <Block className="mb-4 !py-3">
     <Header className={cn(headerVariants({ variant: "h3" }))}>
      <Icons.hide className={iconVariants({ variant: "large" })} /> Exempt:
     </Header>
     <span className="mb-4 font-normal">What should be ignored by the rule?</span>
     <div className="flex w-fit flex-row flex-wrap items-center gap-2 text-center font-bold">
      <Tooltip content="Ignore certain roles from triggering the rule.">
       <span className="flex cursor-help items-center gap-2">
        <Icons.Users className={iconVariants({ variant: "normal", className: "stroke-accent-primary" })} />
        Ignore Roles:
       </span>
      </Tooltip>
      <RolesSelect allRoles={allRoles.filter((role) => role !== null)} selectedRoles={exemptRoles} setRoles={setExemptRoles} />
     </div>

     <div className="mt-2 flex w-fit flex-row flex-wrap items-center gap-2 text-center font-bold">
      <Tooltip content="Ignore certain channels from being moderated.">
       <span className="flex cursor-help items-center gap-2">
        <Icons.Hash className={iconVariants({ variant: "normal", className: "stroke-accent-primary" })} />
        Ignore Channels:
       </span>
      </Tooltip>
      <ChannelsSelect allChannels={allChannels.filter((channel) => channel !== null)} selectedChannels={exemptChannels} setChannels={setExemptChannels} />
     </div>

     <p className="mt-2 gap-2 text-sm text-white/70">
      <span className="font-bold">Pssst!</span> Members with Admin or Manage Server permissions are always excluded from automod.
     </p>
    </Block>

    <Icons.MoveVertical className={cn(iconVariants({ variant: "large" }), "mx-6 mb-4 opacity-50")} />

    <Block className="mb-4 !py-3">
     <Header className={cn(headerVariants({ variant: "h3" }))}>
      <Icons.ShieldMinus className={iconVariants({ variant: "large" })} /> Actions:
     </Header>
     <span className="mb-4 font-normal">What should I do when a member triggers the rule?</span>

     <DeleteMessage actions={actions} setActions={setActions} />
     <LogChannel actions={actions} setActions={setActions} allChannels={allChannels} />

     {(!actions || actions.length === 0) && isEnabled && !loading && (
      <div className="my-4 flex flex-row items-start whitespace-nowrap rounded-lg border border-red-400 bg-red-400/10 p-4 text-red-400">
       <span className="mr-1 flex flex-row items-center whitespace-nowrap font-bold">
        <Icons.warning className={iconVariants({ variant: "normal", className: "mr-1 stroke-red-400" })} />
        Warning:
       </span>
       <span className="whitespace-normal">You have to select at least one action!</span>
      </div>
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
  </div>
 );
});
