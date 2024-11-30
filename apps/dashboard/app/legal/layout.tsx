import React from "react";

export default function MdxLayout({ children }: { children: React.ReactNode }) {
 return <div className="prose prose-invert mx-auto flex-1 p-6 pt-20 prose-code:before:content-none prose-code:after:content-none">{children}</div>;
}
