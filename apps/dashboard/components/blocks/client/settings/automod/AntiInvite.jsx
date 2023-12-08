"use client";

import { ClockIcon, HashtagIcon, UserGroupIcon, ChatBubbleBottomCenterIcon, InformationCircleIcon, WrenchIcon, TrashIcon, ExclamationTriangleIcon, EyeSlashIcon, ArrowPathIcon, CheckIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useState } from "react";
import { toast } from "sonner";
import { Block } from "@/components/Block";
import { ButtonPrimary } from "@/components/Buttons";
import { ChannelsSelect } from "@/components/client/shared/ChannelsSelect";
import { RolesSelect } from "@/components/client/shared/RolesSelect";
import Switch from "@/components/client/shared/Switch";
import { TimeSelect } from "@/components/client/shared/TimeSelect";
import { Tooltip } from "@/components/client/shared/Tooltip";

export function AntiInvite({ serverId, enabled, existingActions, existingExemptRoles, existingExemptChannels, allRoles, allChannels }) {
 const [isEnabled, setIsEnabled] = useState(enabled ?? false);
 const [loading, setLoading] = useState(false);
 const [actions, setActions] = useState(existingActions || []);
 const [exemptRoles, setExemptRoles] = useState(existingExemptRoles || []);
 const [exemptChannels, setExemptChannels] = useState(existingExemptChannels || []);

 const save = async (change = true) => {
  setLoading(true);
  if (change) setIsEnabled(!isEnabled);
  const loading = toast.loading(`Turning ${!isEnabled ? "on" : "off"} anti-invite...`);

  const res = await fetch("/api/settings/automod/anti-invite", {
   method: "POST",
   headers: {
    "Content-Type": "application/json",
   },
   body: JSON.stringify({
    id: serverId,
    enabled: change ? !isEnabled : isEnabled,
    actions: actions,
    exemptRoles: exemptRoles,
    exemptChannels: exemptChannels,
   }),
  });

  setLoading(false);

  if (!res.ok) {
   if (change) setIsEnabled(isEnabled);
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
   return toast.success(json.message ?? "Anti-invite enabled!", {
    id: loading,
   });
  } else {
   change && setIsEnabled(isEnabled);
   return toast.error(json.error ?? "Something went wrong", {
    id: loading,
   });
  }
 };

 return (
  <>
   <h2 className="mb-1 flex items-center justify-start gap-2 text-left text-2xl font-bold">
    <UserPlusIcon className="min-h-6 min-w-6 h-6 w-6" />
    Anti-Invite <Switch enabled={isEnabled} onChange={save} disabled={loading} />
   </h2>
   <p className="mb-4 text-left">
    <span>Automatically delete all messages containing Discord server invites.</span>
   </p>

   {!isEnabled && (
    <div className="border-accent-primary bg-accent-primary/10 my-4 flex flex-row flex-wrap items-start whitespace-nowrap rounded-md border p-4">
     <span className="mr-1 flex flex-row items-center whitespace-nowrap font-bold">
      <InformationCircleIcon className="stroke-accent-primary min-w-5 min-h-5 mr-1 h-5 w-5" />
      Note:
     </span>
     <span className="whitespace-normal">You have to enable this rule to change its settings!</span>
    </div>
   )}

   <div
    className={clsx({
     "pointer-events-none cursor-not-allowed opacity-50": !isEnabled && !loading,
     "pointer-events-none cursor-wait opacity-50": loading,
     "cursor-default opacity-100": isEnabled,
    })}
   >
    <Block className="mb-4 !py-3">
     <h3 className="mb-1 flex items-center justify-start gap-2 text-left text-xl font-bold">
      <EyeSlashIcon className="min-h-6 min-w-6 h-6 w-6" /> Ignored:
     </h3>
     <span className="mb-4 font-normal">What should I ignore?</span>
     <div className="flex w-fit flex-row flex-wrap items-center gap-2 text-center font-bold">
      <Tooltip content="Ignore certain roles from triggering the rule.">
       <span className="flex cursor-help items-center gap-2">
        <UserGroupIcon className="stroke-accent-primary min-h-5 min-w-5 h-5 w-5" aria-hidden="true" />
        Ignore Roles:
       </span>
      </Tooltip>
      <RolesSelect // prettier
       allRoles={allRoles}
       exemptRoles={exemptRoles}
       setExemptRoles={setExemptRoles}
      />
     </div>

     <div className="mt-2 flex w-fit flex-row flex-wrap items-center gap-2 text-center font-bold">
      <Tooltip content="Ignore certain channels from being moderated.">
       <span className="flex cursor-help items-center gap-2">
        <HashtagIcon className="stroke-accent-primary min-h-5 min-w-5 h-5 w-5" aria-hidden="true" />
        Ignore Channels:
       </span>
      </Tooltip>
      <ChannelsSelect // prettier
       allChannels={allChannels}
       exemptChannels={exemptChannels}
       setExemptChannels={setExemptChannels}
      />
     </div>

     <p className="mt-2 gap-2 text-sm text-white/70">
      <span className="font-bold">Pssst!</span> Members with Admin or Manage Server permissions are always excluded from automod.
     </p>
    </Block>

    <Block className="mb-4 !py-3">
     <h3 className="mb-1 flex items-center justify-start gap-2 text-left text-xl font-bold">
      <WrenchIcon className="min-h-6 min-w-6 h-6 w-6" /> Actions:
     </h3>
     <span className="mb-4 font-normal">What should I do when a member triggers the rule?</span>

     <div className="my-2 flex flex-row flex-wrap gap-2">
      <Tooltip content="Delete the message that triggered the rule.">
       <span className="flex w-fit cursor-help items-center gap-2 font-bold">
        <TrashIcon className="min-h-6 min-w-6 h-6 w-6 stroke-red-400" />
        Delete message:
       </span>
      </Tooltip>
      <Switch // prettier
       enabled={actions.some((action) => action.type === 1)}
       onChange={() => setActions(actions.some((action) => action.type === 1) ? actions.filter((action) => action.type !== 1) : [...actions, { type: 1, metadata: { custom_message: "Message blocked due to containing an invite link. Rule added by Majo.exe" } }])}
      />
     </div>

     <div className="my-2 flex flex-row flex-wrap gap-2">
      <Tooltip content="Timeout the member that triggered the rule.">
       <span className="flex w-fit cursor-help items-center gap-2 font-bold">
        <ClockIcon className="min-h-6 min-w-6 h-6 w-6 stroke-red-400" />
        Timeout member:
       </span>
      </Tooltip>
      <TimeSelect // prettier
       selectedChoice={actions.find((action) => action.type === 3)?.metadata?.duration_seconds || 0}
       setSelectedChoice={(value) => setActions(actions.map((action) => (action.type === 3 ? { ...action, metadata: { duration_seconds: value } } : action)))}
      />
     </div>

     <div className="my-2 flex flex-row flex-wrap  gap-2">
      <Tooltip content="Send a message to selected channel when a member triggers the rule.">
       <span className="flex w-fit cursor-help items-center gap-2 font-bold">
        <ChatBubbleBottomCenterIcon className="min-h-6 min-w-6 h-6 w-6 stroke-red-400" />
        Log to channel:
       </span>
      </Tooltip>
      <ChannelsSelect // prettier
       allChannels={[{ id: "1", name: "Disabled", type: 0 }, ...allChannels]}
       exemptChannels={actions.find((action) => action.type === 2)?.metadata?.channel_id || 1}
       setExemptChannels={(value) => setActions(actions.map((action) => (action.type === 2 ? { ...action, metadata: { channel_id: value } } : action)))}
       multiple={false}
      />
     </div>

     {(!actions || actions.length === 0) && isEnabled && !loading && (
      <>
       <div className="my-4 flex flex-row items-start whitespace-nowrap rounded-md border border-red-400 bg-red-400/10 p-4 text-red-400">
        <span className="mr-1 flex flex-row items-center whitespace-nowrap font-bold">
         <ExclamationTriangleIcon className="min-w-5 min-h-5 mr-1 h-5 w-5 stroke-red-400" />
         Warning:
        </span>
        <span className="whitespace-normal">You have to select at least one action!</span>
       </div>
      </>
     )}
    </Block>

    <ButtonPrimary className="mt-4" onClick={() => save(false)} disabled={!isEnabled || loading || !actions || actions.length === 0}>
     {loading ? (
      <>
       <ArrowPathIcon className="-ml-1 mr-3 h-5 w-5 animate-spin text-white" aria-hidden="true" />
       Saving...
      </>
     ) : (
      <>
       <CheckIcon className="-ml-1 mr-3 h-5 w-5 text-white" aria-hidden="true" />
       Save
      </>
     )}
    </ButtonPrimary>
   </div>
  </>
 );
}
