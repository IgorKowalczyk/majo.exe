import { Html, Head, Main, NextScript } from "next/document";
import { ads } from "@/config";
import Script from "next/script";

export default function Document({ props }) {
 return (
  <Html lang="en">
   <Head>
    <meta name="robots" content="follow, index" />
    <link rel="icon" href="/favicon.ico" />
    <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
    <link rel="manifest" href="/manifest.json" />
    <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#000000" />
    <link rel="shortcut icon" href="/favicons/favicon.ico" />
    <meta name="msapplication-config" content="/favicons/browserconfig.xml" />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
    <link rel="preconnect" href="https://twemoji.maxcdn.com" crossOrigin="anonymous" />
    <link rel="dns-prefetch" href="https://fonts.googleapis.com/" />
    <link rel="dns-prefetch" href="https://twemoji.maxcdn.com" />
    <Script id="adsense" data-ad-client={`ca-pub-${ads.caPub}`} async strategy="afterInteractive" onError={ (e) => { console.error('Script failed to load', e) }} src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"/>
   </Head>
   <body className="bg-main-white dark:bg-main-dark relative">
    <Main {...props} />
    <NextScript />
   </body>
  </Html>
 );
}
