import express from "express";
import { savedTrip, getTripHistory } from "../controllers/tripController.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.post("/savedtrip",verifyToken, savedTrip);
router.get("/history", verifyToken, getTripHistory);

export default router;
