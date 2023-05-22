import { AvatarSkeleton, TextSkeleton } from "components/blocks/Skeletons";

export default function Loading() {
 return (
  <div className="flex w-full flex-col items-center bg-background-primary antialiased md:py-16 md:px-16 px-8 py-8">
   <h1 className="flex items-center justify-center gap-4 text-center  text-5xl font-bold">
    <AvatarSkeleton />
    Activity Logs
   </h1>
   <div className="flex w-full items-center flex-col mt-4 gap-4">
    {[...Array(5)].map((_, i) => (
     <TextSkeleton className={"!h-20 max-w-2xl w-full"} key={i} />
    ))}
   </div>
  </div>
 );
}
