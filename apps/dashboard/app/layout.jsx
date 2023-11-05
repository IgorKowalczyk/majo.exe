import { dashboardConfig } from "@majoexe/config";
import { Analytics } from "@vercel/analytics/react";
import { GeistSans } from "geist/font";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import Image from "@/components/blocks/client/shared/Image";
import ProgressBar from "@/components/blocks/client/shared/ProgressBar";
import { Session } from "@/components/blocks/client/shared/Session";
import { Hotjar } from "@/components/blocks/Hotjar";
import { TailwindIndicator } from "@/components/blocks/TailwindIndicator";
import { VisibilityProvider } from "@/components/nav/client/VisibilityContext";
import "styles/globals.css";
import "styles/progress.css";
import "styles/tippy.css";
import { Nav } from "@/components/nav/server/Nav";
//import { Inter } from "next/font/google";

//const inter = Inter({ subsets: ["latin"] });

export const metadata = {
 metadataBase: new URL(dashboardConfig.url),
 title: {
  default: dashboardConfig.title,
  template: `%s | ${dashboardConfig.title}`,
 },
 description: dashboardConfig.description,
 openGraph: {
  title: dashboardConfig.title,
  description: dashboardConfig.description,
  url: dashboardConfig.url,
  siteName: dashboardConfig.title,
  images: [
   {
    url: dashboardConfig.image,
    width: 1200,
    height: 630,
   },
  ],
  locale: "en_US",
  type: "website",
 },
 robots: {
  index: true,
  follow: true,
  googleBot: {
   index: true,
   follow: true,
   "max-video-preview": -1,
   "max-image-preview": "large",
   "max-snippet": -1,
  },
 },
 twitter: {
  title: dashboardConfig.title,
  card: "summary_large_image",
 },
 icons: {
  shortcut: "/favicon.ico",
 },
};

export default function RootLayout({ children }) {
 return (
  <Session>
   <html lang="en">
    <head>{process.env.HOTJAR_ID && <Hotjar id={process.env.HOTJAR_ID} />}</head>
    <body className={twMerge("bg-background-primary text-white antialiased", GeistSans.className)}>
     <ProgressBar />
     <VisibilityProvider>
      <Nav theme={"full"} />
      <main className="flex min-h-screen flex-row flex-wrap">
       <div className="mt-8">{children}</div>
      </main>
      <footer className="mx-auto w-full px-4 py-10 md:px-8 lg:px-16 xl:w-4/5">
       <div className="mx-auto pt-10">
        <div className="grid grid-cols-2 gap-9 md:grid-cols-5">
         <div className="col-span-3 flex flex-col justify-center">
          <div className="flex items-center space-x-5">
           <Link href="/">
            <p className="flex cursor-pointer items-center text-2xl font-semibold">
             <Image className="min-h-9 min-w-9 mr-2 h-9 w-9 rounded-full" src={dashboardConfig.logo} alt="Majo.exe" width={36} height={36} />
             Majo.exe
            </p>
           </Link>
          </div>

          <p className="mt-3 text-neutral-300">🔥 Bot for almost everything - Memes, Image editing, Giveaway, Moderation, Anime and even more!</p>
          <br />
         </div>

         <div className="col-span-1 text-neutral-300">
          <p className="mt-3 font-semibold text-white sm:mb-3 sm:mt-0 ">Useful links</p>
          <div>
           <Link href={`${dashboardConfig.url}/discord`} className="mt-2 block duration-100 hover:text-gray-300 hover:underline motion-reduce:transition-none">
            Discord server
           </Link>
           <Link href={`${dashboardConfig.url}/contact`} className="mt-2 block duration-100 hover:text-gray-300 hover:underline motion-reduce:transition-none">
            Contact us
           </Link>
           <Link href="https://github.com/igorkowalczyk/majo.exe" className="mt-2 block duration-100 hover:text-gray-300 hover:underline motion-reduce:transition-none">
            Source code
           </Link>
          </div>
         </div>

         <div className="col-span-1 text-neutral-300">
          <p className="mt-3 font-semibold text-white sm:mb-3 sm:mt-0 ">Legal</p>
          <div>
           <Link href={`${dashboardConfig.url}/legal/privacy-policy`} className="mt-2 block duration-100 hover:text-gray-300 hover:underline motion-reduce:transition-none">
            Privacy Policy
           </Link>
           <Link href={`${dashboardConfig.url}/legal/terms-of-service`} className="mt-2 block duration-100 hover:text-gray-300 hover:underline motion-reduce:transition-none">
            Terms of Service
           </Link>
          </div>
         </div>
        </div>
        <div className="mt-5 flex text-center text-neutral-300">
         <p className="text-sm font-semibold opacity-80">Copyright &copy; 2020 - {new Date().getFullYear()} Igor Kowalczyk, All rights reserved.</p>
        </div>
       </div>
      </footer>
      <TailwindIndicator />
     </VisibilityProvider>
     <Analytics />
    </body>
   </html>
  </Session>
 );
}
