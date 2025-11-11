import { AutoModerationActionType, APIAutoModerationAction } from "discord-api-types/v10";
import { TrashIcon } from "lucide-react";
import React from "react";
import { iconVariants } from "@/components/ui/Icons";
import { Skeleton } from "@/components/ui/Skeletons";
import { Switch } from "@/components/ui/Switch";
import { Tooltip } from "@/components/ui/Tooltip";

interface DeleteMessageProps {
  actions: APIAutoModerationAction[];
  setActions: (actions: APIAutoModerationAction[]) => void;
}

const DeleteMessage = ({ actions, setActions }: DeleteMessageProps) => {
  const setDelete = () => {
    const deleteActionType = AutoModerationActionType.BlockMessage;

    const updatedActions = actions.some((action) => action.type === deleteActionType)
      ? actions.filter((action) => action.type !== deleteActionType)
      : [...actions, { type: deleteActionType, metadata: { custom_message: "Message blocked due to containing an invite link. Rule added by Majo.exe" } }];

    setActions(updatedActions);
  };

  return (
    <div className="my-2 flex flex-row flex-wrap gap-2">
      <Tooltip content="Delete the message that triggered the rule.">
        <span className="flex w-fit cursor-help items-center gap-2 font-bold">
          <TrashIcon className={iconVariants({ variant: "normal", className: "stroke-red-400" })} />
          Delete message:
        </span>
      </Tooltip>
      <Switch checked={actions.some((action) => action.type === AutoModerationActionType.BlockMessage)} onCheckedChange={setDelete} />
    </div>
  );
};

export default DeleteMessage;

export const DeleteMessageLoader = () => {
  return (
    <div className="my-2 flex flex-row flex-wrap gap-2">
      <span className="flex w-fit items-center gap-2 font-bold">
        <TrashIcon className={iconVariants({ variant: "normal", className: "stroke-red-400" })} />
        Delete message:
      </span>
      <Skeleton className="h-[30px] w-12" />
    </div>
  );
};
