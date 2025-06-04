import { AutoModerationActionType, type APIAutoModerationAction } from "discord-api-types/v10";
import { TimerIcon } from "lucide-react";
import React from "react";
import { iconVariants } from "@/components/ui/Icons";
import { Skeleton } from "@/components/ui/Skeletons";
import { TimeSelect } from "@/components/ui/TimeSelect";
import { Tooltip } from "@/components/ui/Tooltip";

interface TimeoutMemberProps {
 actions: APIAutoModerationAction[];
 setActions: (actions: APIAutoModerationAction[]) => void;
}

const TimeoutMember: React.FC<TimeoutMemberProps> = ({ actions, setActions }) => {
 const setTime = (value: number) => {
  const timeoutActionType = AutoModerationActionType.Timeout;

  const updatedActions = actions.some((action) => action.type === timeoutActionType) ? actions.map((action) => (action.type === timeoutActionType ? { ...action, metadata: { duration_seconds: value } } : action)) : [...actions, { type: timeoutActionType, metadata: { duration_seconds: value } }];

  setActions(updatedActions);
 };

 return (
  <div className="my-2 flex flex-row flex-wrap gap-2">
   <Tooltip content="Timeout the member that triggered the rule.">
    <span className="flex w-fit cursor-help items-center gap-2 font-bold">
     <TimerIcon className={iconVariants({ variant: "normal", className: "stroke-red-400" })} />
     Timeout member:
    </span>
   </Tooltip>
   <TimeSelect selectedChoice={actions.find((action) => action.type === AutoModerationActionType.Timeout)?.metadata?.duration_seconds || 0} setSelectedChoice={setTime} />
  </div>
 );
};

export default TimeoutMember;

export const TimeoutMemberLoader = () => {
 return (
  <div className="my-2 flex flex-row flex-wrap gap-2">
   <span className="flex w-fit items-center gap-2 font-bold">
    <TimerIcon className={iconVariants({ variant: "normal", className: "stroke-red-400" })} />
    Timeout member:
   </span>
   <Skeleton className="h-[37.6px] w-40" />
  </div>
 );
};
