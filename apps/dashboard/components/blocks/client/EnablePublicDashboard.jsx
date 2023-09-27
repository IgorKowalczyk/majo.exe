"use client";

import { ArrowPathIcon, CheckIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useEffect, useState } from "react";
import Switch from "./Switch";
import { Input } from "@/components/buttons/server/Input";
import { PrimaryButton } from "@/components/buttons/server/Primary";

export function EnablePublicDashboard({ enabled, serverId, vanityURL }) {
 const [isEnabled, setIsEnabled] = useState(enabled);
 const [disabled, setDisabled] = useState(false);
 const [vanity, setVanity] = useState(vanityURL);
 const [vanityError, setVanityError] = useState(false);
 const [buttonText, setButtonText] = useState("Update vanity");

 useEffect(() => {
  setIsEnabled(enabled);
 }, [enabled]);

 useEffect(() => {
  setVanity(vanity);
 }, [vanity]);

 const toggle = async () => {
  setDisabled(true);
  setIsEnabled(!isEnabled);
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

  if (!res.ok) {
   setDisabled(false);
   setIsEnabled(isEnabled);
  }

  const json = await res.json();

  if (json.code === 200) {
   setDisabled(false);
  } else {
   setDisabled(false);
   setIsEnabled(isEnabled);
  }
 };

 const changeVanityText = async (e) => {
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
  const res = await fetch("/api/settings/public-vanity", {
   method: "POST",
   headers: {
    "Content-Type": "application/json",
   },
   body: JSON.stringify({
    id: serverId,
    vanity: vanity,
   }),
  });

  const json = await res.json();

  if (json.code === 200) {
   setButtonText("Updated!");
   setTimeout(() => {
    setButtonText("Update vanity");
   }, 5000);
   return;
  } else {
   setButtonText("Update vanity");
   return setVanityError(json.message || "Something went wrong.");
  }
 };

 return (
  <div className="flex flex-col items-start justify-start gap-4">
   <div className="mx-auto flex flex-col items-center justify-start gap-2 font-bold md:mx-0 md:flex-row">
    Enable public dashboard overview:
    <Switch enabled={isEnabled} onChange={toggle} disabled={disabled} />
   </div>
   <div className="mx-auto flex flex-col items-center justify-start gap-2 font-bold md:mx-0 md:flex-row">
    Set server vanity URL:
    <div className="flex flex-col items-center justify-start gap-2 md:flex-row">
     <div className="group flex flex-row-reverse items-center justify-start gap-0">
      <Input
       type="text"
       value={vanity}
       onChange={(e) => changeVanityText(e)}
       disabled={disabled}
       placeholder={"Vanity URL"}
       className={clsx(
        {
         "!border-red-400 focus:!border-red-400": vanityError,
        },

        "peer !w-fit rounded-l-none border-l-0 !pl-0 font-normal focus:!border-l-0"
       )}
       name="vanity"
      />
      <div
       className={clsx(
        {
         "!border-red-400 focus:!border-red-400": vanityError,
         "peer-focus:!border-button-primary border-neutral-800": !vanityError,
        },
        "select-none rounded-md rounded-r-none border border-r-0 border-r-transparent bg-transparent py-2 pl-3 font-normal text-white/60 shadow-sm outline-none !ring-0 duration-200 "
       )}
      >
       {process.env.NEXT_PUBLIC_URL}/server/
      </div>
     </div>
     <PrimaryButton onClick={(e) => updateVanity(e)} disabled={disabled || vanityError} className="mx-auto font-normal md:mx-0">
      {buttonText === "Updating..." ? <ArrowPathIcon className="mr-2 h-5 w-5 animate-spin" /> : <CheckIcon className="mr-2 h-5 w-5" />} {buttonText}
     </PrimaryButton>
    </div>
   </div>
   {vanityError && (
    <p className="flex items-center text-red-400">
     <ExclamationCircleIcon className="mr-2 h-5 w-5" />
     {vanityError}
    </p>
   )}
  </div>
 );
}
