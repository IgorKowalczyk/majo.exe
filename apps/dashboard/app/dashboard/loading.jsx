import { Header1, Header2 } from "@/components/Headers";
import { Icons } from "@/components/Icons";
import { AvatarSkeleton, TextSkeleton, ButtonSkeleton } from "@/components/Skeletons";

export default function Loading() {
 return (
  <div className="flex w-full flex-col items-center px-8 pb-8 pt-16 antialiased md:p-16">
   <div className="flex flex-col justify-center">
    <Header1 className="!justify-center">
     <Icons.dashboard className="size-10 min-h-10 min-w-10" />
     Dashboard
    </Header1>
    <Header2 className="!block text-center text-xl font-normal text-white/50">
     You can only add the bot to servers you have the <code>Manage Server</code> permission in.
    </Header2>
    <div className="mt-4 flex flex-row flex-wrap justify-center gap-4 sm:flex-col">
     {[...Array(10)].map((_, i) => (
      // eslint-disable-next-line @eslint-react/no-array-index-key
      <div key={`skeleton-${i}`}>
       <div className="hidden flex-row items-center justify-start gap-4 sm:flex">
        <AvatarSkeleton />
        <TextSkeleton className="!h-7 w-full" />
        <ButtonSkeleton className="ml-auto" />
       </div>
       <AvatarSkeleton className="!h-24 !w-24 !rounded-md sm:hidden" />
      </div>
     ))}
    </div>
   </div>
  </div>
 );
}
