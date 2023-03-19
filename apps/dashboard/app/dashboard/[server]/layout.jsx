"use server";

import { SideNav } from "components/nav/SideNav";
import { getSession } from "lib/session";
import { notFound } from "next/navigation";

export default async function Layout({ children, params }) {
 const { server } = params;
 const user = await getSession();
 if (!user) return notFound();

 return (
  <>
   <SideNav server={server} />
   <div className="ml-64">{children}</div>
  </>
 );
}
