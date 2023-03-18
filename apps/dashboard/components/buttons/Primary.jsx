import Link from "next/link";

export function PrimaryButton({ children, ...props }) {
 if (props && props.href) {
  return (
   <Link {...props} className={`${props.className || ""} flex cursor-pointer items-center rounded bg-button-primary px-4 py-2 font-inter leading-6 text-white duration-200 hover:bg-button-primary-hover motion-reduce:transition-none`}>
    {children}
   </Link>
  );
 } else {
  return (
   <button {...props} className={`${props.className || ""} flex cursor-pointer items-center rounded bg-button-primary px-4 py-2 font-inter leading-6 text-white duration-200 hover:bg-button-primary-hover motion-reduce:transition-none`}>
    {children}
   </button>
  );
 }
}
