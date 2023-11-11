import { ArrowDownTrayIcon, CheckIcon, Cog6ToothIcon, ExclamationTriangleIcon, FolderArrowDownIcon, InformationCircleIcon, PaintBrushIcon, ShieldCheckIcon, TrashIcon, UsersIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Block } from "@/components/blocks/Block";
import { Header1 } from "@/components/blocks/Headers";
import { GraphSkeleton, InputSkeleton, TextSkeleton } from "@/components/blocks/Skeletons";
import { PrimaryButton } from "@/components/buttons/server/Primary";
import { RedButton } from "@/components/buttons/server/Red";

export default async function Loading() {
 return (
  <>
   <Header1>
    <Cog6ToothIcon className="min-h-12 min-w-12 h-12 w-12" />
    Settings
   </Header1>
   <Block>
    <h2 className="mb-1 flex items-center justify-start gap-2 text-left text-2xl font-bold">
     <PaintBrushIcon className="min-h-6 min-w-6 h-6 w-6" />
     Default Embed Color
    </h2>
    <p className="mb-4 text-left">Change the color of the embeds sent by the bot. This will not affect embeds sent by other bots.</p>
    <GraphSkeleton className="mt-10 h-60" />
   </Block>

   <Block className="mt-4">
    <h2 className="mb-1 flex items-center justify-start gap-2 text-left text-2xl font-bold">
     <ShieldCheckIcon className="min-h-6 min-w-6 h-6 w-6" />
     Dashboard Access
    </h2>
    <p className="mb-4 text-left">
     Everyone with the roles that have the <code>MANAGE_GUILD</code> or <code>ADMINISTRATOR</code> permission can access the dashboard.
    </p>

    <div className="flex flex-wrap items-center justify-start gap-2">
     {Array.from({ length: 8 }).map((_, i) => (
      <TextSkeleton
       key={i}
       className="!h-[42px] min-w-[150px]"
       style={{
        width: `${Math.floor(Math.random() * (150 - 64 + 1) + 64)}px !important`,
       }}
      />
     ))}
    </div>
   </Block>
   <Block className="mt-4">
    <h2 className="mb-1 flex items-center justify-start gap-2 text-left text-2xl font-bold">
     <UsersIcon className="min-h-6 min-w-6 h-6 w-6" />
     Public Dashboard
    </h2>
    <p className="mb-4 text-left">
     Everyone with the link can view public dashboard overview. This is useful for communities that want to show off their server. <span className="font-bold">The dashboard overview do not include any sensitive information.</span>
    </p>

    <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
     <Block className="flex flex-col items-start justify-start gap-2">
      <h3 className="flex items-center text-left text-xl font-bold">
       <CheckIcon className="min-h-6 min-w-6 mr-2 h-6 w-6 rounded-md border border-green-400 stroke-green-400 p-1" />
       Things that are shown:
      </h3>
      <ul className="list-inside list-disc">
       <li>Server name and description</li>
       <li>Server member count</li>
       <li>Leaderboard</li>
       <li>Server emojis and stickers</li>
      </ul>
     </Block>
     <Block className="flex flex-col items-start justify-start gap-2">
      <h3 className="flex items-center text-left text-xl font-bold">
       <XMarkIcon className="min-h-6 min-w-6 mr-2 h-6 w-6 rounded-md border border-red-400 stroke-red-400 p-1" />
       Things that are not shown:
      </h3>
      <ul className="list-inside list-disc">
       <li>Server statistics</li>
       <li>Server settings</li>
       <li>Server moderation</li>
       <li>Server logs</li>
      </ul>
     </Block>
    </div>

    <InputSkeleton className="!max-w-none" />
    <InputSkeleton className="mt-4 !max-w-none" />

    <div className="border-accent-primary bg-accent-primary/10 mt-4 flex flex-row items-start whitespace-nowrap rounded-md border p-4">
     <span className="mr-1 flex flex-row items-center whitespace-nowrap font-bold">
      <InformationCircleIcon className="stroke-accent-primary min-w-5 min-h-5 mr-1 h-5 w-5" />
      Note:
     </span>
     <span className="whitespace-normal">The public dashboard will be visible to everyone with the link!</span>
    </div>
   </Block>
   <Block className="mt-4">
    <h2 className="mb-1 flex items-center justify-start gap-2 text-left text-2xl font-semibold">
     <ArrowDownTrayIcon className="min-h-6 min-w-6 inline-block h-6 w-6 stroke-2" aria-hidden="true" role="img" />
     Download data
    </h2>
    <p className="mt-2 leading-none text-white/70">
     Download all server data in a <code>.json</code> file. This includes logs, settings, moderation and more.
    </p>
    <PrimaryButton className="mt-4 w-fit" disabled={true}>
     <FolderArrowDownIcon className="mr-2 inline-block h-5 w-5 " aria-hidden="true" role="img" />
     Download data
    </PrimaryButton>
   </Block>
   <div className="bg-background-navbar relative mt-4 overflow-hidden rounded-lg border border-red-400/50 p-4 md:w-full">
    <h2 className="mb-1 flex items-center justify-start gap-2 text-left text-2xl font-semibold text-red-400">
     <ExclamationTriangleIcon className="min-h-6 min-w-6 inline-block h-6 w-6 stroke-2" aria-hidden="true" role="img" />
     Delete server data
    </h2>
    <p className="mt-2 text-white/70">If you want to delete all data related to this server, you can do so by clicking the button below. This action is irreversible.</p>
    <RedButton className="mt-4" disabled={true}>
     <TrashIcon className="mr-2 inline-block h-5 w-5" aria-hidden="true" role="img" /> Delete server data
    </RedButton>
   </div>
  </>
 );
}
