import { dashboardConfig } from "@majoexe/config";
import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import { twMerge } from "tailwind-merge";
import ProgressBar from "@/components/blocks/client/ProgressBar";
import { Session } from "@/components/blocks/client/Session";
import { Hotjar } from "@/components/blocks/Hotjar";
import { TailwindIndicator } from "@/components/blocks/TailwindIndicator";
import { VisibilityProvider } from "@/components/nav/client/VisibilityContext";
import "styles/globals.css";
import "styles/progress.css";
import "styles/tippy.css";
import { Nav } from "@/components/nav/server/Nav";

const inter = Inter({ subsets: ["latin"] });

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
    <body className={twMerge("bg-background-primary text-white antialiased", inter.className)}>
     <ProgressBar />
     <VisibilityProvider>
      <Nav theme={"full"} />
      <main className="flex min-h-screen flex-row flex-wrap">
       <div className="mt-8">{children}</div>
       {/*
       <div className="fixed bottom-0 left-0 right-0 z-[99999] mx-auto mb-6 hidden w-fit rounded-xl border border-neutral-800 bg-background-navbar/70 px-6 py-4 text-center text-white backdrop-blur-[9px] md:block">
        This website uses cookies to enhance the user experience. By using this website, you agree to the use of cookies.
        <Link href="/discord" target={"_blank"} className="text-button-primary hover:underline">
         Accept
        </Link>
       </div>*/}
      </main>
      <TailwindIndicator />
     </VisibilityProvider>
     <Analytics />
    </body>
   </html>
  </Session>
 );
}
