import { dashboardConfig } from "@majoexe/config";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import { Footer } from "@/components/Footer";
import { Hotjar } from "@/components/Hotjar";
import { TopNavigation } from "@/components/nav/TopNavigation";
import { VisibilityProvider } from "@/components/nav/VisibilityContext";
import { ProgressBar } from "@/components/ProgressBar";
import { Session } from "@/components/Session";
import { TailwindIndicator } from "@/components/TailwindIndicator";
import { Icons, iconVariants } from "@/components/ui/Icons";
import "styles/globals.css";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
 return (
  <Session>
   <html lang="en">
    <head>{process.env.HOTJAR_ID && <Hotjar id={process.env.HOTJAR_ID} />}</head>
    <body className={cn("bg-background-primary text-white antialiased", GeistSans.className)}>
     <ProgressBar />
     <VisibilityProvider>
      <TopNavigation theme="full" />
      <main className="flex min-h-screen flex-row flex-wrap">
       <div className="mt-8">{children}</div>
      </main>
      <Footer />
      <Toaster // prettier
       richColors={true}
       theme="dark"
       closeButton={false}
       visibleToasts={4}
       icons={{
        loading: <Icons.refresh className={iconVariants({ variant: "normal", className: "animate-spin" })} />,
       }}
       expand={false}
      />
      <SpeedInsights />
      <Analytics />
      <TailwindIndicator />
     </VisibilityProvider>
    </body>
   </html>
  </Session>
 );
}
