"use client";

import { Icons, iconVariants } from "@/components/Icons";
import { ListBox, ListBoxArrow, ListBoxButton, ListBoxOptions, ListBoxOption } from "./ListBox";
import { Snowflake } from "discord-api-types/globals";
import React from "react";

export interface ChannelsSelectProps extends React.ComponentProps<typeof ListBox> {
 setChannels: React.ComponentProps<typeof ListBox>["onChange"];
 allChannels: { id: Snowflake; name: string }[];
 selectedChannels?: Snowflake[];
 multiple?: boolean;
}

export const ChannelsSelect = React.forwardRef<React.ElementRef<typeof ListBox>, ChannelsSelectProps>(({ className, allChannels, selectedChannels, setChannels, multiple = true, ...props }, ref) => {
 return (
  <>
   {allChannels && allChannels.length > 0 ? (
    <ListBox value={selectedChannels} onChange={(value) => setChannels && setChannels(value)} multiple={multiple} ref={ref} {...props}>
     <ListBoxButton>
      <span className="flex items-center gap-2 truncate">
       {multiple ? (
        <>
         {allChannels && selectedChannels && selectedChannels.length > 0 ? (
          <>
           {(selectedChannels && allChannels.find((channel) => channel?.id === selectedChannels[0])?.name) ?? "Unknown channel"} {selectedChannels && selectedChannels.length - 1 > 0 ? `+ ${selectedChannels.length - 1} more` : ""}
          </>
         ) : (
          "No channels selected"
         )}
        </>
       ) : selectedChannels && selectedChannels.length > 0 ? (
        <>{allChannels.find((channel) => channel.id === selectedChannels[0]) ? <>{allChannels.find((channel) => channel.id === selectedChannels[0])?.name}</> : "No channel selected"}</>
       ) : (
        "No channel selected"
       )}
      </span>
      <ListBoxArrow />
     </ListBoxButton>
     <ListBoxOptions>
      {allChannels.map((channel) => (
       <ListBoxOption key={`option-${channel.id}`} value={channel.id}>
        <div className="flex items-center gap-1 truncate">{channel.name}</div>
        <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-white duration-200 ui-selected:!opacity-100 ui-not-selected:opacity-0 ui-active:opacity-100 ui-not-active:opacity-0">
         <Icons.Check className={iconVariants({ variant: "normal" })} />
        </span>
       </ListBoxOption>
      ))}
     </ListBoxOptions>
    </ListBox>
   ) : (
    <div className="flex items-center justify-center gap-2 font-normal text-red-400">
     <Icons.warning className={iconVariants({ variant: "normal" })} />
     <span className="text-sm">No channels on this server!</span>
    </div>
   )}
  </>
 );
});
