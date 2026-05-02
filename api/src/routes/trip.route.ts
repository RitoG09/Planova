import express from "express";
import { savedTrip, getTripById } from "../controllers/tripController";
import { verifyToken } from "../middleware/jwt";

const router = express.Router();

router.post("/savedtrip", verifyToken, savedTrip);
router.get("/:id", verifyToken, getTripById);

export default router;
