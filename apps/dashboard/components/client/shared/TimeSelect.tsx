"use client";

import { ListBox, ListBoxArrow, ListBoxButton, ListBoxOption, ListBoxOptions } from "@/components/ui/ListBox";
import { Icons, iconVariants } from "@/components/ui/Icons";
import React from "react";

export const choices = [
 {
  title: "Disable",
  time: 0,
 },
 {
  title: "60 seconds",
  time: 60,
 },
 {
  title: "5 minutes",
  time: 300,
 },
 {
  title: "10 minutes",
  time: 600,
 },
 {
  title: "1 hour",
  time: 3600,
 },
 {
  title: "6 hours",
  time: 21600,
 },
 {
  title: "12 hours",
  time: 43200,
 },
 {
  title: "1 day",
  time: 86400,
 },
 {
  title: "1 week",
  time: 604800,
 },
];

export interface TimeSelectProps extends React.ComponentProps<typeof ListBox> {
 selectedChoice: number;
 setSelectedChoice: (value: number) => void;
}

export const TimeSelect = React.forwardRef<React.ElementRef<typeof ListBox>, TimeSelectProps>(({ className, selectedChoice, setSelectedChoice, ...props }, ref) => (
 <>
  {choices && choices.length > 0 ? (
   <ListBox value={selectedChoice.toString()} onChange={(value: string) => setSelectedChoice(parseInt(value))} {...props} ref={ref}>
    <ListBoxButton>
     <span className="flex items-center gap-2 truncate">{choices.find((choice) => choice?.time === selectedChoice)?.title || "No time selected"}</span>
     <ListBoxArrow />
    </ListBoxButton>

    <ListBoxOptions>
     {choices.map((choice) => (
      <ListBoxOption key={`choice-select-option-${choice.time}`} value={choice.time.toString()}>
       <div className="flex items-center gap-1 truncate">{choice.title}</div>
      </ListBoxOption>
     ))}
    </ListBoxOptions>
   </ListBox>
  ) : (
   <div className="flex items-center justify-center gap-2 font-normal text-red-400">
    <Icons.warning className={iconVariants({ variant: "normal" })} />
    <span className="text-sm">No choices available!</span>
   </div>
  )}
 </>
));
