import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
 return <div className="ml-0 flex-1 p-6 pt-20">{children}</div>;
}
