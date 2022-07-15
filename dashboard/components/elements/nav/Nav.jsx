import { meta, social } from "@/config";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

export function Nav() {
 const { data: session } = useSession();
 return (
  <nav className="fixed flex w-full items-center bg-[#141f2f]/90 py-4 text-left text-xl shadow-lg backdrop-blur-[9px]">
   <Link href="/" className=" font-poppins text-lg text-white">
    <div className="flex cursor-pointer items-center gap-2 px-4 duration-200 hover:opacity-90 motion-reduce:transition-none">
     <Image className="rounded-full" src={social.logo} alt="Majo.exe" width={36} height={36} />
     <h1 className="font-poppins">{meta.title}</h1>
    </div>
   </Link>
   <div className="ml-auto mr-4">
    {session ? (
     <div className="flex">
      <Link href="/dashboard">
       <a className="flex h-9 cursor-pointer items-center rounded px-2 py-0 font-poppins text-lg leading-6 text-white duration-200 hover:bg-background-secondary motion-reduce:transition-none">
        <svg className="mr-2 h-5 w-5" aria-hidden="true" role="img"  viewBox="0 0 24 24">
         <path fill="currentColor" d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12z" />
        </svg>
        Dashboard
       </a>
      </Link>
      {session?.user && (
       <>
        <Menu as="div" className="relative inline-block text-left">
         <div>
          <Menu.Button className="ml-4 flex cursor-pointer items-center gap-3 duration-200 motion-reduce:transition-none">
           {({ open }) => (
            <div className={`${open ? "opacity-80" : "hover:opacity-80"} flex select-none items-center gap-3 duration-200 motion-reduce:transition-none `}>
             <img width={36} height={36} className="rounded-full" src={session.user.image} loading="lazy" alt={`${session.user.name} Avatar`} />
             <span>{session.user.name}</span>
            </div>
           )}
          </Menu.Button>
         </div>
         <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-700 rounded-md bg-background-menu p-1 shadow-2xl">
           <div className="px-1 py-1 ">
            <Menu.Item>
             {({ active }) => (
              <button className={`${active ? "bg-button-primary text-white" : "text-gray-400"} group my-1 flex w-full items-center rounded-md px-2 py-2 text-sm duration-200 motion-reduce:transition-none`}>
               <svg className="mr-2 h-5 w-5" aria-hidden="true" role="img"  viewBox="0 0 24 24">
                <g fill="none" stroke="currentColor" stroke-width="2">
                 <circle cx="12" cy="7" r="5" />
                 <path stroke-linecap="round" stroke-linejoin="round" d="M17 14h.352a3 3 0 0 1 2.976 2.628l.391 3.124A2 2 0 0 1 18.734 22H5.266a2 2 0 0 1-1.985-2.248l.39-3.124A3 3 0 0 1 6.649 14H7" />
                </g>
               </svg>{" "}
               Profile
              </button>
             )}
            </Menu.Item>
            <Menu.Item>
             {({ active }) => (
              <button className={`${active ? "bg-button-primary text-white" : "text-gray-400"} group my-1 flex w-full items-center rounded-md px-2 py-2 text-sm duration-200 motion-reduce:transition-none`}>
               <svg className="mr-2 h-5 w-5" aria-hidden="true" role="img"  viewBox="0 0 24 24">
                <g fill="none" stroke="currentColor" stroke-width="2">
                 <path d="M14 3.269C14 2.568 13.432 2 12.731 2H11.27C10.568 2 10 2.568 10 3.269c0 .578-.396 1.074-.935 1.286c-.085.034-.17.07-.253.106c-.531.23-1.162.16-1.572-.249a1.269 1.269 0 0 0-1.794 0L4.412 5.446a1.269 1.269 0 0 0 0 1.794c.41.41.48 1.04.248 1.572a7.946 7.946 0 0 0-.105.253c-.212.539-.708.935-1.286.935C2.568 10 2 10.568 2 11.269v1.462C2 13.432 2.568 14 3.269 14c.578 0 1.074.396 1.286.935c.034.085.07.17.105.253c.231.531.161 1.162-.248 1.572a1.269 1.269 0 0 0 0 1.794l1.034 1.034a1.269 1.269 0 0 0 1.794 0c.41-.41 1.04-.48 1.572-.249c.083.037.168.072.253.106c.539.212.935.708.935 1.286c0 .701.568 1.269 1.269 1.269h1.462c.701 0 1.269-.568 1.269-1.269c0-.578.396-1.074.935-1.287c.085-.033.17-.068.253-.104c.531-.232 1.162-.161 1.571.248a1.269 1.269 0 0 0 1.795 0l1.034-1.034a1.269 1.269 0 0 0 0-1.794c-.41-.41-.48-1.04-.249-1.572c.037-.083.072-.168.106-.253c.212-.539.708-.935 1.286-.935c.701 0 1.269-.568 1.269-1.269V11.27c0-.701-.568-1.269-1.269-1.269c-.578 0-1.074-.396-1.287-.935a7.755 7.755 0 0 0-.105-.253c-.23-.531-.16-1.162.249-1.572a1.269 1.269 0 0 0 0-1.794l-1.034-1.034a1.269 1.269 0 0 0-1.794 0c-.41.41-1.04.48-1.572.249a7.913 7.913 0 0 0-.253-.106C14.396 4.343 14 3.847 14 3.27Z" />
                 <path d="M16 12a4 4 0 1 1-8 0a4 4 0 0 1 8 0Z" />
                </g>
               </svg>{" "}
               Settings
              </button>
             )}
            </Menu.Item>
           </div>
           <div className="px-1 py-1">
            <Menu.Item>
             {({ active }) => (
              <button className={`${active ? "bg-button-primary text-white" : "text-gray-400"} group my-1 flex w-full items-center rounded-md px-2 py-2 text-sm duration-200 motion-reduce:transition-none`}>
             
               <svg className="mr-2 h-5 w-5" aria-hidden="true" role="img" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M3 6h18M3 12h10M3 18h15"/></svg>
               {" "}
               Dashboard
              </button>
             )}
            </Menu.Item>
            <Menu.Item>
             {({ active }) => (
              <button className={`${active ? "bg-button-primary text-white" : "text-gray-400"} group my-1 flex w-full items-center rounded-md px-2 py-2 text-sm duration-200 motion-reduce:transition-none`}>
               <svg className="mr-2 h-5 w-5" aria-hidden="true" role="img" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 3L6 21M18 3l-4 18M4 8h17M3 16h17"/></svg>
               {" "}
               Your servers
              </button>
             )}
            </Menu.Item>
           </div>
           <div className="px-1 py-1">
            <Menu.Item>
             {({ active }) => (
              <button onClick={() => signOut()} className={`${active ? "bg-button-action-primary text-white" : "text-gray-400"} group my-1 flex w-full items-center rounded-md px-2 py-2 text-sm duration-200 motion-reduce:transition-none`}>
               <svg className="mr-2 h-5 w-5" aria-hidden="true" role="img" viewBox="0 0 24 24">
                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 6H3m18 0l-4 4m4-4l-4-4M3 18h18M3 18l4 4m-4-4l4-4" />
               </svg>{" "}
               Logout
              </button>
             )}
            </Menu.Item>
           </div>
          </Menu.Items>
         </Transition>
        </Menu>
       </>
      )}
     </div>
    ) : (
     <div className="flex justify-center items-center gap-2">
     <Link href="/discord">
     <a className="flex h-9 cursor-pointer items-center rounded px-2 py-0 font-poppins text-lg leading-6 text-white duration-200 hover:bg-background-secondary motion-reduce:transition-none">
      <svg className="mr-2 h-5 w-5" aria-hidden="true" role="img" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path stroke-linecap="round" d="M10 8.484C10.5 7.494 11 7 12 7c1.246 0 2 .989 2 1.978s-.5 1.483-2 2.473V13m0 3.5v.5"/></g></svg>
      Support
     </a>
    </Link>
     <button onClick={() => signIn()} className="flex h-9 cursor-pointer items-center rounded px-2 py-0 font-poppins text-lg leading-6 text-white duration-200 bg-button-primary hover:button-primary-hover motion-reduce:transition-none">
      <svg className="mr-2 h-5 w-5" aria-hidden="true" role="img"  viewBox="0 0 24 24">
       <path fill="currentColor" d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12z" />
      </svg>
      Login with Discord 
     </button>
     </div>
    )}
   </div>
  </nav>
 );
}
