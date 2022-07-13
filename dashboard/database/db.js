import { User } from "./entities/user";
import { connect } from "mongoose";

connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

export async function createUser(options) {
 const res = await new User(options).save().catch(console.log);
 return res;
}

export async function deleteUser(options) {
 const res = await User.findOneAndDelete(options);
 return res;
}

export async function getUser(options) {
 const res = await User.findOne(options);
 return res;
}
