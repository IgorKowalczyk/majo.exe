"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Switch } from "@/components/client/shared/Switch";
import { Tooltip } from "@/components/client/shared/Tooltip";

export function UpdateCommands({ serverId, commandName, commandEnabled }) {
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
  <Tooltip content={enabled ? "Disable command" : loading ? "Changing status..." : "Enable command"}>
   <span>
    <Switch checked={enabled} disabled={loading} onChange={() => updateCommand()} />
   </span>
  </Tooltip>
 );
}
