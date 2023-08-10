import dotenv from "dotenv";
dotenv.config({ path: "../../../.env" });

export const dashboardConfig = {
 enabled: true, // boolean. Is bot using dashboard
 link: process.env.NEXT_PUBLIC_URL, // string. Dashboard main url
};
