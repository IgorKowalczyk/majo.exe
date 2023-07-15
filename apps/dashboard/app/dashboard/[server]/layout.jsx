import { SideNav } from "@/components/nav/client/SideNav";

export default async function Layout({ children, params }) {
 return (
  <>
   <SideNav server={params.server} />
   <div className="ml-0 flex-1 p-6 pt-[5.5rem] md:pl-[17.5rem]">{children}</div>
  </>
 );
}
