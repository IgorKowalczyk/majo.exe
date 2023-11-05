"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Switch from "../shared/Switch";
import { Tooltip } from "../shared/Tooltip";

export function UpdateCommands({ serverId, commandName, commandEnabled }) {
 const [enabled, setEnabled] = useState(commandEnabled);
 const [loading, setLoading] = useState(false);
 const router = useRouter();

 const updateCommand = async () => {
  setLoading(true);
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
  if (!res.ok) {
   setLoading(false);
   return router.refresh();
  }
  const json = await res.json();

  if (json.code === 200) {
   setEnabled(!enabled);
   setLoading(false);
   return router.refresh();
  } else {
   setLoading(false);
   return router.refresh();
  }
 };

 return (
  <Tooltip content={enabled ? "Disable command" : loading ? "Changing status..." : "Enable command"}>
   <span>
    <Switch enabled={enabled} disabled={loading} onChange={() => updateCommand()} />
   </span>
  </Tooltip>
 );
}
