import { ListBulletIcon } from "@heroicons/react/24/outline";
import { TextSkeleton } from "components/blocks/Skeletons";
import { Header1 } from "@/components/blocks/Headers";

export default function Loading() {
 return (
  <div className="flex w-full flex-col items-center bg-background-primary px-8 py-8 antialiased md:px-16 md:py-16">
   <Header1>
    <ListBulletIcon className="h-12 w-12" />
    Activity Logs
   </Header1>
   <div className="mt-4 flex w-full flex-col items-center gap-4">
    {[...Array(5)].map((_, i) => (
     <TextSkeleton className={"!h-20 w-full max-w-2xl"} key={i} />
    ))}
   </div>
  </div>
 );
}
