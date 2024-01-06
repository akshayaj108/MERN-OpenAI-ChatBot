import { connect, disconnect } from "mongoose";

async function connectDB() {
  let msg;
  try {
    await connect(process.env.MONGODB_URL);
    msg = `MongoDB connected successfully `;
    return msg;
  } catch (error) {
    // console.log("error==", error);
    msg = "Could not be connect to MongoDB cloud due to some reason  ";
    return msg;
  }
}

async function disconnectDB() {
  try {
    await disconnect();
    console.log("Database MongoDB Cloud is disconnected ");
  } catch (error) {
    console.log("Could not be disconnect MongoDB cloud due to some reason  ");
    console.log("error==", error);
  }
}

export { connectDB, disconnectDB };
