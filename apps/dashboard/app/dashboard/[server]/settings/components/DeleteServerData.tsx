"use client";

import { LoaderCircleIcon, TrashIcon, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Buttons";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/Dialog";
import { Icons, iconVariants } from "@/components/ui/Icons";
import { Input } from "@/components/ui/Input";

export interface DeleteServerDataProps extends React.ComponentProps<"div"> {
  serverId: string;
}

export const DeleteServerData = ({ serverId, className, ...props }: DeleteServerDataProps) => {
  const [loading, setLoading] = useState(false);
  const [confirmationText, setConfirmationText] = useState("");
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirmationText || confirmationText.length == 0 || confirmationText.toLowerCase() !== "delete") {
      return toast.error("You must type 'delete' to confirm.");
    }

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
    <div className={className} {...props}>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="red" className="mt-4">
            <TrashIcon className={iconVariants({ variant: "button" })} /> Delete server data
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

          <div className="mt-4">
            <label htmlFor="confirmationText" className="flex my-2 w-fit items-center gap-2 font-bold">
              Type <span className="font-bold">&quot;delete&quot;</span> to confirm:
            </label>

            <Input type="text" id="confirmationText" value={confirmationText} onChange={(e) => setConfirmationText(e.target.value)} placeholder="delete" />
          </div>

          <div className="mt-4 flex justify-between gap-2">
            <Button variant="red" onClick={handleDelete} disabled={loading || confirmationText.toLowerCase() !== "delete"}>
              {loading ? (
                <>
                  <LoaderCircleIcon className={iconVariants({ variant: "button", className: "animate-spin" })} />
                  Deleting server data...
                </>
              ) : (
                <>
                  <TrashIcon className={iconVariants({ variant: "button" })} />
                  Yes, delete server data
                </>
              )}
            </Button>
            <DialogClose asChild>
              <Button variant="secondary">
                <XIcon className={iconVariants({ variant: "button" })} />
                Cancel
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
