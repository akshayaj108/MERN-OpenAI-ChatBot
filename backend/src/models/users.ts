import { Schema, model } from "mongoose";
import chatSchema from "./chats.js";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  chats: [chatSchema],
});

export default model("User", userSchema);
