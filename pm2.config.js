module.exports = {
 apps: [
  {
   name: "Majo.exe - Bot",
   script: "./index.js",
   watch: true,
   exec_mode: "cluster",
   ignore_watch: ["[/\\]./", "node_modules", "database", "cache", "^.", "^[.]"],
   watch_options: {
    followSymlinks: false,
   },
  },
  {
   name: "Majo.exe - Dashboard",
   script: "./dashboard/run.js",
   watch: true,
   exec_mode: "fork",
   ignore_watch: ["[/\\]./", "node_modules", "database", "cache", "^.", "^[.]"],
   watch_options: {
    followSymlinks: false,
   },
  },
 ],
};
