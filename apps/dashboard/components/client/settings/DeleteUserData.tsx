"use client";

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { signOut } from "next-auth/react";
import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/Buttons";
import { Icons, iconVariants } from "@/components/Icons";

export const DeleteUserData = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
 const [isOpen, setIsOpen] = useState(false);
 const [loading, setLoading] = useState(false);

 const handleDelete = async () => {
  setLoading(true);
  const loading = toast.loading("We're deleting your account... We're sad to see you go.");

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
     id: loading,
    });
   } catch (e) {
    console.log(e);
    return toast.error("Something went wrong", {
     id: loading,
    });
   }
  }

  const json = await res.json();

  if (json.code === 200) {
   toast.success(json.message ?? "Your account has been deleted! We're sad to see you go.", {
    id: loading,
   });
   setIsOpen(false);
   return signOut({ redirect: true, callbackUrl: "/" });
  } else {
   return toast.error(json.error ?? "Something went wrong", {
    id: loading,
   });
  }
 };

 return (
  <div className={className} {...props} ref={ref}>
   <Button variant="red" className="mt-4" onClick={() => setIsOpen(true)}>
    <Icons.Trash className={iconVariants({ variant: "button" })} /> Delete account
   </Button>
   <Dialog transition open={isOpen} as="div" className="fixed inset-0 z-50 ease-out focus:outline-none" onClose={() => setIsOpen(false)}>
    <DialogBackdrop transition className="fixed inset-0 bg-black/50 duration-200 data-[closed]:opacity-0 motion-reduce:transition-none dark:bg-[#161617]/70" />
    <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
     <div className="flex min-h-full items-center justify-center p-4">
      <DialogPanel transition className="hide-scrollbar w-full max-w-lg transform overflow-visible rounded-lg border border-neutral-800 bg-background-secondary p-6 text-left align-middle shadow-lg backdrop-blur-xl transition-all duration-200 data-[closed]:scale-95 data-[closed]:opacity-0 motion-reduce:transition-none">
       <DialogTitle as="h3" className="flex items-center text-xl font-semibold text-red-400 duration-200 motion-reduce:transition-none">
        <Icons.warning className={iconVariants({ variant: "large", className: "mr-2 !stroke-2" })} />
        Delete account
       </DialogTitle>
       <div className="mt-2">
        <p className="text-base text-white/70">Deleting your account will delete all your data from our servers. This action is irreversible. Are you sure you want to delete your account?</p>
       </div>

       <div className="mt-4 flex justify-between gap-2">
        <Button variant="red" onClick={handleDelete} disabled={loading}>
         {loading ? (
          <>
           <Icons.refresh className={iconVariants({ variant: "button", className: "animate-spin" })} /> Deleting your account...
          </>
         ) : (
          <>
           <Icons.Trash className={iconVariants({ variant: "button" })} /> Yes, delete my account
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
