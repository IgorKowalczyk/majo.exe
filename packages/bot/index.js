import client from "./util/client.js";
import loadEvents from "./handlers/event.js";

// Connect to Database
// -=-

// Load all events
loadEvents(client);
