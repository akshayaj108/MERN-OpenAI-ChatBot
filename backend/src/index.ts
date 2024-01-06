import app from "./app.js";
import { connectDB } from "./db/connection.js";

const PORT = process.env.PORT || 5000;

//cloud db connection function
connectDB()
  .then((res) => console.log(res))
  .catch((e) => console.log("Not Connected"));

app.listen(PORT, () => console.log("Server is running"));
