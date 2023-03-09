import { Container } from "../components/blocks/Container";
import { getSession } from "next-auth/react";

export default function Dashboard() {
 return (
  <Container>
   <div className="flex min-h-screen flex-col justify-center gap-4">
    <h1 className="flex items-center justify-center gap-4 text-center font-inter text-5xl font-bold">
     Dashboard
     <div className="box-border h-9 w-9 animate-[spin_500ms_linear_infinite] rounded-[50%] border-[4px] border-solid border-transparent border-t-white border-l-white motion-reduce:transition-none" />
    </h1>
    <h2 className="text-center font-inter text-xl opacity-50">🛠️ Work is still going on here! Come back again later! 🛠️</h2>
    <div className="flex flex-col gap-4">
     {[...Array(5)].map((_, i) => (
      <div key={i} className="flex flex-row items-center justify-center gap-4">
       <div className="w-16 h-16 rounded-full bg-button-secondary animate-pulse" style={{ animationDelay: `${150 * i - 50}ms` }} />
       <div className="w-40 h-8 rounded-full bg-button-secondary animate-pulse" style={{ animationDelay: `${150 * i - 50}ms` }} />
      </div>
     ))}
    </div>
   </div>
  </Container>
 );
}

export async function getServerSideProps(context) {
 const session = await getSession(context);
 if (!session) return { redirect: { destination: "/", permanent: false } };

 return { props: { session } };
}
