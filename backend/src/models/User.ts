import mongoose, { Schema, Document } from "mongoose";

// Define the User interface
export interface User extends Document {
  name: string;
  email: string;
  password: string;
}

// Define the User schema
const UserSchema: Schema<User> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Create the User model
export const UserModel = mongoose.model<User>("User", UserSchema);
