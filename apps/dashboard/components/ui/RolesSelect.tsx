"use client";

import { Snowflake } from "discord-api-types/globals";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/Buttons";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/Command";
import { iconVariants } from "@/components/ui/Icons";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover";
import { cn } from "@/lib/utils";

export interface RolesSelectProps extends React.ComponentProps<typeof Popover> {
  allRoles: { id: Snowflake; name: string; color: string }[];
  selectedRoles?: Snowflake[];
  setRoles: (value: Snowflake[]) => void;
  multiple?: boolean;
}

export const RolesSelect = ({ allRoles, selectedRoles = [], setRoles, multiple = true }: RolesSelectProps) => {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (roleId: Snowflake) => {
    if (multiple) {
      const updatedSelection = selectedRoles.includes(roleId) ? selectedRoles.filter((id) => id !== roleId) : [...selectedRoles, roleId];
      setRoles(updatedSelection);
    } else {
      setRoles([roleId]);
      setOpen(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="select" role="combobox" aria-expanded={open} className="max-w-sm justify-between">
          {selectedRoles.length > 0
            ? multiple
              ? `${allRoles.find((role) => role.id === selectedRoles[0])?.name ?? "Unknown role"}${selectedRoles.length > 1 ? ` + ${selectedRoles.length - 1} more` : ""}`
              : (allRoles.find((role) => role.id === selectedRoles[0])?.name ?? "No role selected")
            : "Select roles..."}
          <ChevronsUpDownIcon
            className={iconVariants({
              variant: "small",
              className: "text-neutral-400 duration-200 motion-reduce:transition-none",
            })}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start">
        <Command>
          <CommandInput placeholder="Search roles..." />
          <CommandList>
            <CommandEmpty>No roles available!</CommandEmpty>
            <CommandGroup>
              {allRoles.map((role) => (
                <CommandItem
                  key={role.id}
                  value={role.id}
                  onSelect={() => {
                    handleSelect(role.id);
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div className="size-3 rounded-full" style={{ backgroundColor: role.color || "#FFFFFF" }} />
                    {role.name}
                  </div>
                  <CheckIcon className={cn("ml-auto transition", selectedRoles.includes(role.id) ? "opacity-100" : "opacity-0")} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
