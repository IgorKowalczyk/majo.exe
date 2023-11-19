"use client";

import { ArrowPathIcon, CheckIcon, TrashIcon } from "@heroicons/react/24/outline";
import { dashboardConfig, globalConfig } from "@majoexe/config";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { toast } from "sonner";
import Image from "@/components/blocks/client/shared/Image";
import { Input } from "@/components/buttons/server/Input";
import { PrimaryButton } from "@/components/buttons/server/Primary";
import { SecondaryButton } from "@/components/buttons/server/Secondary";

export function ChangeEmbedColor({ serverId, serverColor }) {
 const [color, setColor] = useState(serverColor ?? globalConfig.defaultColor);
 const [buttonText, setButtonText] = useState("Save");
 const [resetButtonText, setResetButtonText] = useState("Reset");

 const handleSubmit = async () => {
  setButtonText("Saving...");
  const loading = toast.loading("Saving...");

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

  setButtonText("Save");

  if (!res.ok) {
   try {
    const json = await res.json();
    return toast.error(json.message ?? "Something went wrong", {
     id: loading,
    });
   } catch (e) {
    return toast.error("Something went wrong", {
     id: loading,
    });
   }
  }

  const json = await res.json();

  if (json.code === 200) {
   return toast.success(json.message ?? "Embed color changed!", {
    id: loading,
   });
  } else {
   return toast.error(json.error ?? "Something went wrong", {
    id: loading,
   });
  }
 };

 const handleReset = async () => {
  setResetButtonText("Resetting...");
  const loading = toast.loading("Resetting...");

  const res = await fetch("/api/settings/embed-color", {
   method: "PUT",
   headers: {
    "Content-Type": "application/json",
   },
   body: JSON.stringify({
    id: serverId,
   }),
  });

  setResetButtonText("Reset");

  if (!res.ok) {
   try {
    const json = await res.json();
    return toast.error(json.error ?? "Something went wrong", {
     id: loading,
    });
   } catch (e) {
    return toast.error("Something went wrong", {
     id: loading,
    });
   }
  }

  const json = await res.json();

  if (json.code === 200) {
   setColor(globalConfig.defaultColor);
   return toast.success(json.message, {
    id: loading,
   });
  } else {
   return toast.error(json.error ?? "Something went wrong", {
    id: loading,
   });
  }
 };

 return (
  <div className="flex flex-col items-center gap-4 sm:flex-row sm:divide-x sm:divide-neutral-800">
   <div className="flex flex-col items-center gap-4">
    <HexColorPicker color={color} onChange={setColor} />
    <Input type="text" value={color} onChange={(e) => setColor(e.target.value)} className="w-full" />
   </div>
   <div>
    <div className="mt-4 flex items-center gap-1 sm:ml-4">
     <Image src={dashboardConfig.logo} alt={serverId} quality={95} width={64} height={64} className="min-h-10 min-w-10 h-10 w-10 self-baseline rounded-full" />
     <div className="flex flex-col">
      <div className="ml-1 flex h-10 flex-row items-center">
       <span className="font-bold">{dashboardConfig.title}</span>{" "}
       <span className="ml-1 flex items-center gap-1 rounded bg-[#5c65f3] px-1 py-[0.12rem] text-xs text-white">
        <CheckIcon className="min-h-4 min-w-4 h-4 w-4 stroke-2" aria-hidden="true" role="img" /> <span className="-mb-px">BOT</span>
       </span>
       <span className="ml-2 text-sm text-gray-400">Today at 4:20 PM</span>
      </div>
      <div>
       <div
        className="ml-1 mt-2 rounded bg-[#2b2d31] p-4 shadow-lg"
        style={{
         borderLeft: `4px solid ${color}`,
        }}
       >
        <p className="mb-2 font-bold">Embed color changed to {color}</p>

        <p>This is an example of how your embed color will look like.</p>
        <p>You can change this color by clicking on the color picker above.</p>
       </div>
       <div className="my-2 ml-1 flex flex-row gap-2">
        <PrimaryButton onClick={handleSubmit} disabled={buttonText === "Saving..."}>
         {buttonText === "Saving..." ? <ArrowPathIcon className="min-h-5 min-w-5 -ml-1 mr-1 h-5 w-5 animate-spin" /> : <CheckIcon className="min-h-5 min-w-5 -ml-1 mr-1 h-5 w-5" />}
         {buttonText}
        </PrimaryButton>
        <SecondaryButton onClick={handleReset} disabled={resetButtonText === "Resetting..."}>
         {resetButtonText === "Resetting..." ? <ArrowPathIcon className="min-h-5 min-w-5 -ml-1 mr-1 h-5 w-5 animate-spin" /> : <TrashIcon className="min-h-5 min-w-5 -ml-1 mr-1 h-5 w-5" />}
         {resetButtonText}
        </SecondaryButton>
       </div>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
}
