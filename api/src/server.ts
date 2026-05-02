import "dotenv/config";
import dotenv from "dotenv";
import express, { Application } from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route";
import tripRoute from "./routes/trip.route";
import { HumanMessage } from "@langchain/core/messages";
import { graph } from "./graph/graph";

dotenv.config();
const app: Application = express();
mongoose.set("strictQuery", true);

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "");
    console.log("Database is connected..");
  } catch (error) {
    console.log(error);
  }
};

const allowedOrigins = [
  "https://planova-web.onrender.com",
  "http://localhost:5173",
];

app.post("/trip", async (req: any, res: any) => {
  try {
    const { query } = req.body;

    const result = await graph.invoke({
      messages: [new HumanMessage(query)],
    });

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Something went wrong",
    });
  }
});

app.use(
  cors({
    origin: function (origin: any, callback: any) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoute);
app.use("/trips", tripRoute);

//Error Middleware
app.use((err: any, req: any, res: any, next: any) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  return res.status(errorStatus).send(errorMessage);
});

app.listen(5050, () => {
  connect();
  console.log("backend is listening..");
});
