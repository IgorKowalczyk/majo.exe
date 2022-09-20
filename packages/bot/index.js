import client from "./util/client.js";
import load_events from "./handlers/event.js";

// Connect to Database
// -=-

// Load all events
load_events(client);

