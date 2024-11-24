"use client";

import { globalConfig } from "@majoexe/config";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { toast } from "sonner";
import { Button } from "@/components/Buttons";
import { EmbedTitle, Embed, EmbedDescription } from "@/components/Embed";
import { Icons, iconVariants } from "@/components/Icons";
import { Input } from "@/components/Input";

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
  <div className="flex flex-col gap-4 lg:flex-row lg:gap-8 lg:divide-x lg:divide-neutral-800">
   <div className="flex flex-col items-center justify-center gap-4">
    <div>
     <div className="flex flex-row gap-1">
      <div className="bg-[#1bbd9c] text-white size-6 rounded-lg cursor-pointer" onClick={() => setColor("#1bbd9c")} />
      <div className="bg-[#2fcd71] text-white size-6 rounded-lg cursor-pointer" onClick={() => setColor("#2fcd71")} />
      <div className="bg-[#3598da] text-white size-6 rounded-lg cursor-pointer" onClick={() => setColor("#3598da")} />
      <div className="bg-[#9a59b7] text-white size-6 rounded-lg cursor-pointer" onClick={() => setColor("#9a59b7")} />
      <div className="bg-[#e81e62] text-white size-6 rounded-lg cursor-pointer" onClick={() => setColor("#e81e62")} />
      <div className="bg-[#f0c40e] text-white size-6 rounded-lg cursor-pointer" onClick={() => setColor("#f0c40e")} />
      <div className="bg-[#e67f23] text-white size-6 rounded-lg cursor-pointer" onClick={() => setColor("#e67f23")} />
     </div>
     <div className="flex mt-1 flex-row gap-1">
      <div className="bg-[#10816a] text-white size-6 rounded-lg cursor-pointer" onClick={() => setColor("#10816a")} />
      <div className="bg-[#1f8b4c] text-white size-6 rounded-lg cursor-pointer" onClick={() => setColor("#1f8b4c")} />
      <div className="bg-[#216695] text-white size-6 rounded-lg cursor-pointer" onClick={() => setColor("#216695")} />
      <div className="bg-[#71368a] text-white size-6 rounded-lg cursor-pointer" onClick={() => setColor("#71368a")} />
      <div className="bg-[#ac1456] text-white size-6 rounded-lg cursor-pointer" onClick={() => setColor("#ac1456")} />
      <div className="bg-[#c37d0e] text-white size-6 rounded-lg cursor-pointer" onClick={() => setColor("#c37d0e")} />
      <div className="bg-[#a94301] text-white size-6 rounded-lg cursor-pointer" onClick={() => setColor("#a94301")} />
     </div>
    </div>
    <HexColorPicker color={color} onChange={setColor} />
    <Input
     type="text"
     value={color}
     onChange={(e) => setColor(e.target.value)}
     className="w-full focus:!bg-transparent"
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
        {buttonText === "Saving..." ? <Icons.refresh className={iconVariants({ variant: "button", className: "animate-spin" })} /> : <Icons.Check className={iconVariants({ variant: "button" })} />}
        {buttonText}
       </Button>
       <Button variant="secondary" onClick={handleReset} disabled={resetButtonText === "Resetting..."}>
        {resetButtonText === "Resetting..." ? <Icons.refresh className={iconVariants({ variant: "button", className: "animate-spin" })} /> : <Icons.Trash className={iconVariants({ variant: "button" })} />}
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
}
