import { useSession, signIn, signOut } from "next-auth/react";

export default function Component() {
 const { data: session } = useSession();

 if (session) {
  return (
   <>
    <button onClick={() => signOut()} className="flex h-8 cursor-pointer items-center rounded bg-button-action-primary px-4 py-0 leading-6 text-white duration-200 hover:bg-button-action-hover motion-reduce:transition-none">
     <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet" viewBox="-5 -3 24 24">
      <path fill="currentColor" d="M3.414 7.828h5.642a1 1 0 1 1 0 2H3.414l1.122 1.122a1 1 0 1 1-1.415 1.414L.293 9.536a.997.997 0 0 1 0-1.415L3.12 5.293a1 1 0 0 1 1.415 1.414L3.414 7.828zM13 0a1 1 0 0 1 1 1v16a1 1 0 0 1-2 0V1a1 1 0 0 1 1-1z" />
     </svg>{" "}
     Log Out
    </button>
   </>
  );
 }
 return (
  <>
   <button onClick={() => signIn()} className="flex h-8 cursor-pointer items-center rounded bg-button-primary px-4 py-0 leading-6 text-white duration-200 hover:bg-button-primary-hover motion-reduce:transition-none">
    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet" viewBox="-5 -3 24 24">
     <path fill="currentColor" d="M6.641 9.828H1a1 1 0 1 1 0-2h5.641l-1.12-1.12a1 1 0 0 1 1.413-1.415L9.763 8.12a.997.997 0 0 1 0 1.415l-2.829 2.828A1 1 0 0 1 5.52 10.95l1.121-1.122zM13 0a1 1 0 0 1 1 1v16a1 1 0 0 1-2 0V1a1 1 0 0 1 1-1z" />
    </svg>{" "}
    Login
   </button>
  </>
 );
}
