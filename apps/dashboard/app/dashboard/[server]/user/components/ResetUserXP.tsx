"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Buttons";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/Dialog";
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
   <Dialog open={isOpen} onOpenChange={setIsOpen}>
    <DialogTrigger asChild>
     <Button variant="red" className="mt-4 w-fit" onClick={() => setIsOpen(true)}>
      <Icons.Trash className={iconVariants({ variant: "button" })} />
      Reset XP
     </Button>
    </DialogTrigger>
    <DialogContent className="max-w-lg">
     <DialogHeader>
      <DialogTitle>
       <Icons.warning className={iconVariants({ variant: "large", className: "mr-2 stroke-2!" })} />
       Reset XP
      </DialogTitle>
      <DialogDescription>Resetting XP will reset the XP of this user in this server. This action is irreversible and will reset the XP of this user to 0. Are you sure you want to reset the XP of this user?</DialogDescription>
     </DialogHeader>

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
      <DialogClose asChild>
       <Button variant="secondary">
        <Icons.close className={iconVariants({ variant: "button" })} />
        Cancel
       </Button>
      </DialogClose>
     </div>
    </DialogContent>
   </Dialog>
  </div>
 );
});
