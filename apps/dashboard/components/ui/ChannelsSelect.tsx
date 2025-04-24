"use client";

import { Snowflake } from "discord-api-types/globals";
import { APIGuildChannel, GuildChannelType } from "discord-api-types/v10";
import * as React from "react";
import { Button } from "@/components/ui/Buttons";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/Command";
import { Icons, iconVariants } from "@/components/ui/Icons";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover";
import { cn } from "@/lib/utils";

export interface ChannelsSelectProps extends React.ComponentProps<typeof Popover> {
 allChannels: Pick<APIGuildChannel<GuildChannelType>, "id" | "name">[];
 selectedChannels?: Snowflake[];
 setChannels: (value: Snowflake[]) => void;
 multiple?: boolean;
}

export const ChannelsSelect = ({ allChannels, selectedChannels = [], setChannels, multiple = true }: ChannelsSelectProps) => {
 const [open, setOpen] = React.useState(false);

 const handleSelect = (channelId: Snowflake) => {
  console.log("Selected channel ID:", channelId);
  if (multiple) {
   const updatedSelection = selectedChannels.includes(channelId) ? selectedChannels.filter((id) => id !== channelId) : [...selectedChannels, channelId];
   setChannels(updatedSelection);
  } else {
   setChannels([channelId]);
   setOpen(false);
  }
 };

 return (
  <Popover open={open} onOpenChange={setOpen}>
   <PopoverTrigger asChild>
    <Button variant="select" role="combobox" aria-expanded={open} className="max-w-sm justify-between">
     {selectedChannels.length > 0 ? (multiple ? `${allChannels.find((channel) => channel.id === selectedChannels[0])?.name ?? "Unknown channel"}${selectedChannels.length > 1 ? ` + ${selectedChannels.length - 1} more` : ""}` : (allChannels.find((channel) => channel.id === selectedChannels[0])?.name ?? "No channel selected")) : "Select channels..."}
     <Icons.ChevronsUpDown
      className={iconVariants({
       variant: "small",
       className: "text-neutral-400 duration-200 motion-reduce:transition-none",
      })}
     />
    </Button>
   </PopoverTrigger>
   <PopoverContent align="start">
    <Command>
     <CommandInput placeholder="Search channels..." />
     <CommandList>
      <CommandEmpty>No channels available!</CommandEmpty>
      <CommandGroup>
       {allChannels.map((channel) => (
        <CommandItem
         key={channel.id}
         value={channel.id}
         onSelect={() => {
          handleSelect(channel.id);
         }}
        >
         {channel.name}
         <Icons.Check className={cn("ml-auto transition", selectedChannels.includes(channel.id) ? "opacity-100" : "opacity-0")} />
        </CommandItem>
       ))}
      </CommandGroup>
     </CommandList>
    </Command>
   </PopoverContent>
  </Popover>
 );
};
