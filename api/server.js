import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route.js";
import tripRoute from "./routes/trip.route.js";

const app = express();
dotenv.config();
mongoose.set("strictQuery", true);

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database is connected..");
  } catch (error) {
    console.log(error);
  }
};

app.use(
  cors({ origin: "https://planova-web.onrender.com", credentials: true })
);
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoute);
app.use("/trips", tripRoute);

//Error Middleware
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  return res.status(errorStatus).send(errorMessage);
});

app.listen(5050, () => {
  connect();
  console.log("backend is listening..");
});
