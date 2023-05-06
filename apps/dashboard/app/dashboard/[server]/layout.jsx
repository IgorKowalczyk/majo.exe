import { SideNav } from "components/nav/SideNav";

export default async function Layout({ children, params }) {
 return (
  <>
   <SideNav server={params.server} />
   <div className="ml-64">{children}</div>
  </>
 );
}
