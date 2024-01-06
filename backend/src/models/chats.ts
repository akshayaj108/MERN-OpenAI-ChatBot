import { Schema } from "mongoose";
import { randomUUID } from "crypto";

const chatSchema = new Schema({
  id: {
    type: String,
    default: randomUUID,
  },
  role: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

export default chatSchema;
