import NextLink from "next/link";

export function Link({ href, children, ...props }) {
 return (
  <NextLink href={href}>
   <a {...props}>{children}</a>
  </NextLink>
 );
}
