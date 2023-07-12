import { SideNav } from "@/components/nav/client/SideNav";

export default async function Layout({ children, params }) {
 return (
  <>
   <SideNav server={params.server} />
   <div className="ml-0 lg:ml-64">{children}</div>
  </>
 );
}
