import { dashboardConfig } from "@majoexe/config";
import { Metadata } from "next";
import { NavigationGuardProvider } from "next-navigation-guard";
import { SideNavigation } from "@/components/nav/SideNavigation";

export function generateMetadata(): Metadata {
  return {
    openGraph: {
      title: dashboardConfig.title,
      description: dashboardConfig.description,
      url: dashboardConfig.url,
      siteName: dashboardConfig.title,
    },
  };
}

export default async function Layout(props: { params: Promise<{ server: string }>; children: React.ReactNode }) {
  const params = await props.params;
  const { children } = props;

  return (
    <NavigationGuardProvider>
      <SideNavigation server={params.server} />
      <div className="ml-0 flex-1 p-6 pt-20 md:pl-72">{children}</div>
    </NavigationGuardProvider>
  );
}
