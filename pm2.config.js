module.exports = {
 apps: [
  {
   name: "Majo.exe - Bot",
   script: "./index.js",
   watch: true,
   node_args: "--trace-deprecation",
   exec_mode: "cluster",
   ignore_watch: ["[/\\]./", "node_modules", "database", "cache", "^.", "^[.]", ".git"],
   watch_options: {
    followSymlinks: false,
   },
   args: ["--color", "--bot"],
  },
  {
   name: "Majo.exe - Dashboard",
   script: "./index.js",
   watch: true,
   node_args: "--trace-deprecation",
   exec_mode: "cluster",
   ignore_watch: ["[/\\]./", "node_modules", "database", "cache", "^.", "^[.]", ".git"],
   watch_options: {
    followSymlinks: false,
   },
   args: ["--color", "--dashboard"],
  },
  {
   name: "Majo.exe - API",
   script: "./index.js",
   watch: true,
   node_args: "--trace-deprecation",
   exec_mode: "cluster",
   ignore_watch: ["[/\\]./", "node_modules", "database", "cache", "^.", "^[.]", ".git"],
   watch_options: {
    followSymlinks: false,
   },
   args: ["--color", "--api"],
  },
 ],
};
