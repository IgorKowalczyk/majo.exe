"use client";

import { isNumeric } from "@majoexe/util/functions/util";
import { CheckIcon, LoaderCircleIcon, MessageSquareDotIcon } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Buttons";
import { iconVariants } from "@/components/ui/Icons";
import { InputWithIcon } from "@/components/ui/Input";
import { cn } from "@/lib/utils";

interface ChangeUserReputationProps extends React.ComponentProps<"form"> {
 userId: string;
 guildId: string;
 userReputation?: number;
}

export const ChangeUserReputation = ({ userId, guildId, userReputation, className, ...props }: ChangeUserReputationProps) => {
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
  <form className={cn("flex flex-col items-start gap-2", className)} onSubmit={handleReputation} {...props}>
   <InputWithIcon
    type="number"
    icon={<MessageSquareDotIcon className={iconVariants({ variant: "normal" })} />}
    placeholder="User reputation"
    value={userRep}
    onChange={(e) => changeReputation(parseInt(e.target.value))}
    className={cn(
     {
      "border-red-400! text-red-400! focus:border-red-400!": error,
     },
     "w-fit"
    )}
   />
   <Button variant="primary" onClick={handleReputation} disabled={loading || error}>
    {loading ? (
     <>
      <LoaderCircleIcon className={iconVariants({ variant: "button", className: "animate-spin" })} /> Updating...
     </>
    ) : (
     <>
      <CheckIcon className={iconVariants({ variant: "button" })} /> Update
     </>
    )}
   </Button>
  </form>
 );
};
