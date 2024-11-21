import authOptions from "lib/authOptions";
import { getServerSession } from "next-auth/next";

export async function getSession() {
 return await getServerSession(authOptions);
}

export async function getCurrentUser() {
 const session = await getSession();

 return session?.user;
}
