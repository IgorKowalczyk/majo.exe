import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });
import loadEvents from "./handlers/event.js";
import client from "./util/client.js";

loadEvents(client);
