import express from "express";
import { savedTrip, getTripById } from "../controllers/tripController.js";

const router = express.Router();

router.post("/savedtrip", savedTrip);
router.get("/:id", getTripById);

export default router;