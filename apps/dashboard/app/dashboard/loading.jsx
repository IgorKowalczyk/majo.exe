import { RectangleStackIcon } from "@heroicons/react/24/outline";
import { AvatarSkeleton, TextSkeleton, ButtonSkeleton } from "components/blocks/Skeletons";
import { Header1 } from "@/components/blocks/Headers";

export default function Loading() {
 return (
  <div className="flex w-full flex-col items-center bg-background-primary px-8 py-8 antialiased md:px-16 md:py-16">
   <div className="flex flex-col justify-center gap-4">
    <Header1>
     <RectangleStackIcon className="h-10 w-10" aria-hidden="true" role="img" />
     Dashboard
    </Header1>
    <h2 className="text-center text-xl text-white/50">
     You can only add the bot to servers you have the <code>Manage Server</code> permission in.
    </h2>
    <div className="flex flex-col gap-4">
     {[...Array(10)].map((_, i) => (
      <div key={i} className="flex flex-row items-center justify-start gap-4">
       <AvatarSkeleton />
       <TextSkeleton className={"!h-7"} />
       <ButtonSkeleton className={"ml-auto"} />
      </div>
     ))}
    </div>
   </div>
  </div>
 );
}
