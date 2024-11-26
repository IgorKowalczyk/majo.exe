"use client";

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Buttons";
import { Icons, iconVariants } from "@/components/ui/Icons";

interface ResetUserXPProps extends React.HTMLAttributes<HTMLDivElement> {
 userId: string;
 guildId: string;
}

export const ResetUserXP = React.forwardRef<HTMLDivElement, ResetUserXPProps>(({ userId, guildId, className, ...props }, ref) => {
 const [isOpen, setIsOpen] = useState(false);
 const [loading, setLoading] = useState(false);

 const handleReset = async () => {
  setLoading(true);
  const loadingToast = toast.loading("Resetting user XP...");

  const res = await fetch("/api/settings/reset-user-xp", {
   method: "POST",
   headers: {
    "Content-Type": "application/json",
   },
   body: JSON.stringify({
    userId,
    guildId,
   }),
  });

  setLoading(false);

  if (!res.ok) {
   try {
    const json = await res.json();
    return toast.error(json.message ?? "Something went wrong", {
     id: loadingToast,
    });
   } catch (e) {
    console.log(e);
    return toast.error("Something went wrong", {
     id: loadingToast,
    });
   }
  }

  const json = await res.json();

  if (json.code === 200) {
   toast.success(json.message ?? "User XP reset!", {
    id: loadingToast,
   });
   setIsOpen(false);
  } else {
   return toast.error(json.error ?? "Something went wrong", {
    id: loadingToast,
   });
  }
 };

 return (
  <div className={className} {...props} ref={ref}>
   <Button variant="red" className="mt-4 w-fit" onClick={() => setIsOpen(true)}>
    <Icons.Trash className={iconVariants({ variant: "button" })} />
    Reset XP
   </Button>
   <Dialog transition open={isOpen} as="div" className="fixed inset-0 z-50 ease-out focus:outline-none" onClose={() => setIsOpen(false)}>
    <DialogBackdrop transition className="fixed inset-0 bg-black/50 duration-200 data-[closed]:opacity-0 motion-reduce:transition-none dark:bg-[#161617]/70" />
    <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
     <div className="flex min-h-full items-center justify-center p-4">
      <DialogPanel transition className="hide-scrollbar w-full max-w-lg transform overflow-visible rounded-lg border border-neutral-800 bg-background-secondary p-6 text-left align-middle shadow-lg backdrop-blur-xl transition-all duration-200 data-[closed]:scale-95 data-[closed]:opacity-0 motion-reduce:transition-none">
       <DialogTitle as="h3" className="flex items-center text-xl font-semibold text-red-400 duration-200 motion-reduce:transition-none">
        <Icons.warning className={iconVariants({ variant: "large", className: "mr-2 !stroke-2" })} />
        Reset XP
       </DialogTitle>
       <div className="mt-2">
        <p className="text-base text-white/70">Resetting XP will reset the XP of this user in this server. This action is irreversible and will reset the XP of this user to 0. Are you sure you want to reset the XP of this user?</p>
       </div>

       <div className="mt-4 flex justify-between gap-2">
        <Button variant="red" onClick={handleReset} disabled={loading}>
         {loading ? (
          <>
           <Icons.refresh className={iconVariants({ variant: "button", className: "animate-spin" })} />
           Resetting...
          </>
         ) : (
          <>
           <Icons.Trash className={iconVariants({ variant: "button" })} />
           Yes, reset XP
          </>
         )}
        </Button>
        <Button variant="secondary" onClick={() => setIsOpen(false)}>
         <Icons.close className={iconVariants({ variant: "button" })} />
         Cancel
        </Button>
       </div>
      </DialogPanel>
     </div>
    </div>
   </Dialog>
  </div>
 );
});
