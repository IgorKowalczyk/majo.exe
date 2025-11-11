"use client";

import React from "react";
import { Icons, iconVariants } from "@/components/ui/Icons";
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from "@/components/ui/Select";

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

export interface TimeSelectProps extends React.ComponentProps<typeof Select> {
  selectedChoice: number;
  setSelectedChoice: (value: number) => void;
}

export const TimeSelect = ({ selectedChoice, setSelectedChoice, ...props }: TimeSelectProps) => (
  <>
    {choices && choices.length > 0 ? (
      <Select value={selectedChoice.toString()} onValueChange={(value) => setSelectedChoice(parseInt(value))} {...props}>
        <SelectTrigger>
          <SelectValue placeholder="Select time">
            <span className="flex items-center gap-2 truncate">{choices.find((choice) => choice?.time === selectedChoice)?.title || "No time selected"}</span>
          </SelectValue>
        </SelectTrigger>

        <SelectContent>
          {choices.map((choice) => (
            <SelectItem key={`choice-select-option-${choice.time}`} value={choice.time.toString()}>
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
