import { SquaresPlusIcon, CubeIcon, CubeTransparentIcon } from "@heroicons/react/24/outline";
import { Block } from "@/components/blocks/Block";
import { Header1, Header2 } from "@/components/blocks/Headers";
import { InputSkeleton, TextSkeleton } from "@/components/blocks/Skeletons";

export default async function Loading() {
 return (
  <>
   <Header1>
    <SquaresPlusIcon className="min-h-12 min-w-12 min-h-12 min-w-12 h-12 w-12" />
    Modules
   </Header1>
   <Block>
    <Header2>
     <CubeIcon className="min-h-8 min-w-8 h-8 w-8" />
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
     <CubeTransparentIcon className="min-h-8 min-w-8 h-8 w-8" />
     Commands
    </Header2>
    <p className="mb-4 mt-2 text-left">Enable or disable commands.</p>

    <InputSkeleton className="mb-4 !w-1/2" />
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
  </>
 );
}
