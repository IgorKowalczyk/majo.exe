import { RectangleStackIcon } from "@heroicons/react/24/outline";
import { AvatarSkeleton, TextSkeleton, ButtonSkeleton } from "/components/blocks/Skeletons";

export default function Loading() {
 return (
  <div className="flex w-full flex-col items-center bg-background-primary antialiased md:py-16 md:px-16 px-8 py-8">
   <div className="flex flex-col justify-center gap-4">
    <h1 className="flex items-center justify-center gap-4 text-center font-inter text-5xl font-bold">
     <RectangleStackIcon className="h-10 w-10" aria-hidden="true" role="img" />
     Dashboard
    </h1>
    <h2 className="text-center font-inter text-xl opacity-50">You can only add the bot to servers you have the "Manage Server" permission in.</h2>
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
