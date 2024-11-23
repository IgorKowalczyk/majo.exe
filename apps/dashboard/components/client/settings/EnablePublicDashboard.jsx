"use client";

import clsx from "clsx";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/Buttons";
import Switch from "@/components/client/shared/Switch";
import { Icons, iconVariants } from "@/components/Icons";
import { Input } from "@/components/Input";

export function EnablePublicDashboard({ enabled, serverId, vanityURL }) {
 const [isEnabled, setIsEnabled] = useState(enabled);
 const [disabled, setDisabled] = useState(false);
 const [vanity, setVanity] = useState(vanityURL);
 const [vanityError, setVanityError] = useState(false);
 const [buttonText, setButtonText] = useState("Update vanity");

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

 const changeVanityText = (e) => {
  setVanity(e.target.value);
  if (e.target.value.length > 0) {
   if (!e.target.value.match(/^[a-zA-Z0-9]+$/)) {
    setVanityError("Vanity URL can only contain letters and numbers.");
   } else {
    setVanityError(false);
   }
  }
  if (e.target.value.length > 20) {
   setVanityError("Vanity URL can only be 20 characters long.");
  }
  if (e.target.value.length === 0) {
   setVanityError(false);
  }
 };

 const updateVanity = async (e) => {
  e.preventDefault();
  setButtonText("Updating...");
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

  setButtonText("Update vanity");

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
  <div className="flex flex-col items-start justify-start gap-4">
   <div className="mx-auto flex flex-col items-center justify-center gap-2 text-center font-bold md:mx-0 md:flex-row md:justify-start md:text-left">
    Enable public dashboard overview:
    <Switch enabled={isEnabled} onChange={toggle} disabled={disabled} />
   </div>
   <div className="mx-auto flex flex-col flex-wrap items-center justify-center gap-2 font-bold md:mx-0 md:flex-row md:justify-start">
    Set server vanity URL:
    <div className="flex flex-col flex-wrap items-center justify-start gap-2 md:flex-row">
     <div className="group flex flex-row-reverse items-center justify-start gap-0">
      <Input
       type="text"
       value={vanity}
       onChange={(e) => changeVanityText(e)}
       disabled={disabled}
       placeholder="Vanity URL"
       className={clsx(
        {
         "!border-red-400 focus:!border-red-400": vanityError,
        },

        "peer !w-fit font-normal sm:rounded-l-none sm:border-l-0 sm:!pl-0 focus:sm:!border-l-0"
       )}
       name="vanity"
      />
      <div
       className={clsx(
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
     <Button variant="primary" onClick={(e) => updateVanity(e)} disabled={disabled || vanityError || vanity.length === 0 || buttonText === "Updating..."} className="mx-auto font-normal md:mx-0">
      {buttonText === "Updating..." ? <Icons.refresh className={iconVariants({ variant: "button", className: "animate-spin" })} /> : <Icons.Check className={iconVariants({ variant: "button" })} />} {buttonText}
     </Button>
    </div>
   </div>
   {vanityError && (
    <p className="flex items-center text-red-400">
     <Icons.warning className={iconVariants({ variant: "normal", className: "mr-1" })} />
     {vanityError}
    </p>
   )}
  </div>
 );
}
