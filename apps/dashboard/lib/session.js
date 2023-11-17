import authOptions from "lib/authOptions";
import { getServerSession } from "next-auth/next";

/**
 * Get the current session from the server
 *
 * @returns {Promise<Object>} - The session object
 */
export async function getSession() {
 return await getServerSession(authOptions);
}

/**
 * Get the current user from the server
 *
 * @returns {Promise<Object>} - The user object
 */
export async function getCurrentUser() {
 const session = await getSession();

 return session?.user;
}
