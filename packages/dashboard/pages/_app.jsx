import nProgress from "nprogress";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { Router } from "next/router";
import { AnimatePresence, MotionConfig } from "framer-motion";
import "@styles/globals.css";
import "@styles/progress.css";

Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeError", nProgress.done);
Router.events.on("routeChangeComplete", nProgress.done);

export default function App({ Component, pageProps, router }) {
 return (
  <SessionProvider session={pageProps.session} refetchInterval={0}>
   <ThemeProvider attribute="class" themes={["light", "dark"]} defaultTheme="system">
    <MotionConfig reducedMotion="user">
     <AnimatePresence mode="wait">
      <Component {...pageProps} key={router.route} />
     </AnimatePresence>
    </MotionConfig>
   </ThemeProvider>
  </SessionProvider>
 );
}
