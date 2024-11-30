import React from "react";
import { ChannelsSelect } from "@/components/ui/ChannelsSelect";
import { Tooltip } from "@/components/ui/Tooltip";
import { Icons, iconVariants } from "@/components/ui/Icons";
import { AutoModerationActionType } from "discord-api-types/v10";
import { Skeleton } from "@/components/ui/Skeletons";

interface LogChannelProps {
 actions: any[];
 setActions: (actions: any[]) => void;
 allChannels: any[];
}

const LogChannel: React.FC<LogChannelProps> = ({ actions, setActions, allChannels }) => {
 const setChannels = (value: string) => {
  const alertActionType = AutoModerationActionType.SendAlertMessage;

  const updatedActions = actions.some((action) => action.type === alertActionType) ? actions.map((action) => (action.type === alertActionType ? { ...action, metadata: { channel_id: value } } : action)) : [...actions, { type: alertActionType, metadata: { channel_id: value } }];

  setActions(updatedActions);
 };

 return (
  <div className="my-2 flex flex-row flex-wrap gap-2">
   <Tooltip content="Send a message to selected channel when a member triggers the rule.">
    <span className="flex w-fit cursor-help items-center gap-2 font-bold">
     <Icons.messageWarning className={iconVariants({ variant: "normal", className: "stroke-red-400" })} />
     Log to channel:
    </span>
   </Tooltip>
   <ChannelsSelect allChannels={[{ id: "1", name: "Disabled" }, ...allChannels.filter((channel) => channel !== null)]} selectedChannels={[actions.find((action) => action.type === AutoModerationActionType.SendAlertMessage)?.metadata?.channel_id || "1"]} setChannels={setChannels} multiple={false} />
  </div>
 );
};

export default LogChannel;

export const LogToChannelLoader = () => {
 return (
  <div className="my-2 flex flex-row flex-wrap gap-2">
   <span className="flex w-fit items-center gap-2 font-bold">
    <Icons.messageWarning className={iconVariants({ variant: "normal", className: "stroke-red-400" })} />
    Log to channel:
   </span>
   <Skeleton className="h-[37.6px] w-40" />
  </div>
 );
};
