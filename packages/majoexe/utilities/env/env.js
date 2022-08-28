require("dotenv").config();

module.exports = () => {
 require("./tests/shared")();
 if (process.argv.includes("--bot")) {
  require("./tests/bot")();
 }
 if (process.argv.includes("--dashboard")) {
  require("./tests/dashboard")();
 }
 if (process.argv.includes("--api")) {
  require("./tests/api")();
 }
};
