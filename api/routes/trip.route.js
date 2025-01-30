import express from "express";
import { savedTrip } from "../controllers/tripController.js";

const router = express.Router();

router.post("/savedtrip", savedTrip);

export default router;
