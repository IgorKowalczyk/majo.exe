export default function handler(req, res) {
 const { invite } = req.query;
 if (!invite) return res.redirect("/dashboard");
 return res.redirect(`https://discord.com/api/oauth2/authorize?client_id=${process.env.CLIENT_ID}&permissions=1916267615&scope=guilds%20identify%20bot%20applications.commands&guild_id=${invite}&redirect_uri=${encodeURIComponent(process.env.NEXTAUTH_URL + "/dashboard")}&response_type=code`);
}
