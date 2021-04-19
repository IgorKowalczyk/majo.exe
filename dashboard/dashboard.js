if (process.env.DASHBOARD = "true") {
 console.log("[HOST] Getting dashboard config file...")
 const webrun = require("../../dashboard/dashboard");
 webrun(client);
}
