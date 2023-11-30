import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { dashboardConfig } from "@majoexe/config";
import { Analytics } from "@vercel/analytics/react";
import { GeistSans } from "geist/font/sans";
import { Toaster } from "sonner";
import { twMerge } from "tailwind-merge";
import ProgressBar from "@/components/blocks/client/shared/ProgressBar";
import { Session } from "@/components/blocks/client/shared/Session";
import { Footer } from "@/components/blocks/Footer";
import { Hotjar } from "@/components/blocks/Hotjar";
import { TailwindIndicator } from "@/components/blocks/TailwindIndicator";
import { VisibilityProvider } from "@/components/nav/client/VisibilityContext";
import { Nav } from "@/components/nav/server/Nav";
import "styles/globals.css";
import "styles/tippy.css";
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
      <Footer />
      <Toaster // prettier
       richColors={true}
       theme="dark"
       closeButton={true}
       visibleToasts={4}
       loadingIcon={<ArrowPathIcon className="h-5 w-5 animate-spin text-white" />}
       expand={false}
      />
      <TailwindIndicator />
      <Analytics />
     </VisibilityProvider>
    </body>
   </html>
  </Session>
 );
}
