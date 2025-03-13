"use client";

import React from "react";
import { ListBox, ListBoxArrow, ListBoxButton, ListBoxOption, ListBoxOptions } from "@/components/ui/ListBox";

export interface ViewSelectProps extends React.ComponentProps<typeof ListBox> {
 selectedValue: number;
 setSelectedValue: (value: number) => void;
}

export const ViewSelect = ({ selectedValue, setSelectedValue, ...props }: ViewSelectProps) => (
 <ListBox value={selectedValue} onChange={(value: string) => setSelectedValue(parseInt(value))} {...props}>
  <ListBoxButton>
   <span className="flex items-center gap-2 truncate">{selectedValue} results</span>
   <ListBoxArrow />
  </ListBoxButton>
  <ListBoxOptions>
   {[10, 20, 30, 40, 50].map((choice) => (
    <ListBoxOption key={`view-select-option-${choice}`} value={choice.toString()}>
     <div className="flex items-center gap-1 truncate">{choice} results</div>
    </ListBoxOption>
   ))}
  </ListBoxOptions>
 </ListBox>
);
