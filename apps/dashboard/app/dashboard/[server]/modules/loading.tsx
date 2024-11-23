import { Block } from "@/components/Block";
import Header, { headerVariants } from "@/components/Headers";
import { Icons, iconVariants } from "@/components/Icons";
import { Skeleton } from "@/components/Skeletons";
import { twMerge } from "tailwind-merge";

export default function Loading() {
 return (
  <>
   <Header className={twMerge(headerVariants({ variant: "h1" }))}>
    <Icons.PackagePlus className={iconVariants({ variant: "extraLarge" })} />
    Modules
   </Header>

   <Block className="mt-4">
    <Header className={twMerge(headerVariants({ variant: "h2" }))}>
     <Icons.Blocks className={iconVariants({ variant: "large", className: "!stroke-2" })} />
     Categories
    </Header>
    <p className="mb-4 mt-2 text-left">Enable or disable categories of commands.</p>

    <div className="flex flex-wrap items-stretch justify-start gap-8">
     {Array.from({ length: 8 }).map((_, i) => (
      <Skeleton
       // eslint-disable-next-line @eslint-react/no-array-index-key
       key={`category-keleton-${i}`}
       style={{
        width: `${Math.floor(Math.random() * (500 - 200 + 1) + 200)}px !important`,
       }}
       className="h-44 min-w-[400px] !max-w-none"
      />
     ))}
    </div>
   </Block>
   <Block className="mt-4">
    <Header className={twMerge(headerVariants({ variant: "h2" }))}>
     <Icons.slash className={iconVariants({ variant: "large", className: "!stroke-2" })} />
     Commands
    </Header>
    <p className="mb-4 mt-2 text-left">Enable or disable commands.</p>

    <div className="flex flex-wrap items-stretch justify-start gap-8">
     {Array.from({ length: 8 }).map((_, i) => (
      // eslint-disable-next-line @eslint-react/no-array-index-key
      <Skeleton key={`command-skeleton-${i}`} className="h-24 w-full" />
     ))}
    </div>
   </Block>
  </>
 );
}
