"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.PlanSchema = zod_1.default.object({
    location: zod_1.default.string(),
    days: zod_1.default.number(),
    budget: zod_1.default.enum(["cheap", "mid", "luxury"]),
    travelers: zod_1.default.number(),
    preferences: zod_1.default.array(zod_1.default.string()),
});
