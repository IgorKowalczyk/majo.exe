"use client";

import { isNumeric } from "@majoexe/util/functions/util";
import clsx from "clsx";
import { useState } from "react";
import { toast } from "sonner";
import { ButtonPrimary } from "@/components/Buttons";
import { Icons, iconVariants } from "@/components/Icons";
import { InputWithIcon } from "@/components/Input";

export function ChangeUserReputation({ userId, guildId, userReputation = 0 }) {
 const [userRep, setUserRep] = useState(userReputation ?? 0);
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState(false);

 const changeReputation = (value) => {
  setUserRep(value);
  setError(false);
  if (!isNumeric(value)) setError(true);
  if (value >= 2147483647) return setUserRep(2147483647);
  if (value <= -2147483647) return setUserRep(-2147483647);
 };

 const handleReputation = async () => {
  setLoading(true);
  const loadingToast = toast.loading("Updating user reputation...");

  const res = await fetch("/api/settings/change-reputation", {
   method: "POST",
   headers: {
    "Content-Type": "application/json",
   },
   body: JSON.stringify({
    userId,
    guildId,
    reputation: parseInt(userRep),
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
   toast.success(json.message ?? "User reputation updated!", {
    id: loadingToast,
   });
  } else {
   return toast.error(json.error ?? "Something went wrong", {
    id: loadingToast,
   });
  }
 };

 return (
  <form className="flex flex-col items-start gap-2" onSubmit={handleReputation}>
   <InputWithIcon
    type="number"
    icon={<Icons.messageDot className={iconVariants({ variant: "normal" })} />}
    placeholder="User reputation"
    value={userRep}
    onChange={(e) => changeReputation(e.target.value)}
    className={clsx(
     {
      "!border-red-400 !text-red-400 focus:!border-red-400": error,
     },
     "w-fit"
    )}
   />
   <ButtonPrimary onClick={handleReputation} disabled={loading || error}>
    {loading ? (
     <>
      <Icons.refresh className={iconVariants({ variant: "button", className: "animate-spin" })} /> Updating...
     </>
    ) : (
     <>
      <Icons.check className={iconVariants({ variant: "button" })} /> Update
     </>
    )}
   </ButtonPrimary>
  </form>
 );
}
