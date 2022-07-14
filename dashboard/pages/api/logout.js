import { parse, serialize } from "cookie";
import { credentials } from "@/config";
import { deleteUser } from "@/database/db";

export default async (_, res) => {
	res.setHeader("Set-Cookie", [
		serialize(credentials.cookieName, "", {
			maxAge: -1,
			path: "/",
		}),
	]);

	const token = parse(_.headers.cookie)[credentials.cookieName];
	await deleteUser({
		jwt_token: token
	});

	res.writeHead(302, { Location: "/" });
	res.end();
};