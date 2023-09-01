"use client";

import { useEffect, useState } from "react";
import Switch from "./Switch";

export function EnablePublicDashboard({ enabled, serverId }) {
 console.log(enabled);
 const [isEnabled, setIsEnabled] = useState(enabled);
 const [disabled, setDisabled] = useState(false);

 useEffect(() => {
  setIsEnabled(enabled);
 }, [enabled]);

 const toggle = async () => {
  setDisabled(true);
  setIsEnabled(!isEnabled);
  const res = await fetch("/api/settings/public-dashboard", {
   method: "POST",
   headers: {
    "Content-Type": "application/json",
   },
   body: JSON.stringify({
    id: serverId,
    enabled: !isEnabled,
   }),
  });

  if (!res.ok) {
   setDisabled(false);
   setIsEnabled(isEnabled);
  }

  const json = await res.json();

  if (json.code === 200) {
   setDisabled(false);
  } else {
   setDisabled(false);
   setIsEnabled(isEnabled);
  }
 };

 return <Switch enabled={isEnabled} onChange={toggle} disabled={disabled} />;
}
