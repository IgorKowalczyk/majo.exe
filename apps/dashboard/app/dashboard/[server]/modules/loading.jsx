import { SquaresPlusIcon, CubeIcon, CubeTransparentIcon } from "@heroicons/react/24/outline";
import { Block } from "@/components/Block";
import { Header1, Header2 } from "@/components/Headers";
import { InputSkeleton, TextSkeleton } from "@/components/Skeletons";

export default async function Loading() {
 return (
  <>
   <Header1>
    <SquaresPlusIcon className="h-9 min-h-9 w-9 min-w-9" />
    Modules
   </Header1>
   <Block className="mt-4">
    <Header2>
     <CubeIcon className="h-8 min-h-8 w-8 min-w-8" />
     Categories
    </Header2>
    <p className="mb-4 mt-2 text-left">Enable or disable categories of commands.</p>

    <div className="flex flex-wrap items-stretch justify-start gap-8">
     {Array.from({ length: 8 }).map((_, i) => (
      <TextSkeleton
       key={i}
       style={{
        width: `${Math.floor(Math.random() * (500 - 200 + 1) + 200)}px !important`,
       }}
       className="!h-44 !min-w-[400px] !max-w-none"
      />
     ))}
    </div>
   </Block>

   <Block className="mt-4">
    <Header2>
     <CubeTransparentIcon className="h-8 min-h-8 w-8 min-w-8" />
     Commands
    </Header2>
    <p className="mb-4 mt-2 text-left">Enable or disable commands.</p>

    <InputSkeleton className="mb-4 !w-1/2" />
    <div className="flex flex-wrap items-stretch justify-start gap-8">
     {Array.from({ length: 8 }).map((_, i) => (
      <TextSkeleton key={i} className="!h-44 !w-full" />
     ))}
    </div>
   </Block>
  </>
 );
}
