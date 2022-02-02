module.exports = (app) => {
 app.get("/api/user/:userID", (req, res, next) => {
  if (!req.params.userID) {
   res.json({
    error: true,
    message: "Invaild user ID!",
   });
  }
  res.send(req.params.userID);
 });
};
