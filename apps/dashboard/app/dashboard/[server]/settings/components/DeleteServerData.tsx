"use client";

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Buttons";
import { Icons, iconVariants } from "@/components/ui/Icons";

export interface DeleteServerDataProps extends React.HTMLAttributes<HTMLDivElement> {
 serverId: string;
}
export const DeleteServerData = React.forwardRef<HTMLDivElement, DeleteServerDataProps>(({ serverId, className, ...props }, ref) => {
 const [isOpen, setIsOpen] = useState(false);
 const [loading, setLoading] = useState(false);
 const router = useRouter();

 const handleDelete = async () => {
  setLoading(true);
  const loadingToast = toast.loading("Deleting server data...");

  const res = await fetch("/api/settings/delete-data", {
   method: "POST",
   headers: {
    "Content-Type": "application/json",
   },
   body: JSON.stringify({
    id: serverId,
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
   toast.success(json.message ?? "Server data deleted!", {
    id: loadingToast,
   });
   return router.push("/dashboard");
  } else {
   return toast.error(json.error ?? "Something went wrong", {
    id: loadingToast,
   });
  }
 };

 return (
  <div className={className} {...props} ref={ref}>
   <Button variant="red" className="mt-4" onClick={() => setIsOpen(true)}>
    <Icons.Trash className={iconVariants({ variant: "button" })} /> Delete server data
   </Button>
   <Dialog transition open={isOpen} as="div" className="fixed inset-0 z-50 ease-out focus:outline-none" onClose={() => setIsOpen(false)}>
    <DialogBackdrop transition className="fixed inset-0 bg-black/50 duration-200 data-[closed]:opacity-0 motion-reduce:transition-none dark:bg-[#161617]/70" />
    <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
     <div className="flex min-h-full items-center justify-center p-4">
      <DialogPanel transition className="hide-scrollbar w-full max-w-lg transform overflow-visible rounded-lg border border-neutral-800 bg-background-secondary p-6 text-left align-middle shadow-lg backdrop-blur-xl transition-all duration-200 data-[closed]:scale-95 data-[closed]:opacity-0 motion-reduce:transition-none">
       <DialogTitle as="h3" className="flex items-center text-xl font-semibold text-red-400 duration-200 motion-reduce:transition-none">
        <Icons.warning className={iconVariants({ variant: "large", className: "mr-2 !stroke-2" })} />
        Delete server data
       </DialogTitle>
       <div className="mt-2">
        <p className="text-base text-white/70">Deleting server data will remove all data associated with this server. Do you want to continue?</p>
       </div>

       <div className="mt-4 flex justify-between gap-2">
        <Button variant="red" onClick={handleDelete} disabled={loading}>
         {loading ? (
          <>
           <Icons.refresh className={iconVariants({ variant: "button", className: "animate-spin" })} />
           Deleting server data...
          </>
         ) : (
          <>
           <Icons.Trash className={iconVariants({ variant: "button" })} />
           Yes, delete server data
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
