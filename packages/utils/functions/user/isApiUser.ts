import type { APIUser } from "discord-api-types/v10";
import type { User } from "discord.js";

export function isAPIUser(user: APIUser | User): user is APIUser {
 return (user as APIUser).id !== undefined;
}
