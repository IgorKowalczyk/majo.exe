import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });
import client from "./util/client.js";
import loadEvents from "./handlers/event.js";

loadEvents(client);
