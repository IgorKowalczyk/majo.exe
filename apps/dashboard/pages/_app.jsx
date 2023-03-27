import { Inter } from "next/font/google";
import { Router } from "next/router";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import nProgress from "nprogress";
import "../styles/globals.css";
import "../styles/progress.css";
import "../styles/tippy.css";

const inter = Inter();

Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeError", nProgress.done);
Router.events.on("routeChangeComplete", nProgress.done);

export default function App({ Component, pageProps, router }) {
 return (
  <SessionProvider session={pageProps.session} refetchInterval={0}>
   <ThemeProvider attribute="class" themes={["light", "dark"]} defaultTheme="system">
    <main className={inter.className}>
     <Component {...pageProps} key={router.route} />
    </main>
   </ThemeProvider>
  </SessionProvider>
 );
}