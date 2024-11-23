import { Block } from "@/components/Block";
import { Button } from "@/components/Buttons";
import Header, { headerVariants } from "@/components/Headers";
import { Icons, iconVariants } from "@/components/Icons";
import { Skeleton } from "@/components/Skeletons";
import { twMerge } from "tailwind-merge";

export default function Loading() {
 return (
  <>
   <Header className={twMerge(headerVariants({ variant: "h1" }))}>
    <Icons.messageCode className={iconVariants({ variant: "extraLarge" })} />
    Custom messages
   </Header>

   <Block className="mt-4 !overflow-x-visible">
    <Header className={twMerge(headerVariants({ variant: "h2" }))}>
     <Icons.userAdd className={iconVariants({ variant: "large", className: "!stroke-2" })} />
     Welcome Messages
    </Header>
    <p className="mb-4 text-left">
     <span>Send a welcome message to new members when they join your server.</span>
    </p>

    <div className="my-2 flex flex-row flex-wrap gap-2">
     <span className="flex w-fit cursor-help items-center gap-2 font-bold">
      <Icons.Check className={iconVariants({ variant: "normal" })} />
      Enabled:
     </span>
     <Skeleton className="h-[30px] w-12" />
    </div>
    <Skeleton className="h-96 w-full" />
    <Button variant="primary" className="mt-4" disabled>
     <Icons.Check className={iconVariants({ variant: "button" })} />
     Save
    </Button>
   </Block>

   <Block className="mt-4 !overflow-x-visible">
    <Header className={twMerge(headerVariants({ variant: "h2" }))}>
     <Icons.userMinus className={iconVariants({ variant: "large", className: "!stroke-2" })} />
     Leave Messages
    </Header>
    <p className="mb-4 text-left">
     <span>Send a leave message to a channel when a user leaves the server.</span>
    </p>

    <div className="my-2 flex flex-row flex-wrap gap-2">
     <span className="flex w-fit cursor-help items-center gap-2 font-bold">
      <Icons.Check className={iconVariants({ variant: "normal" })} />
      Enabled:
     </span>
     <Skeleton className="h-[30px] w-12" />
    </div>
    <Skeleton className="h-96 w-full" />
    <Button variant="primary" className="mt-4" disabled>
     <Icons.Check className={iconVariants({ variant: "button" })} />
     Save
    </Button>
   </Block>
  </>
 );
}
