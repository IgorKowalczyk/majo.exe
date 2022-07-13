import mongoose, { model, Schema } from "mongoose";

const baseSchema = new Schema({
 access_token: String,
 token_type: String,
 jwt_token: String,
});

let mmodel;

if (mongoose.models.cookies_) {
 mmodel = model(`cookies_`);
} else {
 mmodel = model(`cookies_`, baseSchema);
}

export const User = mmodel;
