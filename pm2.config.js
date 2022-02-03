module.exports = {
 apps: [
  {
   name: "Majo.exe - Bot",
   script: "./majo.js",
   watch: true,
   node_args: "--trace-deprecation",
   exec_mode: "cluster",
   ignore_watch: ["[/\\]./", "node_modules", "database", "cache", "^.", "^[.]"],
   watch_options: {
    followSymlinks: false,
   },
   args: ["--color", "--bot"],
  },
  {
   name: "Majo.exe - Dashboard",
   script: "./majo.js",
   watch: true,
   node_args: "--trace-deprecation",
   exec_mode: "cluster",
   ignore_watch: ["[/\\]./", "node_modules", "database", "cache", "^.", "^[.]"],
   watch_options: {
    followSymlinks: false,
   },
   args: ["--color", "--dashboard"],
  },
  {
   name: "Majo.exe - API",
   script: "./majo.js",
   watch: true,
   node_args: "--trace-deprecation",
   exec_mode: "cluster",
   ignore_watch: ["[/\\]./", "node_modules", "database", "cache", "^.", "^[.]"],
   watch_options: {
    followSymlinks: false,
   },
   args: ["--color", "--api"],
  },
 ],
};
