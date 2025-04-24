"use client";

import React from "react";
import { Select, SelectTrigger, SelectItem, SelectContent } from "@/components/ui/Select";

export interface ViewSelectProps extends React.ComponentProps<typeof Select> {
 selectedValue: number;
 setSelectedValue: (value: number) => void;
}

export const ViewSelect = ({ selectedValue, setSelectedValue, ...props }: ViewSelectProps) => (
 <Select value={selectedValue.toString()} onValueChange={(value: string) => setSelectedValue(parseInt(value))} {...props}>
  <SelectTrigger>
   <span className="flex items-center gap-2 truncate">{selectedValue} results</span>
  </SelectTrigger>
  <SelectContent>
   {[10, 20, 30, 40, 50].map((choice) => (
    <SelectItem key={`view-select-option-${choice}`} value={choice.toString()}>
     <div className="flex items-center gap-1 truncate">{choice} results</div>
    </SelectItem>
   ))}
  </SelectContent>
 </Select>
);
