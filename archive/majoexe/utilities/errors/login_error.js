module.exports = class LoginError extends Error {
 constructor(message, extra) {
  super(message);
  this.name = "LoginError";
  this.message = message;
  this.extra = extra;
  Error.captureStackTrace(this, this.constructor);
 }
};
