import { Block } from "@/components/ui/Block";
import Header, { headerVariants } from "@/components/ui/Headers";
import { Icons, iconVariants } from "@/components/ui/Icons";
import { Skeleton } from "@/components/ui/Skeletons";
import { cn } from "@/lib/utils";

export default function Loading() {
 return (
  <>
   <Header className={cn(headerVariants({ variant: "h1", margin: "normal" }))}>
    <Icons.PackagePlus className={iconVariants({ variant: "extraLarge" })} />
    Modules
   </Header>
   <p className="mb-4 text-left text-base md:text-lg">Choose which modules you want to be enabled on your server.</p>

   <Block className="mt-4">
    <Header className={cn(headerVariants({ variant: "h2" }))}>
     <Icons.Blocks className={iconVariants({ variant: "large", className: "stroke-2!" })} />
     Categories
    </Header>
    <p className="mb-4 mt-2 text-left">Enable or disable categories of commands.</p>

    <div className="flex flex-wrap items-stretch justify-start gap-8">
     {Array.from({ length: 8 }).map((_, i) => (
      <Skeleton
       key={`category-keleton-${i}`}
       style={{
        width: `${Math.floor(Math.random() * (500 - 200 + 1) + 200)}px !important`,
       }}
       className="h-44 min-w-[400px] max-w-none!"
      />
     ))}
    </div>
   </Block>
   <Block className="mt-4">
    <Header className={cn(headerVariants({ variant: "h2" }))}>
     <Icons.slash className={iconVariants({ variant: "large", className: "stroke-2!" })} />
     Commands
    </Header>
    <p className="mb-4 mt-2 text-left">Enable or disable commands.</p>

    <div className="flex flex-wrap items-stretch justify-start gap-8">
     {Array.from({ length: 8 }).map((_, i) => (
      <Skeleton key={`command-skeleton-${i}`} className="h-24 w-full" />
     ))}
    </div>
   </Block>
  </>
 );
}
