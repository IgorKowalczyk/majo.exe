import React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(({ className, ...props }, ref) => <input className={cn("focus:!border-accent-primary disabled:opacity-77 w-full rounded-lg border border-neutral-800 bg-transparent px-3 py-2 shadow-sm outline-none !ring-0 duration-200 disabled:pointer-events-none disabled:cursor-not-allowed", className)} ref={ref} {...props} />);

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(({ className, ...props }, ref) => <textarea className={cn("focus:!border-accent-primary w-full rounded-lg border border-neutral-800 bg-transparent px-3 py-2 shadow-sm outline-none !ring-0 duration-200", className)} ref={ref} {...props} />);

export const Checkbox = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(({ className, ...props }, ref) => <input type="checkbox" className={cn("checked:bg-accent-primary checked:hover:bg-accent-primary focus:!border-accent-primary focus:outline-accent-primary focus:ring-accent-primary focus:checked:bg-accent-primary cursor-pointer rounded-lg border border-neutral-800 bg-transparent p-1 shadow-sm outline-none !ring-0 duration-200", className)} ref={ref} {...props} />);

export const InputWithIcon = React.forwardRef<HTMLInputElement, React.ComponentProps<"input"> & { icon: React.ReactNode; text?: string; required?: boolean; className?: string }>(({ icon, text, required, className, ...props }, ref) => (
 <label className="w-full" htmlFor={props.id || props.name}>
  <span className="flex items-center gap-1 opacity-90">
   {text}
   {required && !props.disabled && <span className="text-red-400">*</span>}
   {props.disabled && <span className="text-sm text-gray-500">(read only)</span>}
  </span>
  <div className="relative my-2 flex">
   <div className={cn(`${props.disabled ? "opacity-50" : ""} absolute inset-y-0 left-0 flex items-center pl-3`)}>{icon}</div>
   <Input {...props} className={cn("pl-10", className)} ref={ref} {...props} />
  </div>
 </label>
));
