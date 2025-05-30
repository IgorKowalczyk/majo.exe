"use client";

import React from "react";
import { Icons, iconVariants } from "@/components/ui/Icons";
import { Select, SelectTrigger, SelectItem, SelectContent } from "@/components/ui/Select";

export const choices = [
 {
  title: "Disable",
  mentions: 0,
 },
 {
  title: "2 mentions",
  mentions: 2,
 },
 {
  title: "5 mentions",
  mentions: 5,
 },
 {
  title: "10 mentions",
  mentions: 10,
 },
 {
  title: "20 mentions",
  mentions: 20,
 },
];

export interface MentionSelectProps extends React.ComponentProps<typeof Select> {
 selectedChoice: number;
 setSelectedChoice: (value: number) => void;
 triggerMetadata: {
  mentionTotalLimit: number;
  mentionRaidProtectionEnabled: boolean;
 };
 setTriggerMetadata: (metadata: { mentionTotalLimit: number; mentionRaidProtectionEnabled: boolean }) => void;
}

export const MentionLimitSelect = ({ selectedChoice, setSelectedChoice, triggerMetadata, setTriggerMetadata, ...props }: MentionSelectProps) => {
 const setMentions = (value: number) => {
  const updatedTriggerMetadata = {
   ...triggerMetadata,
   mentionTotalLimit: value,
   mentionRaidProtectionEnabled: true,
  };

  setTriggerMetadata(updatedTriggerMetadata);
  setSelectedChoice(value);
 };

 return (
  <>
   {choices && choices.length > 0 ? (
    <Select value={selectedChoice.toString()} onValueChange={(value: string) => setMentions(parseInt(value))} {...props}>
     <SelectTrigger>
      <span className="flex items-center gap-2 truncate">{choices.find((choice) => choice?.mentions === selectedChoice)?.title || "No limit selected"}</span>
     </SelectTrigger>

     <SelectContent>
      {choices.map((choice) => (
       <SelectItem key={`choice-select-option-${choice.mentions}`} value={choice.mentions.toString()}>
        <div className="flex items-center gap-1 truncate">{choice.title}</div>
       </SelectItem>
      ))}
     </SelectContent>
    </Select>
   ) : (
    <div className="flex items-center justify-center gap-2 font-normal text-red-400">
     <Icons.warning className={iconVariants({ variant: "normal" })} />
     <span className="text-sm">No choices available!</span>
    </div>
   )}
  </>
 );
};
