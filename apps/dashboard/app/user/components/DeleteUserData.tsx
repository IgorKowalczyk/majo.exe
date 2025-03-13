"use client";

import { signOut } from "next-auth/react";
import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Buttons";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/Dialog";
import { Icons, iconVariants } from "@/components/ui/Icons";

export const DeleteUserData = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
 const [loading, setLoading] = useState(false);

 const handleDelete = async () => {
  setLoading(true);
  const loadingToast = toast.loading("We're deleting your account... We're sad to see you go.");

  const res = await fetch("/api/user/delete", {
   method: "POST",
   headers: {
    "Content-Type": "application/json",
   },
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
   toast.success(json.message ?? "Your account has been deleted! We're sad to see you go.", {
    id: loadingToast,
   });
   setIsOpen(false);
   return signOut({ redirect: true, callbackUrl: "/" });
  } else {
   return toast.error(json.error ?? "Something went wrong", {
    id: loadingToast,
   });
  }
 };

 return (
  <div className={className} {...props} ref={ref}>
   <Dialog>
    <DialogTrigger asChild>
     <Button variant="red" className="mt-4">
      <Icons.Trash className={iconVariants({ variant: "button" })} /> Delete account
     </Button>
    </DialogTrigger>
    <DialogContent className="max-w-lg">
     <DialogHeader>
      <DialogTitle>
       <Icons.warning className={iconVariants({ variant: "large", className: "stroke-2!" })} />
       Delete account
      </DialogTitle>
      <DialogDescription>Deleting your account will delete all your data from our servers. This action is irreversible. Are you sure you want to delete your account?</DialogDescription>
     </DialogHeader>

     <div className="mt-4 flex justify-between gap-2">
      <Button variant="red" onClick={handleDelete} disabled={loading}>
       {loading ? (
        <>
         <Icons.refresh className={iconVariants({ variant: "button", className: "animate-spin" })} />
         Deleting your account...
        </>
       ) : (
        <>
         <Icons.Trash className={iconVariants({ variant: "button" })} />
         Yes, delete my account
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
