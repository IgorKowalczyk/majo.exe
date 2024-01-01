"use client";

import { globalConfig } from "@majoexe/config";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { toast } from "sonner";
import { ButtonPrimary } from "@/components/Buttons";
import { ButtonSecondary } from "@/components/Buttons";
import Embed from "@/components/Embed";
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
  <div className="flex flex-col gap-4 lg:flex-row lg:gap-8 lg:divide-x lg:divide-neutral-800">
   <div className="flex flex-col items-center justify-center gap-4">
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
    <span className="flex w-full items-center gap-2 font-bold">
     <Icons.viewing className={iconVariants({ variant: "normal" })} />
     Embed preview:
    </span>
    <Embed
     color={color}
     buttons={
      <>
       <ButtonPrimary onClick={handleSubmit} disabled={buttonText === "Saving..."}>
        {buttonText === "Saving..." ? <Icons.refresh className={iconVariants({ variant: "button", className: "animate-spin" })} /> : <Icons.check className={iconVariants({ variant: "button" })} />}
        {buttonText}
       </ButtonPrimary>
       <ButtonSecondary onClick={handleReset} disabled={resetButtonText === "Resetting..."}>
        {resetButtonText === "Resetting..." ? <Icons.refresh className={iconVariants({ variant: "button", className: "animate-spin" })} /> : <Icons.trash className={iconVariants({ variant: "button" })} />}
        {resetButtonText}
       </ButtonSecondary>
      </>
     }
    >
     <Embed.Title>Embed color changed to {color}</Embed.Title>
     <Embed.Description>This is an example of how your embed color will look like. You can change this color by clicking on the color picker above.</Embed.Description>
    </Embed>
   </div>
  </div>
 );
}
