module.exports = class MissingENV extends Error {
 constructor(message, value) {
  super(message);
  this.name = "MissingENV";
  this.message = message;
  this.value = value;
  Error.captureStackTrace(this, this.constructor);
 }
};
