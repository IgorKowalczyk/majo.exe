import { ListBulletIcon } from "@heroicons/react/24/outline";
import { TextSkeleton } from "components/blocks/Skeletons";
import { Header1 } from "@/components/blocks/Headers";

export default function Loading() {
 return (
  <div className="flex w-full flex-col items-center bg-background-primary antialiased md:py-16 md:px-16 px-8 py-8">
   <Header1>
    <ListBulletIcon className="w-12 h-12" />
    Activity Logs
   </Header1>
   <div className="flex w-full items-center flex-col mt-4 gap-4">
    {[...Array(5)].map((_, i) => (
     <TextSkeleton className={"!h-20 max-w-2xl w-full"} key={i} />
    ))}
   </div>
  </div>
 );
}
