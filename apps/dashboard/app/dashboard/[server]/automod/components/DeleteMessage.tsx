import React from "react";
import { Switch } from "@/components/ui/Switch";
import { Tooltip } from "@/components/ui/Tooltip";
import { Icons, iconVariants } from "@/components/ui/Icons";
import { AutoModerationActionType } from "discord-api-types/v10";

interface DeleteMessageProps {
 actions: any[];
 setActions: (actions: any[]) => void;
}

const DeleteMessage: React.FC<DeleteMessageProps> = ({ actions, setActions }) => {
 const setDelete = () => {
  const deleteActionType = AutoModerationActionType.BlockMessage;

  const updatedActions = actions.some((action) => action.type === deleteActionType) ? actions.filter((action) => action.type !== deleteActionType) : [...actions, { type: deleteActionType, metadata: { custom_message: "Message blocked due to containing an invite link. Rule added by Majo.exe" } }];

  setActions(updatedActions);
 };

 return (
  <div className="my-2 flex flex-row flex-wrap gap-2">
   <Tooltip content="Delete the message that triggered the rule.">
    <span className="flex w-fit cursor-help items-center gap-2 font-bold">
     <Icons.Trash className={iconVariants({ variant: "normal", className: "stroke-red-400" })} />
     Delete message:
    </span>
   </Tooltip>
   <Switch checked={actions.some((action) => action.type === AutoModerationActionType.BlockMessage)} onChange={setDelete} />
  </div>
 );
};

export default DeleteMessage;
