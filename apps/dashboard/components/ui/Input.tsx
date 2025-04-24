import React, { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Input = ({ className, ...props }: React.ComponentProps<"input">) => <input className={cn("focus:border-accent-primary! disabled:opacity-77 w-full rounded-lg border border-neutral-800 bg-transparent px-3 py-2 shadow-xs outline-hidden ring-0! duration-200 disabled:pointer-events-none disabled:cursor-not-allowed", className)} {...props} />;

export const Textarea = ({ className, ...props }: React.ComponentProps<"textarea">) => <textarea className={cn("focus:border-accent-primary! w-full rounded-lg border border-neutral-800 bg-transparent px-3 py-2 shadow-xs outline-hidden ring-0! duration-200", className)} {...props} />;

export const Checkbox = ({ className, ...props }: React.ComponentProps<"input">) => <input type="checkbox" className={cn("checked:bg-accent-primary checked:hover:bg-accent-primary focus:border-accent-primary! focus:outline-accent-primary focus:ring-accent-primary focus:checked:bg-accent-primary cursor-pointer rounded-lg border border-neutral-800 bg-transparent p-1 shadow-xs outline-hidden ring-0! duration-200", className)} {...props} />;

export const InputWithIcon = ({ icon, text, required, className, ...props }: React.ComponentProps<"input"> & { icon: React.ReactNode; text?: string; required?: InputHTMLAttributes<HTMLInputElement>["required"] }) => (
 <label className="w-full" htmlFor={props.id || props.name}>
  <span className="flex items-center gap-1 opacity-90">
   {text}
   {required && !props.disabled && <span className="text-red-400">*</span>}
   {props.disabled && <span className="text-sm text-neutral-500">(read only)</span>}
  </span>
  <div className="relative flex">
   <div className={cn(`${props.disabled ? "opacity-50" : ""} absolute inset-y-0 left-0 flex items-center pl-3`)}>{icon}</div>
   <Input {...props} className={cn("pl-10 h-10", className)} {...props} />
  </div>
 </label>
);
