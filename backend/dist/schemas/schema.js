"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItinerarySchema = exports.PlanSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.PlanSchema = zod_1.default.object({
    location: zod_1.default.string(),
    days: zod_1.default.number(),
    budget: zod_1.default.enum(["cheap", "mid", "luxury"]),
    travelers: zod_1.default.number(),
    preferences: zod_1.default.array(zod_1.default.string()),
});
exports.ItinerarySchema = zod_1.default.object({
    summary: zod_1.default.string(),
    recommendedHotel: zod_1.default.object({
        name: zod_1.default.string(),
        address: zod_1.default.string().optional(),
        rating: zod_1.default.number().optional(),
        photoUrl: zod_1.default.string().nullable().optional(),
    }),
    itinerary: zod_1.default.array(zod_1.default.object({
        day: zod_1.default.number(),
        title: zod_1.default.string(),
        weather: zod_1.default.string(),
        activities: zod_1.default.array(zod_1.default.object({
            place: zod_1.default.string(),
            notes: zod_1.default.string(),
        })),
    })),
    travelTips: zod_1.default.array(zod_1.default.string()),
});
