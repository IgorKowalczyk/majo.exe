"use client";

import { type DialogProps } from "@radix-ui/react-dialog";
import { Command as CommandPrimitive } from "cmdk";
import { SearchIcon } from "lucide-react";
import * as React from "react";
import { Dialog, DialogContent } from "@/components/ui/Dialog";
import { cn } from "@/lib/utils";

const Command = ({ className, ...props }: React.ComponentPropsWithRef<typeof CommandPrimitive>) => (
  <CommandPrimitive className={cn("flex h-full flex-col overflow-hidden rounded-xl bg-background-secondary", className)} {...props} />
);
Command.displayName = CommandPrimitive.displayName;

const CommandDialog = ({ children, ...props }: DialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className="overflow-hidden p-0 shadow-lg">
        <Command>{children}</Command>
      </DialogContent>
    </Dialog>
  );
};

const CommandInput = ({ className, ...props }: React.ComponentPropsWithRef<typeof CommandPrimitive.Input>) => (
  <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
    <SearchIcon className="mr-2 size-4 shrink-0 opacity-50" />
    <CommandPrimitive.Input
      className={cn("flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-neutral-600 disabled:cursor-not-allowed disabled:opacity-50", className)}
      {...props}
    />
  </div>
);

const CommandList = ({ className, ...props }: React.ComponentPropsWithRef<typeof CommandPrimitive.List>) => (
  <CommandPrimitive.List className={cn("max-h-[364px] overflow-y-auto overflow-x-hidden bg-background-secondary", className)} {...props} />
);

const CommandEmpty = ({ ...props }: React.ComponentPropsWithRef<typeof CommandPrimitive.Empty>) => (
  <CommandPrimitive.Empty className="py-6 text-center text-sm text-neutral-500" {...props} />
);

const CommandGroup = ({ className, ...props }: React.ComponentPropsWithRef<typeof CommandPrimitive.Group>) => (
  <CommandPrimitive.Group
    className={cn(
      "overflow-hidden p-2 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-items]]:space-y-1 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-neutral-800",
      className
    )}
    {...props}
  />
);

const CommandSeparator = ({ className, ...props }: React.ComponentPropsWithRef<typeof CommandPrimitive.Separator>) => (
  <CommandPrimitive.Separator className={cn("-mx-1 h-px bg-neutral-800", className)} {...props} />
);

const CommandItem = ({ className, ...props }: React.ComponentPropsWithRef<typeof CommandPrimitive.Item>) => (
  <CommandPrimitive.Item
    className={cn(
      "relative flex cursor-pointer gap-2 select-none items-center rounded-lg p-2 text-sm outline-none data-[disabled=true]:pointer-events-none transition motion-reduce:transition-none data-[selected=true]:bg-accent-primary data-[selected=true]:text-text data-[disabled=true]:opacity-50",
      className
    )}
    {...props}
  />
);

const CommandShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return <span className={cn("ml-auto text-xs tracking-widest text-neutral-800", className)} {...props} />;
};

export { Command, CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandShortcut, CommandSeparator };
