"use client";

import { Snowflake } from "discord-api-types/globals";
import { botConfig } from "@majoexe/config";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Switch } from "@/components/ui/Switch";
import { Tooltip } from "@/components/ui/Tooltip";
import { GuildLogType, GuildLogsSettings } from "@majoexe/database";
import Header, { headerVariants } from "@/components/ui/Headers";
import { Block } from "@/components/ui/Block";
import { Icons, iconVariants } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";
import { capitalize, splitCamelCase } from "@majoexe/util/functions/util";
import { ChannelsSelect } from "@/components/ui/ChannelsSelect";
import { Button } from "@/components/ui/Buttons";
import { useRouter } from "next/navigation";
import { useNavigationGuard } from "next-navigation-guard";

export function handleLogText(log: GuildLogType) {
 let transformedLog = splitCamelCase(log).toLowerCase();
 if (transformedLog.startsWith("guild")) transformedLog = transformedLog.slice(6);

 return capitalize(transformedLog);
}

type UpdateLog = Pick<GuildLogsSettings, "type" | "enabled" | "channelId">;

export interface UpdateLogsProps extends React.HTMLAttributes<HTMLDivElement> {
 serverId: Snowflake;
 allChannels: { id: Snowflake; name: string }[] | [];
 logs: UpdateLog[];
 allowedLogs: GuildLogType[];
}

export const UpdateLogs = React.forwardRef<HTMLDivElement, UpdateLogsProps>(({ serverId, allChannels, logs, allowedLogs }, ref) => {
 const initialLogStates = allowedLogs.map((logType: GuildLogType) => ({ type: logType, enabled: false, channelId: null as Snowflake | null }));
 const [unsavedChanges, setUnsavedChanges] = useState(false);
 const [logStates, setLogStates] = useState(logs.length > 0 ? logs : initialLogStates);
 const [changedLogStates, setChangedLogStates] = useState<UpdateLog[]>([]);
 const [loading, setLoading] = useState(false);
 const [resetKey, setResetKey] = useState(0);
 const router = useRouter();

 useNavigationGuard({ enabled: unsavedChanges, confirm: () => window.confirm("You have unsaved changes. Are you sure you want to leave?") });

 useEffect(() => {
  const hasUnsavedChanges = changedLogStates.length > 0;
  setUnsavedChanges(hasUnsavedChanges);
 }, [changedLogStates]);

 useEffect(() => {
  if (!unsavedChanges) {
   router.refresh();
  }
 }, [unsavedChanges]);

 const handleSaveAll = async () => {
  setLoading(true);
  const failedLogs: UpdateLog[] = [];

  const res = await fetch("/api/settings/update-logs", {
   method: "POST",
   headers: {
    "Content-Type": "application/json",
   },
   body: JSON.stringify({
    id: serverId,
    logs: changedLogStates,
   }),
  });

  if (!res.ok) {
   setChangedLogStates(changedLogStates);
   setLoading(false);
   toast.error("Some changes failed to save. Please try again.");
   setUnsavedChanges(true);
   return;
  }

  const json = await res.json();

  if (json.code === 200) {
   for (const log of changedLogStates) {
    const logIndex = logStates.findIndex((state) => state.type === log.type);
    if (logIndex !== -1) {
     logStates[logIndex] = { ...log };
    }
   }
   setChangedLogStates([]);
   setLogStates([...logStates]);
   setLoading(false);
   setUnsavedChanges(false);
   toast.success("All changes saved!");
  } else {
   setChangedLogStates(changedLogStates);
   setLoading(false);
   toast.error("Some changes failed to save. Please try again.");
   setUnsavedChanges(true);
  }
 };

 const handleDiscardAll = () => {
  setChangedLogStates([]);
  setLogStates(logs.length > 0 ? logs : initialLogStates);
  setUnsavedChanges(false);
  setResetKey((prevKey) => prevKey + 1); // Force re-render of UpdateLog components to reset their state
 };

 const updateLog = async (logType: UpdateLog["type"], enabled: UpdateLog["enabled"], channelId: UpdateLog["channelId"]) => {
  const res = await fetch("/api/settings/update-logs", {
   method: "POST",
   headers: {
    "Content-Type": "application/json",
   },
   body: JSON.stringify({
    id: serverId,
    type: logType,
    enabled,
    channelId,
   }),
  });

  if (!res.ok) return false;
  const json = await res.json();

  if (json.code === 200) return true;
  return false;
 };

 return (
  <>
   <div
    className={cn(
     {
      "opacity-0 translate-y-4 scale-95": !unsavedChanges,
      "opacity-100 translate-y-0 scale-100": unsavedChanges,
     },
     "md:ml-72 md:mr-6 fixed bottom-6 z-50 duration-200 ease-in-out left-0 right-0 origin-bottom"
    )}
   >
    <div className="mx-auto w-full max-w-3xl rounded-2xl shadow-2xl flex items-center border justify-between border-neutral-800 bg-background-secondary p-3">
     <span className="flex items-center gap-2 font-bold">
      <Icons.TriangleAlert className="size-6 ml-2 text-red-400" />
      Caution - You have unsaved changes
     </span>
     <div className="flex gap-4">
      <Button variant="secondary" onClick={handleDiscardAll} className="gap-2" disabled={loading}>
       <Icons.Trash className={iconVariants({ variant: "normal" })} />
       Reset
      </Button>
      <Button variant="primary" onClick={handleSaveAll} className="gap-2" disabled={loading}>
       {loading ? (
        <>
         <Icons.refresh className={iconVariants({ variant: "normal", className: "animate-spin" })} /> Saving changes...
        </>
       ) : (
        <>
         <Icons.Check className={iconVariants({ variant: "normal" })} />
         Save changes
        </>
       )}
      </Button>
     </div>
    </div>
   </div>

   {botConfig.emojis.logs.map((category) => (
    <div key={category.category}>
     <Header className={cn(headerVariants({ variant: "h2" }), "mt-6 mb-2")}>{category.category}</Header>
     <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8">
      {category.types
       .filter((logType) => allowedLogs.includes(logType.type as GuildLogType))
       .map((logType) => {
        const log = logStates.find((log) => log.type === logType.type) || { type: logType.type, enabled: false, channelId: null };
        return (
         <UpdateLog
          key={`${log.type}-${resetKey}`} // Key is resetKey to force re-render when reset
          serverId={serverId}
          logType={log.type as GuildLogType}
          logEnabled={log.enabled}
          exisingChannel={log.channelId}
          allChannels={allChannels}
          onChange={(enabled, channelId) => {
           const initialLog = logs.find((l) => l.type === logType.type) || { type: logType.type, enabled: false, channelId: null };
           const newLogStates = logStates.map((log) => (log.type === logType.type ? { ...log, enabled, channelId } : log));
           const newChangedLogStates = changedLogStates.filter((log) => log.type !== logType.type);

           if (initialLog.enabled !== enabled || initialLog.channelId !== channelId) {
            const changedLog = { type: logType.type, enabled, channelId } as UpdateLog;
            newChangedLogStates.push(changedLog);
           }

           setChangedLogStates(newChangedLogStates);
           setLogStates(newLogStates);
          }}
          disabled={loading}
         />
        );
       })}
     </div>
    </div>
   ))}
  </>
 );
});

export interface UpdateLogProps {
 serverId: Snowflake;
 logType: GuildLogType;
 logEnabled: boolean;
 exisingChannel: Snowflake | null;
 allChannels: { id: Snowflake; name: string }[];
 onChange: (enabled: boolean, channelId: Snowflake | null) => void;
 disabled: boolean;
}

export const UpdateLog = React.forwardRef<HTMLDivElement, UpdateLogProps>(({ serverId, allChannels, exisingChannel, logType, logEnabled, onChange, disabled, ...props }, ref) => {
 const [enabled, setEnabled] = useState(logEnabled);
 const [messageChannel, setMessageChannel] = useState<Snowflake | null>(exisingChannel);

 useEffect(() => {
  onChange(enabled, messageChannel);
 }, [enabled, messageChannel]);

 return (
  <Block key={logType} {...props}>
   <div className="mb-1 flex items-center gap-4">
    <Header className={cn(headerVariants({ variant: "h3" }))}>
     {botConfig.emojis.logs.flatMap((category) => category.types).find((log) => log.type === logType)?.emoji || "❔"} {handleLogText(logType)}
    </Header>
   </div>
   <p className="mb-2">{botConfig.emojis.logs.flatMap((category) => category.types).find((log) => log.type === logType)?.description || `Enable or disable the ${handleLogText(logType).toLowerCase()} event logging.`}</p>
   <hr className="my-4 border-neutral-800" />
   <div className="my-4 flex flex-row flex-wrap gap-2">
    <Tooltip content={`${enabled ? "Disable" : "Enable"} ${handleLogText(logType).toLowerCase()} event logging.`}>
     <span className="flex w-fit cursor-help items-center gap-2 font-bold">
      <Icons.Check className={iconVariants({ variant: "normal" })} />
      Enabled:
     </span>
    </Tooltip>
    <Switch checked={enabled} onChange={() => setEnabled(!enabled)} disabled={disabled} />
   </div>
   <div className="flex items-end gap-4 justify-between">
    <div>
     <span className="flex items-center gap-2 font-bold">
      <Icons.Hash className={iconVariants({ variant: "normal" })} />
      Channel:
     </span>
     <p className="text-neutral-500 mb-2 text-sm">Select the channel where the logs will be sent.</p>
     <ChannelsSelect allChannels={allChannels} selectedChannels={messageChannel ? [messageChannel] : []} setChannels={(channel) => setMessageChannel(channel as Snowflake | null)} disabled={disabled} multiple={false} />
    </div>
   </div>

   <div
    className={cn("mt-4 flex flex-row flex-wrap items-center whitespace-nowrap rounded-lg duration-200 border border-red-400 bg-red-400/10", {
     "max-h-0 opacity-0 p-0": !(enabled && !messageChannel),
     "max-h-[500px] opacity-100 p-4": enabled && !messageChannel,
    })}
   >
    <Icons.Info className={iconVariants({ variant: "normal", className: "stroke-red-400 mr-1" })} />
    <span className="whitespace-normal">Please select a channel to enable logging.</span>
   </div>
  </Block>
 );
});
