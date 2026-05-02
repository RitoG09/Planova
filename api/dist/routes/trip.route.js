"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tripController_1 = require("../controllers/tripController");
const jwt_1 = require("../middleware/jwt");
const router = express_1.default.Router();
router.post("/savedtrip", jwt_1.verifyToken, tripController_1.savedTrip);
router.get("/:id", jwt_1.verifyToken, tripController_1.getTripById);
exports.default = router;
