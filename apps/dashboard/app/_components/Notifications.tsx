import Image from "next/image";
import avatar01 from "public/assets/avatars/01.webp";
import avatar02 from "public/assets/avatars/02.webp";
import avatar03 from "public/assets/avatars/03.webp";
import avatar04 from "public/assets/avatars/04.webp";
import avatar05 from "public/assets/avatars/05.webp";
import avatar06 from "public/assets/avatars/06.webp";
import avatar07 from "public/assets/avatars/07.webp";
import { AnimatedList } from "@/components/ui/effects/AnimatedList";

export function Notifications() {
 let notifications = [
  {
   author: "Kilo",
   avatar: avatar02,
   content: (
    <span>
     enabled <span className="font-bold text-accent-primary">AutoMod</span>
    </span>
   ),
  },
  {
   author: "ElmzL3gend",
   avatar: avatar07,
   content: (
    <span>
     banned <span className="font-bold text-accent-primary">𝕮𝖍𝖎𝖕𝖘𝖆𝖓𝖉𝕼𝖚𝖊𝖘𝖔</span>
    </span>
   ),
  },
  {
   author: "m3me_mint3r",
   avatar: avatar04,
   content: (
    <span>
     warned <span className="font-bold text-accent-primary">D1gitPunkz</span>
    </span>
   ),
  },
  {
   author: "Leani" /* ;-; good old times */,
   avatar: avatar06,
   content: (
    <span>
     disabled <span className="font-bold text-accent-primary">/help</span> command
    </span>
   ),
  },
  {
   author: "nIEwIAdOmO",
   avatar: avatar05,
   content: (
    <span>
     set vanity to <span className="font-bold text-accent-primary">/majo</span>
    </span>
   ),
  },
  {
   author: "SANGOKU",
   avatar: avatar03,
   content: (
    <span>
     enabled category <span className="font-bold text-accent-primary">Moderation</span>
    </span>
   ),
  },
  {
   author: "Jonas",
   avatar: avatar01,
   content: (
    <span>
     set embed color to <span className="font-bold text-accent-primary">#FF0000</span>
    </span>
   ),
  },
 ];

 notifications = Array.from({ length: 10 }, () => notifications).flat();

 return (
  <AnimatedList>
   {notifications.map((item, index) => (
    <figure key={`notification-${item.content}-${item.author}-${index}`} className="relative mx-auto min-h-fit w-full max-w-[400px] transform-gpu overflow-hidden transition-all duration-200 ease-in-out">
     <div className="mt-1 flex flex-row items-center gap-1">
      <Image src={item.avatar} alt={`${item.author} avatar`} quality={95} width={20} height={20} className="size-5 self-baseline rounded-full" />
      <span className="ml-2 text-sm">
       <span className="font-bold">{item.author}</span> {item.content}
      </span>
     </div>
    </figure>
   ))}
  </AnimatedList>
 );
}
