import express from "express";
import {
  savedTrip,
  getTripById,
  getTripHistory,
} from "../controllers/tripController.js";
// import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.post("/savedtrip", savedTrip);
router.get("/:id", getTripById);
router.get("/history", getTripHistory);

export default router;
