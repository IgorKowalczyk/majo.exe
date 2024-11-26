"use client";

import { Icons, iconVariants } from "@/components/Icons";
import { ListBox, ListBoxArrow, ListBoxButton, ListBoxOptions, ListBoxOption } from "./ListBox";
import { Snowflake } from "discord-api-types/globals";
import React from "react";

export interface ChannelsSelectProps extends React.ComponentProps<typeof ListBox> {
 allChannels: { id: Snowflake; name: string }[];
 exemptChannels: Snowflake[];
 setExemptChannels: (value: Snowflake | Snowflake[]) => void;
 multiple?: boolean;
}

export const ChannelsSelect = React.forwardRef<React.ElementRef<typeof ListBox>, ChannelsSelectProps>(({ className, allChannels, exemptChannels, setExemptChannels, multiple = true, ...props }, ref) => (
 <>
  {allChannels && allChannels.length > 0 ? (
   <ListBox value={exemptChannels} onChange={(value: Snowflake | Snowflake[]) => setExemptChannels(value)} multiple={multiple}>
    <ListBoxButton>
     <span className="flex items-center gap-2 truncate">
      {multiple ? (
       <>
        {exemptChannels.length > 0 && allChannels.find((channel) => channel?.id === exemptChannels[0]) ? (
         <>
          {allChannels.find((channel) => channel?.id === exemptChannels[0])?.name ?? "Unknown channel"} {exemptChannels.length - 1 > 0 ? `+ ${exemptChannels.length - 1} more` : ""}
         </>
        ) : (
         "No channels selected"
        )}
       </>
      ) : (
       <>{typeof exemptChannels === "string" && allChannels.find((channel) => channel?.id === exemptChannels) ? <>{allChannels.find((channel) => channel?.id === exemptChannels)?.name}</> : "No channel selected"}</>
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
));
