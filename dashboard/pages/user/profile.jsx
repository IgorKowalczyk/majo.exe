import { useSession } from "next-auth/react";
import { Container } from "@components/elements/blocks/Container";

export default function Profile() {
 const { data } = useSession();
 return (
  <Container>
   <div className="flex h-screen animate-movebackground flex-col items-center justify-center  gap-4 bg-primary-cubes bg-fixed bg-center">
    <h1 className="flex items-start text-center font-poppins text-5xl">Your profile</h1>
    <p>{JSON.stringify(data, null, 2)}</p>
   </div>
  </Container>
 );
}
