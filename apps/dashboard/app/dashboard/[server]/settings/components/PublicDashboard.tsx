"use client";

import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";
import { Button, buttonVariants } from "@/components/ui/Buttons";
import Header, { headerVariants } from "@/components/ui/Headers";
import { Icons, iconVariants } from "@/components/ui/Icons";
import { Input } from "@/components/ui/Input";
import { Switch } from "@/components/ui/Switch";
import { cn } from "@/lib/utils";

interface PublicDashboardProps {
 enabled: boolean;
 serverId: string;
 vanityURL: string;
 className?: string;
}

export const PublicDashboard = React.forwardRef<HTMLDivElement, PublicDashboardProps>(({ enabled, serverId, vanityURL, className, ...props }, ref) => {
 const [isEnabled, setIsEnabled] = useState(enabled);
 const [disabled, setDisabled] = useState(false);
 const [vanity, setVanity] = useState(vanityURL);
 const [vanityError, setVanityError] = useState<string>();
 const [buttonText, setButtonText] = useState("Save");

 const toggle = async () => {
  setDisabled(true);
  setIsEnabled(!isEnabled);
  const loading = toast.loading(`Turning ${!isEnabled ? "on" : "off"} public dashboard...`);

  const res = await fetch("/api/settings/public-dashboard", {
   method: "POST",
   headers: {
    "Content-Type": "application/json",
   },
   body: JSON.stringify({
    id: serverId,
    enabled: !isEnabled,
   }),
  });

  setDisabled(false);

  if (!res.ok) {
   setIsEnabled(isEnabled);
   try {
    const json = await res.json();
    return toast.error(json.error ?? "Something went wrong", {
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
   return toast.success(json.message ?? "Public dashboard enabled!", {
    id: loading,
   });
  } else {
   setIsEnabled(isEnabled);
   return toast.error(json.error ?? "Something went wrong", {
    id: loading,
   });
  }
 };

 const changeVanityText = (e: React.ChangeEvent<HTMLInputElement>) => {
  setVanity(e.target.value);
  if (e.target.value.length > 0) {
   if (!e.target.value.match(/^[a-zA-Z0-9]+$/)) {
    setVanityError("Vanity URL can only contain letters and numbers.");
   } else {
    setVanityError("");
   }
  }
  if (e.target.value.length > 20) {
   setVanityError("Vanity URL can only be 20 characters long.");
  }
  if (e.target.value.length === 0) {
   setVanityError("");
  }
 };

 const updateVanity = async (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
  setButtonText("Saving...");
  setVanityError("");

  const loading = toast.loading("Updating vanity...");
  const res = await fetch("/api/settings/public-vanity", {
   method: "POST",
   headers: {
    "Content-Type": "application/json",
   },
   body: JSON.stringify({
    id: serverId,
    vanity,
   }),
  });

  setButtonText("Save");

  if (!res.ok) {
   try {
    const json = await res.json();
    return toast.error(json.error ?? "Something went wrong", {
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
   return toast.success(json.message ?? "Vanity URL updated!", {
    id: loading,
   });
  } else {
   return toast.error(json.error ?? "Something went wrong", {
    id: loading,
   });
  }
 };

 return (
  <div className={cn("mt-6", className)} ref={ref} {...props}>
   <div className="flex flex-row items-center gap-2">
    <Header className={cn(headerVariants({ variant: "h3", margin: "normal" }))}>
     <Icons.Power className={iconVariants({ variant: "large" })} />
     Enable public dashboard overview:
     <Switch checked={isEnabled} onChange={toggle} disabled={disabled} />
    </Header>
   </div>
   <p className="text-white/70">Allow users to view a public dashboard of your server, even if they are not a member.</p>
   <div className="mt-4">
    <Header className={cn(headerVariants({ variant: "h3", margin: "normal" }))}>
     <Icons.Link2 className={iconVariants({ variant: "large" })} />
     Vanity URL:
    </Header>
    <p className="text-white/70">Customize the URL of your public dashboard.</p>
    <div className="mt-2 flex flex-col flex-wrap items-center justify-start gap-2 md:flex-row">
     <div className="group flex flex-row-reverse items-center justify-start gap-0">
      <Input
       type="text"
       value={vanity}
       onChange={(e) => changeVanityText(e)}
       disabled={disabled}
       placeholder="Vanity URL"
       className={cn(
        {
         "!border-red-400 focus:!border-red-400": vanityError,
        },

        "peer !w-fit font-normal sm:rounded-l-none sm:border-l-0 sm:!pl-0 focus:sm:!border-l-0"
       )}
       name="vanity"
      />
      <div
       className={cn(
        {
         "!border-red-400 focus:!border-red-400": vanityError,
         "peer-focus:!border-button-primary border-neutral-800": !vanityError,
        },
        "hidden select-none rounded-md rounded-r-none border border-r-0 border-r-transparent bg-transparent py-2 pl-3 font-normal text-white/60 shadow-sm outline-none !ring-0 duration-200 sm:block"
       )}
      >
       {process.env.NEXT_PUBLIC_URL}/server/
      </div>
     </div>
     <Button variant="primary" onClick={(e) => updateVanity(e)} disabled={disabled || !!vanityError || vanity.length === 0 || buttonText === "Saving..."} className="mx-auto font-normal md:mx-0">
      {buttonText === "Saving..." ? <Icons.refresh className={iconVariants({ variant: "button", className: "animate-spin" })} /> : <Icons.Check className={iconVariants({ variant: "button" })} />} {buttonText}
     </Button>
    </div>
   </div>
   {isEnabled && (
    <div className="mt-4 flex flex-col">
     <Header className={cn(headerVariants({ variant: "h3" }))}>
      <Icons.Sparkles className={iconVariants({ variant: "large" })} />
      Your public dashboard is live!
     </Header>
     <span className="mb-4 mt-2 leading-none text-white/70">Note: The dashboard is available to everyone, regardless of whether they are a member of your server.</span>
     <div className="flex flex-row flex-wrap gap-4">
      <Link href={`/server/${encodeURIComponent(vanity)}`} className={cn(buttonVariants({ variant: "primary" }), "w-fit")}>
       <Icons.viewing className={iconVariants({ variant: "button" })} /> Preview
      </Link>
      <Button
       variant="secondary"
       onClick={() => {
        navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_URL}/server/${encodeURIComponent(vanity)}`);
        toast.success("Link copied to clipboard!");
       }}
       className="w-fit"
      >
       <Icons.Copy className={iconVariants({ variant: "button" })} /> Copy link
      </Button>
     </div>
    </div>
   )}
   {vanityError && (
    <p className="mt-4 flex items-center text-red-400">
     <Icons.warning className={iconVariants({ variant: "normal", className: "mr-1" })} />
     {vanityError}
    </p>
   )}
  </div>
 );
});
