"use server";

import { Session } from "components/blocks/Session";
import { Nav } from "components/nav/Nav";
import { Inter } from "next/font/google";
import Link from "next/link";
import "../styles/globals.css";
import "../styles/progress.css";
import "../styles/tippy.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
 return (
  <Session>
   <html lang="en">
    <head>
     {process.env.HOTJAR_ID && (
      <script
       dangerouslySetInnerHTML={{
        __html: `
  (function(h,o,t,j,a,r){
      h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
      h._hjSettings={hjid:${process.env.HOTJAR_ID},hjsv:6};
      a=o.getElementsByTagName('head')[0];
      r=o.createElement('script');r.async=1;
      r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
      a.appendChild(r);
  })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
`,
       }}
      />
     )}
    </head>
    <body className={`bg-background-primary text-white relative ${inter.className}`}>
     <Nav />
     <main className="flex w-full flex-col items-center bg-background-primary antialiased md:py-16 md:px-16 px-8 py-8">
      <>{children}</>
      <div className="fixed z-50 bottom-0 left-0 rounded-xl right-0 w-fit mx-auto mb-6 backdrop-blur px-6 bg-button-secondary/80 border border-gray-700 text-white text-center py-4">
       Note: The site is still in development. Please report any bugs or issues to the{" "}
       <Link href="/discord" target={"_blank"} className="text-button-primary hover:underline">
        support server.
       </Link>
      </div>
     </main>
    </body>
   </html>
  </Session>
 );
}
