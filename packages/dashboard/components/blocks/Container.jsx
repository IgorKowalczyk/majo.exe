import { useRouter } from "next/router";
import { meta as headMeta, social } from "@/config";
import { Nav } from "@components/nav/Nav";
import Head from "next/head";
import Twemoji from "react-twemoji";

export function Container(props) {
 const { children, ...customMeta } = props;
 const router = useRouter();

 const meta = {
  ...headMeta,
  ...customMeta,
 };

 return (
  <>
   <Head>
    <title>{meta.title}</title>
    <meta content={meta.description} name="description" />
    <meta property="og:url" content={meta.url + router.asPath} />
    <link rel="canonical" href={meta.url + router.asPath} />
    <meta property="og:type" content={meta.type} />
    <meta property="og:site_name" content={meta.author} />
    <meta property="og:description" content={meta.description} />
    <meta property="og:title" content={meta.title} />
    <meta property="og:image" content={social.image} />
    <meta name="twitter:title" content={meta.title} />
    <meta name="twitter:description" content={meta.description} />
    <meta name="twitter:image" content={social.image} />
    <meta name="copyright" content={`Copyright ${meta.author} ${new Date().getFullYear()}`}></meta>
    <meta name="theme-color" content={meta.theme_color} />
    <meta name="msapplication-TileColor" content={meta.theme_color} />
    {meta.twitter && <meta property="article:published_time" content={meta.twitter} />}
    {meta.date && <meta property="article:published_time" content={meta.date} />}
   </Head>
   <Nav />
   <Twemoji options={{ className: "twemoji" }}>
    <div className="flex w-full flex-col items-center bg-background-primary antialiased">{children}</div>
   </Twemoji>
  </>
 );
}
