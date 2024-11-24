import { dashboardConfig } from "@majoexe/config";
import { SideNav } from "@/components/nav/client/SideNav";
import { Metadata } from "next";

export async function generateMetadata(props: { params: Promise<{ server: string }> }): Promise<Metadata> {
 const params = await props.params;
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

export default async function Layout(props: { params: Promise<{ server: string }>; children: React.ReactNode }) {
 const params = await props.params;

 const { children } = props;

 return (
  <>
   <SideNav server={params.server} />
   <div className="ml-0 flex-1 p-6 pt-[5rem] md:pl-[18rem]">{children}</div>
  </>
 );
}
