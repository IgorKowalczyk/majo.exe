"use client";

import { meta, social } from "@config";
import { ArrowPathIcon, CheckIcon, ExclamationCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { PrimaryButton } from "@/components/buttons/server/Primary";
import { SecondaryButton } from "@/components/buttons/server/Secondary";

export function ChangeEmbedColor({ serverId, serverColor }) {
 const [color, setColor] = useState(serverColor ?? "#5865F2");
 const [buttonText, setButtonText] = useState("Save");
 const [resetButtonText, setResetButtonText] = useState("Reset");
 const [error, setError] = useState("");
 const [success, setSuccess] = useState("");

 const handleSubmit = async () => {
  setButtonText("Saving...");
  setError("");
  setSuccess("");
  const res = await fetch("/api/settings/embed-color", {
   method: "POST",
   headers: {
    "Content-Type": "application/json",
   },
   body: JSON.stringify({
    color,
    id: serverId,
   }),
  });
  if (!res.ok) {
   setError("Something went wrong");
   return setButtonText("Save");
  }
  const json = await res.json();
  if (json.code === 200) {
   setSuccess(json.message);
   setTimeout(() => {
    setSuccess("");
   }, 3000);
   return setButtonText("Save");
  } else {
   setError(json.error);
   setTimeout(() => {
    setError("");
   }, 3000);
   return setButtonText("Save");
  }
 };

 const handleReset = async () => {
  setResetButtonText("Resetting...");
  setError("");
  setSuccess("");
  const res = await fetch("/api/settings/embed-color", {
   method: "PUT",
   headers: {
    "Content-Type": "application/json",
   },
   body: JSON.stringify({
    id: serverId,
   }),
  });
  if (!res.ok) {
   setError("Something went wrong");
   return setResetButtonText("Reset");
  }
  const json = await res.json();
  if (json.code === 200) {
   setSuccess(json.message);
   setTimeout(() => {
    setSuccess("");
   }, 3000);
   setColor("#5865F2");
   return setResetButtonText("Reset");
  } else {
   setError(json.error);
   setTimeout(() => {
    setError("");
   }, 3000);
   return setResetButtonText("Reset");
  }
 };

 return (
  <div className="flex flex-row items-center gap-4 divide-x divide-neutral-800">
   <HexColorPicker color={color} onChange={setColor} />
   <div>
    <div className="ml-4 mt-4 flex items-center gap-1">
     <Image src={social.logo} alt={serverId} quality={95} width={64} height={64} className="h-10 w-10 self-baseline rounded-full" />
     <div className="flex flex-col">
      <div className="ml-1 flex h-10 flex-row items-center">
       <span className="font-bold">{meta.title}</span> <span className="ml-1 rounded bg-[#5c65f3] px-1 py-[0.12rem] text-xs text-white">BOT</span>
       <span className="ml-2 text-sm text-gray-400">Today at 12:00 AM</span>
      </div>
      <div>
       <div
        className="ml-1 mt-2 rounded bg-[#2b2d31] p-4 shadow-lg"
        style={{
         "border-left": `4px solid ${color}`,
        }}
       >
        <p className="mb-2 font-bold">Embed color changed to {color}</p>

        <p>This is an example of how your embed color will look like.</p>
        <p>You can change this color by clicking on the color picker above.</p>
       </div>
       <div className="my-2 ml-1 flex flex-row gap-2">
        <PrimaryButton onClick={handleSubmit}>
         {buttonText === "Saving..." ? <ArrowPathIcon className="-ml-1 mr-1 h-5 w-5 animate-spin" /> : <CheckIcon className="-ml-1 mr-1 h-5 w-5" />}
         {buttonText}
        </PrimaryButton>
        <SecondaryButton onClick={handleReset}>
         {resetButtonText === "Resetting..." ? <ArrowPathIcon className="-ml-1 mr-1 h-5 w-5 animate-spin" /> : <TrashIcon className="-ml-1 mr-1 h-5 w-5" />}
         {resetButtonText}
        </SecondaryButton>
       </div>
       {error && (
        <p className="flex items-center gap-1 text-red-500">
         <ExclamationCircleIcon className="inline h-5 w-5" /> {error}
        </p>
       )}
       {success && (
        <p className="flex items-center gap-1 text-green-500">
         <CheckIcon className="inline h-5 w-5" /> {success}
        </p>
       )}
      </div>
     </div>
    </div>
   </div>
  </div>
 );
}
