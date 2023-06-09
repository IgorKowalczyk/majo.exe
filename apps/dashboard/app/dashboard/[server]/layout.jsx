import { SideNav } from "@/components/nav/client/SideNav";

export default async function Layout({ children, params }) {
 return (
  <>
   <SideNav server={params.server} />
   <div className="lg:ml-64 ml-0">{children}</div>
  </>
 );
}
