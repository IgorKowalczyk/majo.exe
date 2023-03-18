import Link from "next/link";

export function SecondaryButton({ children, ...props }) {
 if (props && props.href) {
  return (
   <Link {...props} className={`${props.className || ""} flex cursor-pointer items-center rounded bg-button-secondary px-4 py-2 font-inter leading-6 text-white duration-200 hover:bg-button-secondary-hover motion-reduce:transition-none`}>
    {children}
   </Link>
  );
 } else {
  return (
   <button {...props} className={`${props.className || ""} flex cursor-pointer items-center rounded bg-button-secondary px-4 py-2 font-inter leading-6 text-white duration-200 hover:bg-button-secondary-hover motion-reduce:transition-none`}>
    {children}
   </button>
  );
 }
}
