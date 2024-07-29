import { dashboardConfig } from "@majoexe/config";
import { SideNav } from "@/components/nav/client/SideNav";

export function generateMetadata({ params }) {
 const { server } = params;

 return {
  openGraph: {
   title: dashboardConfig.title,
   description: dashboardConfig.description,
   url: dashboardConfig.url,
   siteName: dashboardConfig.title,
   images: [
    {
     url: `${dashboardConfig.url}/api/og/${server}`,
     width: 1200,
     height: 630,
    },
   ],
  },
 };
}

export default function Layout({ children, params }) {
 return (
  <>
   <SideNav server={params.server} />
   <div className="ml-0 flex-1 p-6 pt-[5.5rem] md:pl-[17.5rem]">{children}</div>
  </>
 );
}
