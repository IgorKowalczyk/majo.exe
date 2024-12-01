"use client";

import { Snowflake } from "discord-api-types/globals";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import { Switch } from "@/components/ui/Switch";
import { Tooltip } from "@/components/ui/Tooltip";

export interface UpdateCommandsProps extends React.HTMLAttributes<HTMLDivElement> {
 serverId: Snowflake;
 commandName: string;
 commandEnabled: boolean;
}

export const UpdateCommands = React.forwardRef<HTMLDivElement, UpdateCommandsProps>(({ serverId, commandName, commandEnabled, ...props }, ref) => {
 const [enabled, setEnabled] = useState(commandEnabled);
 const [loading, setLoading] = useState(false);
 const router = useRouter();

 const updateCommand = async () => {
  setLoading(true);
  const loading = toast.loading(`${!enabled ? "Enabling" : "Disabling"} command ${commandName}...`);

  const res = await fetch("/api/settings/commands", {
   method: "POST",
   headers: {
    "Content-Type": "application/json",
   },
   body: JSON.stringify({
    id: serverId,
    name: commandName,
    enabled: !enabled,
   }),
  });

  setLoading(false);

  if (!res.ok) {
   toast.error(`Failed to ${!enabled ? "enable" : "disable"} /${commandName}!`, {
    id: loading,
   });
   return router.refresh();
  }

  const json = await res.json();

  if (json.code === 200) {
   setEnabled(!enabled);
   toast.success(`Command /${commandName} ${!enabled ? "enabled" : "disabled"}!`, {
    id: loading,
   });
   return router.refresh();
  } else {
   toast.error(`Failed to ${!enabled ? "enable" : "disable"} /${commandName}!`, {
    id: loading,
   });
   return router.refresh();
  }
 };

 return (
  <Tooltip content={enabled ? "Disable command" : loading ? "Changing status..." : "Enable command"} ref={ref} {...props}>
   <Switch checked={enabled} disabled={loading} onChange={() => updateCommand()} />
  </Tooltip>
 );
});
