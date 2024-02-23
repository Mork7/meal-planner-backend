import dotenv from "dotenv";
dotenv.config("/home/mork/Documents/meal-planner/backend/.env");
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoute from "./routes/userRoute.js";

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5555;

app.use("/users", userRoute);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("App connected to database");
    // this is the port we are listening to. We only want this to run if we connect successfully to the db.
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
