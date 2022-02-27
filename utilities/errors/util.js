"use strict";

module.exports = class LoginError extends Error {
 constructor(message, extra) {
  super(message);
  this.name = "LoginError";
  this.message = message;
  this.extra = extra;
  Error.captureStackTrace(this, this.constructor);
 }
};

module.exports = class MissingENV extends Error {
 constructor(message, value) {
  super(message);
  this.name = "MissingENV";
  this.message = message;
  this.value = value;
  Error.captureStackTrace(this, this.constructor);
 }
};
