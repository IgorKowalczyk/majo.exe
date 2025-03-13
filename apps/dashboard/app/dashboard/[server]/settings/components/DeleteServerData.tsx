"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Buttons";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/Dialog";
import { Icons, iconVariants } from "@/components/ui/Icons";

export interface DeleteServerDataProps extends React.HTMLAttributes<HTMLDivElement> {
 serverId: string;
}
export const DeleteServerData = React.forwardRef<HTMLDivElement, DeleteServerDataProps>(({ serverId, className, ...props }, ref) => {
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
   <Dialog>
    <DialogTrigger asChild>
     <Button variant="red" className="mt-4">
      <Icons.Trash className={iconVariants({ variant: "button" })} /> Delete server data
     </Button>
    </DialogTrigger>
    <DialogContent className="max-w-lg">
     <DialogHeader>
      <DialogTitle>
       <Icons.warning className={iconVariants({ variant: "large", className: "stroke-2!" })} />
       Delete server data
      </DialogTitle>
      <DialogDescription>Deleting server data will remove all data associated with this server. Do you want to continue?</DialogDescription>
     </DialogHeader>

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
