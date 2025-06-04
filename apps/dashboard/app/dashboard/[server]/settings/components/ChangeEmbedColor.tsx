"use client";

import { globalConfig } from "@majoexe/config";
import { CheckIcon, TrashIcon } from "lucide-react";
import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { toast } from "sonner";
import { Button } from "@/components/ui/Buttons";
import { EmbedTitle, Embed, EmbedDescription } from "@/components/ui/Embed";
import { Icons, iconVariants } from "@/components/ui/Icons";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";

interface ChangeEmbedColorProps extends React.ComponentProps<"div"> {
 serverId: string;
 serverColor: string;
}

export const ChangeEmbedColor = ({ serverId, serverColor, className, ...props }: ChangeEmbedColorProps) => {
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
    console.log(e);
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
    console.log(e);
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
  <div className={cn("flex flex-col gap-4 lg:flex-row lg:gap-0 lg:divide-x lg:divide-neutral-800", className)} {...props}>
   <div className="flex flex-col items-center justify-center gap-3 lg:pr-8">
    <div>
     <div className="flex flex-row gap-1">
      <div className="size-6 cursor-pointer rounded-lg bg-[#1bbd9c] text-white" onClick={() => setColor("#1bbd9c")} />
      <div className="size-6 cursor-pointer rounded-lg bg-[#2fcd71] text-white" onClick={() => setColor("#2fcd71")} />
      <div className="size-6 cursor-pointer rounded-lg bg-[#3598da] text-white" onClick={() => setColor("#3598da")} />
      <div className="size-6 cursor-pointer rounded-lg bg-[#9a59b7] text-white" onClick={() => setColor("#9a59b7")} />
      <div className="size-6 cursor-pointer rounded-lg bg-[#e81e62] text-white" onClick={() => setColor("#e81e62")} />
      <div className="size-6 cursor-pointer rounded-lg bg-[#f0c40e] text-white" onClick={() => setColor("#f0c40e")} />
      <div className="size-6 cursor-pointer rounded-lg bg-[#e67f23] text-white" onClick={() => setColor("#e67f23")} />
     </div>
     <div className="mt-1 flex flex-row gap-1">
      <div className="size-6 cursor-pointer rounded-lg bg-[#10816a] text-white" onClick={() => setColor("#10816a")} />
      <div className="size-6 cursor-pointer rounded-lg bg-[#1f8b4c] text-white" onClick={() => setColor("#1f8b4c")} />
      <div className="size-6 cursor-pointer rounded-lg bg-[#216695] text-white" onClick={() => setColor("#216695")} />
      <div className="size-6 cursor-pointer rounded-lg bg-[#71368a] text-white" onClick={() => setColor("#71368a")} />
      <div className="size-6 cursor-pointer rounded-lg bg-[#ac1456] text-white" onClick={() => setColor("#ac1456")} />
      <div className="size-6 cursor-pointer rounded-lg bg-[#c37d0e] text-white" onClick={() => setColor("#c37d0e")} />
      <div className="size-6 cursor-pointer rounded-lg bg-[#a94301] text-white" onClick={() => setColor("#a94301")} />
     </div>
    </div>
    <HexColorPicker color={color} onChange={setColor} />
    <Input
     type="text"
     value={color}
     onChange={(e) => setColor(e.target.value)}
     className="w-full focus:bg-transparent!"
     style={{
      backgroundColor: `${color}1A`, // 10% opacity
      borderColor: color,
     }}
    />
   </div>
   <div className="w-full lg:pl-8">
    {/* <span className="flex w-full items-center gap-2 font-bold">
     <Icons.viewing className={iconVariants({ variant: "normal" })} />
     Embed preview:
    </span> */}
    <Embed
     color={color}
     buttons={
      <>
       <Button variant="primary" onClick={handleSubmit} disabled={buttonText === "Saving..."}>
        {buttonText === "Saving..." ? <Icons.refresh className={iconVariants({ variant: "button", className: "animate-spin" })} /> : <CheckIcon className={iconVariants({ variant: "button" })} />}
        {buttonText}
       </Button>
       <Button variant="secondary" onClick={handleReset} disabled={resetButtonText === "Resetting..."}>
        {resetButtonText === "Resetting..." ? <Icons.refresh className={iconVariants({ variant: "button", className: "animate-spin" })} /> : <TrashIcon className={iconVariants({ variant: "button" })} />}
        {resetButtonText}
       </Button>
      </>
     }
    >
     <EmbedTitle>Embed color changed to {color}</EmbedTitle>
     <EmbedDescription>This is an example of how your embed color will look like. You can change this color by clicking on the color picker above.</EmbedDescription>
    </Embed>
   </div>
  </div>
 );
};
