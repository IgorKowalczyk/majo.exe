"use client";

import { ArrowPathIcon, CheckIcon, ExclamationCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { PrimaryDiscordButton } from "@/components/buttons/server/Primary";
import { SecondaryDiscordButton } from "@/components/buttons/server/Secondary";

export function ChangeEmbedColor({ serverId, serverColor, serverIcon }) {
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
    <div className="flex items-center gap-1 mt-4 ml-4">
     {serverIcon ? <Image src={`https://cdn.discordapp.com/icons/${serverId}/${serverIcon}.${serverIcon.startsWith("a_") ? "gif" : "png"}`} alt={serverId} quality={95} width={64} height={64} className="w-10 h-10 rounded-full self-baseline" /> : <div className="w-10 h-10 rounded-full bg-button-secondary self-baseline" />}
     <div className="flex flex-col">
      <div className="h-10 flex-row flex items-center ml-1">
       <span className="font-bold">Majo.exe</span> <span className="bg-[#5c65f3] rounded px-1 py-[0.12rem] ml-1 text-white text-xs">BOT</span>
       <span className="text-sm ml-2 text-gray-400">Today at 12:00 AM</span>
      </div>
      <div>
       <div
        className="bg-background-secondary rounded shadow-lg p-4 mt-2 ml-1"
        style={{
         "border-left": `4px solid ${color}`,
        }}
       >
        <p className="font-bold mb-2">Embed color changed to {color}</p>

        <p>This is an example of how your embed color will look like.</p>
        <p>You can change this color by clicking on the color picker above.</p>
       </div>
       <div className="flex flex-row gap-2 my-2 ml-1">
        <PrimaryDiscordButton onClick={handleSubmit}>
         {buttonText === "Saving..." ? <ArrowPathIcon className="animate-spin h-5 w-5 mr-1 -ml-1" /> : <CheckIcon className="h-5 w-5 mr-1 -ml-1" />}
         {buttonText}
        </PrimaryDiscordButton>
        <SecondaryDiscordButton onClick={handleReset}>
         {resetButtonText === "Resetting..." ? <ArrowPathIcon className="animate-spin h-5 w-5 mr-1 -ml-1" /> : <TrashIcon className="h-5 w-5 mr-1 -ml-1" />}
         {resetButtonText}
        </SecondaryDiscordButton>
       </div>
       {error && (
        <p className="text-red-500 flex items-center gap-1">
         <ExclamationCircleIcon className="h-5 w-5 inline" /> {error}
        </p>
       )}
       {success && (
        <p className="text-green-500 flex items-center gap-1">
         <CheckIcon className="h-5 w-5 inline" /> {success}
        </p>
       )}
      </div>
     </div>
    </div>
   </div>
  </div>
 );
}
