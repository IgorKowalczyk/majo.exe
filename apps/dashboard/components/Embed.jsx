import { dashboardConfig } from "@majoexe/config";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { Icons, iconVariants } from "./Icons";

const Embed = ({ children, color = "#5865F2", buttons, className }) => {
 return (
  <div className={twMerge("mt-4 flex w-full max-w-[432px] items-start gap-1", className)}>
   <Image src={dashboardConfig.logo} alt={"Bot logo"} quality={95} width={40} height={40} className="h-10 min-h-10 w-10 min-w-10 self-baseline rounded-full" />
   <div className="flex w-full flex-col">
    <div className="ml-1 flex h-10 flex-row items-center">
     <span className="font-bold">{dashboardConfig.title}</span>{" "}
     <span className="ml-1 flex items-center gap-1 rounded bg-[#5c65f3] px-1 py-[0.12rem] text-xs text-white">
      <Icons.check className={iconVariants({ variant: "small", className: "!stroke-2" })} /> <span className="-mb-px">BOT</span>
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
 );
};

const EmbedTitle = ({ children }) => {
 return <p className="mb-2 font-bold">{children}</p>;
};

const EmbedDescription = ({ children }) => {
 return <p className="prose prose-invert">{children}</p>;
};

const EmbedImage = ({ src }) => {
 return <>{src && src.startsWith("http") ? <Image src={src} alt={"Embed image"} quality={95} width={400} height={121} className="mt-4 w-full max-w-[400px] rounded bg-white/10 [aspect-ratio:400/121]" /> : <div className="mt-4 w-full max-w-[400px] rounded bg-white/10 [aspect-ratio:400/121]" />}</>;
};

Embed.Title = EmbedTitle;
Embed.Description = EmbedDescription;
Embed.Image = EmbedImage;

export default Embed;
