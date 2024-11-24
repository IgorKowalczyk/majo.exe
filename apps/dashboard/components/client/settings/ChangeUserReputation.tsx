"use client";

import { isNumeric } from "@majoexe/util/functions/util";
import clsx from "clsx";
import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/Buttons";
import { Icons, iconVariants } from "@/components/Icons";
import { InputWithIcon } from "@/components/Input";
import { twMerge } from "tailwind-merge";

interface ChangeUserReputationProps extends React.HTMLAttributes<HTMLFormElement> {
 userId: string;
 guildId: string;
 userReputation?: number;
}

export const ChangeUserReputation = React.forwardRef<HTMLFormElement, ChangeUserReputationProps>(({ userId, guildId, userReputation, className, ...props }, ref) => {
 const [userRep, setUserRep] = useState(userReputation ?? 0);
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState(false);

 const changeReputation = (value: number) => {
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
    reputation: userRep,
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
  <form className={twMerge("flex flex-col items-start gap-2", className)} onSubmit={handleReputation} {...props} ref={ref}>
   <InputWithIcon
    type="number"
    icon={<Icons.messageDot className={iconVariants({ variant: "normal" })} />}
    placeholder="User reputation"
    value={userRep}
    onChange={(e) => changeReputation(parseInt(e.target.value))}
    className={clsx(
     {
      "!border-red-400 !text-red-400 focus:!border-red-400": error,
     },
     "w-fit"
    )}
   />
   <Button variant="primary" onClick={handleReputation} disabled={loading || error}>
    {loading ? (
     <>
      <Icons.refresh className={iconVariants({ variant: "button", className: "animate-spin" })} /> Updating...
     </>
    ) : (
     <>
      <Icons.Check className={iconVariants({ variant: "button" })} /> Update
     </>
    )}
   </Button>
  </form>
 );
});
