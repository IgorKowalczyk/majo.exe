"use client";

import React from "react";
import { Icons, iconVariants } from "@/components/ui/Icons";
import { Snowflake } from "discord-api-types/globals";
import { ListBox, ListBoxArrow, ListBoxButton, ListBoxOption, ListBoxOptions } from "@/components/ui/ListBox";

export interface ChannelsSelectProps extends React.ComponentProps<typeof ListBox> {
 setRoles: React.ComponentProps<typeof ListBox>["onChange"];
 allRoles: { id: Snowflake; name: string; color: string }[];
 selectedRoles?: Snowflake[];
}

export const RolesSelect = React.forwardRef<React.ElementRef<typeof ListBox>, ChannelsSelectProps>(({ allRoles, selectedRoles, setRoles, ...props }, ref) => {
 return (
  <>
   {allRoles && allRoles.length > 0 ? (
    <ListBox value={selectedRoles} onChange={(value) => setRoles && setRoles(value)} multiple={true} ref={ref} {...props}>
     <ListBoxButton>
      <span className="flex items-center gap-2 truncate">
       {selectedRoles && selectedRoles.length > 0 && allRoles.find((role) => role.id === selectedRoles[0]) ? (
        <>
         <div className="size-3 rounded-full" style={{ backgroundColor: allRoles.find((role) => role.id === selectedRoles[0])?.color || "#FFFFFF" }} />
         {allRoles.find((role) => role.id === selectedRoles[0])?.name || "Unknown role"} {selectedRoles.length - 1 > 0 ? `+ ${selectedRoles.length - 1} more` : ""}
        </>
       ) : (
        "No roles selected"
       )}
      </span>
      <ListBoxArrow />
     </ListBoxButton>
     <ListBoxOptions>
      {allRoles.map((role) => (
       <ListBoxOption key={`role-select-option-${role.id}`} value={role.id}>
        <div className="flex items-center gap-1 truncate">
         <div className="size-3 rounded-full" style={{ backgroundColor: role.color || "#FFFFFF" }} />
         {role.name}
        </div>
       </ListBoxOption>
      ))}
     </ListBoxOptions>
    </ListBox>
   ) : (
    <div className="mt-2 flex flex-row flex-wrap items-center gap-2 text-center font-bold">
     Ignore Roles:
     <div className="flex items-center justify-center gap-2 font-normal text-red-400">
      <Icons.warning className={iconVariants({ variant: "normal" })} />
      <span className="text-sm">No roles on this server</span>
     </div>
    </div>
   )}
  </>
 );
});
