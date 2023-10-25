"use client";

import { useState } from "react";
import Switch from "./Switch";
import { Tooltip } from "./Tooltip";

export function UpdateCategories({ serverId, categoryName, categoryEnabled }) {
 const [enabled, setEnabled] = useState(categoryEnabled);
 const [loading, setLoading] = useState(false);

 const updateCategory = async () => {
  setLoading(true);
  const res = await fetch("/api/settings/categories", {
   method: "POST",
   headers: {
    "Content-Type": "application/json",
   },
   body: JSON.stringify({
    id: serverId,
    name: categoryName,
    enabled: !enabled,
   }),
  });
  if (!res.ok) {
   return setLoading(false);
  }
  const json = await res.json();
  if (json.code === 200) {
   setEnabled(!enabled);
   return setLoading(false);
  } else {
   return setLoading(false);
  }
 };

 return (
  <Tooltip content={enabled ? "Disable category" : loading ? "Changing status..." : "Enable category"}>
   <span>
    <Switch enabled={enabled} disabled={loading} onChange={() => updateCategory()} />
   </span>
  </Tooltip>
 );
}
