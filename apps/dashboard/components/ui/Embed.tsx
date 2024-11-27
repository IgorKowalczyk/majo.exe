import { dashboardConfig } from "@majoexe/config";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Icons, iconVariants } from "@/components/ui/Icons";
import React, { HTMLAttributes } from "react";

export const Embed = React.forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & { color: string; buttons?: React.ReactNode }>(({ className, children, color, buttons, ...props }, ref) => (
 <div className={cn("flex w-full max-w-[432px] items-start gap-1", className)} {...props} ref={ref}>
  <Image src={dashboardConfig.logo} alt={"Bot logo"} quality={95} width={40} height={40} className="size-10 shrink-0 self-baseline rounded-full" />
  <div className="flex w-full flex-col">
   <div className="ml-1 flex h-10 flex-row items-center">
    <span className="font-bold">{dashboardConfig.title}</span>{" "}
    <span className="ml-1 flex items-center gap-1 rounded bg-[#5c65f3] px-1 py-[0.12rem] text-xs text-white">
     <Icons.Check className={iconVariants({ variant: "small", className: "!stroke-2" })} /> <span className="-mb-px">BOT</span>
    </span>
    <span className="ml-2 text-sm text-gray-400">Today at 4:20 PM</span>
   </div>
   <div
    className="ml-1 mt-2 rounded bg-[#2b2d31] p-4 shadow-lg"
    style={{
     borderLeft: `4px solid ${color}`,
    }}
   >
    {children}
   </div>
   {buttons && <div className="ml-1 mt-2 flex flex-row gap-2">{buttons}</div>}
  </div>
 </div>
));

export const EmbedTitle = React.forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => <p ref={ref} className={cn("mb-2 font-bold", className)} {...props} />);

export const EmbedDescription = React.forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => <p ref={ref} className={cn("prose prose-invert", className)} {...props} />);

interface EmbedImageProps {
 src?: string;
}

export const EmbedImage = React.forwardRef<HTMLImageElement, EmbedImageProps>(({ src }, ref) => <>{src && src.startsWith("http") ? <Image src={src} ref={ref} alt={"Embed image"} quality={95} width={400} height={121} className="mt-4 w-full max-w-[400px] rounded bg-white/10 [aspect-ratio:400/121]" /> : <div ref={ref} className="mt-4 w-full max-w-[400px] rounded bg-white/10 [aspect-ratio:400/121]" />}</>);
