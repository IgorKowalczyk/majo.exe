"use client";

import { useState } from "react";
import Switch from "./Switch";

export function EnablePublicDashboard({ enabled, serverId }) {
 const [isEnabled, setIsEnabled] = useState(enabled);
 const [disabled, setDisabled] = useState(false);

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
   setIsEnabled(isEnabled);
   setDisabled(false);
  }
  const json = await res.json();

  if (json.status === 200) {
   setDisabled(false);
  } else {
   setIsEnabled(isEnabled);
   setDisabled(false);
  }
 };

 return <Switch enabled={isEnabled} onChange={toggle} disabled={disabled} />;
}
