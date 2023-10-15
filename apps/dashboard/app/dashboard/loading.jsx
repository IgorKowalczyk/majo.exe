import { RectangleStackIcon } from "@heroicons/react/24/outline";
import { Header1 } from "@/components/blocks/Headers";
import { AvatarSkeleton, TextSkeleton, ButtonSkeleton } from "@/components/blocks/Skeletons";

export default function Loading() {
 return (
  <div className="bg-background-primary flex w-full flex-col items-center px-8 pb-8 pt-16 antialiased md:px-16 md:py-16">
   <div className="flex flex-col justify-center gap-4">
    <Header1 className={"justify-center"}>
     <RectangleStackIcon className="h-10 w-10" aria-hidden="true" role="img" />
     Dashboard
    </Header1>
    <h2 className="text-center text-xl text-white/50">
     You can only add the bot to servers you have the <code>Manage Server</code> permission in.
    </h2>
    <div className="flex flex-row flex-wrap justify-center gap-4 sm:flex-col">
     {[...Array(10)].map((_, i) => (
      <div key={i}>
       <div className="hidden flex-row items-center justify-start gap-4 sm:flex">
        <AvatarSkeleton />
        <TextSkeleton className={"!h-7 w-full"} />
        <ButtonSkeleton className={"ml-auto"} />
       </div>
       <AvatarSkeleton className="!h-24 !w-24 !rounded-md sm:hidden" />
      </div>
     ))}
    </div>
   </div>
  </div>
 );
}
