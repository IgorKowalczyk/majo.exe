import { dashboardConfig } from "@majoexe/config";
import Image from "next/image";
import React, { HTMLAttributes } from "react";
import { Icons, iconVariants } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

interface EmbedProps extends React.ComponentProps<"div"> {
 color: string;
 buttons?: React.ReactNode;
}

export const Embed = ({ className, children, color, buttons, ...props }: EmbedProps) => (
 <div className={cn("flex w-full max-w-[432px] items-start gap-1", className)} {...props}>
  <Image src={dashboardConfig.logo} alt={"Bot logo"} quality={95} width={40} height={40} className="size-10 shrink-0 self-baseline rounded-full" />
  <div className="flex w-full flex-col">
   <div className="ml-1 flex h-10 flex-row items-center">
    <span className="font-bold">{dashboardConfig.title}</span>{" "}
    <span className="ml-1 flex items-center gap-1 rounded-sm bg-[#5c65f3] px-1 py-[0.12rem] text-xs text-white">
     <Icons.Check className={iconVariants({ variant: "small", className: "stroke-2!" })} /> <span className="-mb-px">BOT</span>
    </span>
    <span className="ml-2 text-sm text-gray-400">Today at 4:20 PM</span>
   </div>
   <div
    className="ml-1 mt-2 rounded-sm bg-[#2b2d31] p-4 shadow-lg"
    style={{
     borderLeft: `4px solid ${color}`,
    }}
   >
    {children}
   </div>
   {buttons && <div className="ml-1 mt-3 flex flex-row gap-3">{buttons}</div>}
  </div>
 </div>
);

export const EmbedTitle = ({ className, ...props }: React.ComponentProps<"p">) => <p className={cn("mb-2 font-bold", className)} {...props} />;

export const EmbedDescription = ({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) => <p className={cn("prose prose-invert", className)} {...props} />;

interface EmbedImageProps extends Omit<React.ComponentProps<typeof Image>, "src"> {
 src?: string;
}

export const EmbedImage = ({ src, className, ...props }: EmbedImageProps) => {
 if (src && src.startsWith("http")) {
  return <Image {...props} src={src} quality={95} width={400} height={121} className={cn("mt-4 w-full max-w-[400px] rounded-sm bg-white/10 [aspect-ratio:400/121]", className)} />;
 }

 return <div className="mt-4 w-full max-w-[400px] rounded-sm bg-white/10 [aspect-ratio:400/121]" />;
};
