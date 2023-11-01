import { Block } from "@/components/blocks/Block";
import { Header5 } from "@/components/blocks/Headers";
import { EmbedSkeleton, TextSkeleton } from "@/components/blocks/Skeletons";

export default function Loading() {
 return (
  <>
   <div className="mb-4 flex flex-col items-center justify-normal gap-4 text-3xl font-bold sm:flex-row md:text-4xl">
    <div className="bg-button-secondary h-24 w-24 rounded-full" />
    <div className="ml-4 flex flex-col text-center sm:text-left">
     <TextSkeleton className="w-32" />
     <Header5 className="mt-2 text-center opacity-60 sm:text-left">
      <TextSkeleton className="w-64" />
     </Header5>
    </div>
   </div>
   <div className="mx-auto flex w-full items-center justify-start overflow-auto">
    <Block className="mt-2 w-full">
     <EmbedSkeleton />
    </Block>
   </div>
  </>
 );
}
