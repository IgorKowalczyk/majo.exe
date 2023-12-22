"use client";

import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon, XMarkIcon, ArrowPathIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Fragment, useState } from "react";
import { toast } from "sonner";
import { RedButton, ButtonSecondary } from "@/components/Buttons";

export function ResetUserXP({ userId, guildId }) {
 const [isOpen, setIsOpen] = useState(false);
 const [loading, setLoading] = useState(false);

 const handleReset = async () => {
  setLoading(true);
  const loadingToast = toast.loading("Resetting user XP...");

  const res = await fetch("/api/settings/reset-user-xp", {
   method: "POST",
   headers: {
    "Content-Type": "application/json",
   },
   body: JSON.stringify({
    userId,
    guildId,
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
    return toast.error("Something went wrong", {
     id: loadingToast,
    });
   }
  }

  const json = await res.json();

  if (json.code === 200) {
   toast.success(json.message ?? "User XP reset!", {
    id: loadingToast,
   });
   setIsOpen(false);
  } else {
   return toast.error(json.error ?? "Something went wrong", {
    id: loadingToast,
   });
  }
 };

 return (
  <>
   <RedButton className="mt-4 w-fit" onClick={() => setIsOpen(true)}>
    <TrashIcon className="mr-2 inline-block h-5 w-5" />
    Reset XP
   </RedButton>

   <Transition.Root appear show={isOpen} as={Fragment}>
    <Dialog as="div" unmount="true" className="relative z-[99999]" onClose={() => setIsOpen(false)}>
     <Transition.Child as={Fragment} enter="ease-out duration-200 motion-reduce:transition-none" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200 motion-reduce:duration-[1ms]" leaveFrom="opacity-100" leaveTo="opacity-0">
      <div className="firefox:bg-opacity-50 fixed inset-0 bg-black bg-opacity-25 backdrop-blur" />
     </Transition.Child>
     <div className="fixed inset-0 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4 text-center ">
       <Transition.Child as={Fragment} enter="transition ease-out duration-200 motion-reduce:transition-none" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-100 motion-reduce:duration-[1ms]" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
        <Dialog.Panel className="hide-scrollbar bg-background-secondary w-full max-w-lg transform overflow-visible rounded-md border-[1px] border-neutral-800 p-6 text-left align-middle shadow-xl transition-all">
         <Dialog.Title as="h3" className="text-xl font-semibold text-red-400 duration-200 motion-reduce:transition-none">
          <ExclamationTriangleIcon className="mr-2 inline-block h-5 w-5 stroke-2" aria-hidden="true" role="img" />
          Reset XP
         </Dialog.Title>
         <div className="mt-2">
          <p className="text-base text-white/70">Resetting XP will reset the XP of this user in this server. This action is irreversible and will reset the XP of this user to 0. Are you sure you want to reset the XP of this user?</p>
         </div>

         <div className="mt-4 flex justify-between gap-2">
          <RedButton onClick={handleReset} disabled={loading}>
           {loading ? (
            <>
             <ArrowPathIcon className="mr-2 inline-block h-5 w-5 animate-spin" aria-hidden="true" role="img" />
             Resetting...
            </>
           ) : (
            <>
             <TrashIcon className="mr-2 inline-block h-5 w-5" aria-hidden="true" role="img" />
             Yes, reset XP
            </>
           )}
          </RedButton>
          <ButtonSecondary onClick={() => setIsOpen(false)}>
           <XMarkIcon className="mr-2 inline-block h-5 w-5" aria-hidden="true" role="img" />
           Cancel
          </ButtonSecondary>
         </div>
        </Dialog.Panel>
       </Transition.Child>
      </div>
     </div>
    </Dialog>
   </Transition.Root>
  </>
 );
}
