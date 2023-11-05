"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Switch from "../shared/Switch";
import { Tooltip } from "../shared/Tooltip";

export function UpdateCategories({ serverId, categoryName, categoryEnabled }) {
 const [enabled, setEnabled] = useState(categoryEnabled);
 const [loading, setLoading] = useState(false);
 const router = useRouter();

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
  <Tooltip content={enabled ? "Disable category" : loading ? "Changing status..." : "Enable category"}>
   <span>
    <Switch enabled={enabled} disabled={loading} onChange={() => updateCategory()} />
   </span>
  </Tooltip>
 );
}
