"use client";

import { Snowflake } from "discord-api-types/globals";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import { Switch } from "@/components/ui/Switch";
import { Tooltip } from "@/components/ui/Tooltip";

export interface UpdateCategoriesProps extends Omit<React.ComponentProps<typeof Tooltip>, "content"> {
  serverId: Snowflake;
  categoryName: string;
  categoryEnabled: boolean;
}

export const UpdateCategories = ({ serverId, categoryName, categoryEnabled, ...props }: UpdateCategoriesProps) => {
  const [enabled, setEnabled] = useState(categoryEnabled);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const updateCategory = async () => {
    setLoading(true);
    const loading = toast.loading(`${!enabled ? "Enabling" : "Disabling"} category ${categoryName}...`);

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

    setLoading(false);

    if (!res.ok) {
      toast.error(`Failed to ${!enabled ? "enable" : "disable"} category ${categoryName}!`, {
        id: loading,
      });
      return router.refresh();
    }

    const json = await res.json();

    if (json.code === 200) {
      setEnabled(!enabled);
      toast.success(`Category ${categoryName} ${!enabled ? "enabled" : "disabled"}!`, {
        id: loading,
      });
      return router.refresh();
    } else {
      toast.error(`Failed to ${!enabled ? "enable" : "disable"} category ${categoryName}!`, {
        id: loading,
      });
      return router.refresh();
    }
  };

  return (
    <Tooltip {...props} content={enabled ? "Disable category" : loading ? "Changing status..." : "Enable category"}>
      <span>
        <Switch checked={enabled} disabled={loading} onCheckedChange={() => updateCategory()} />
      </span>
    </Tooltip>
  );
};
