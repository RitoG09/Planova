"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const placeSchema = new Schema({
    placeName: { type: String, required: true },
    placeDetails: { type: String, required: true },
    placeImageUrl: String,
    geoCoordinates: {
        latitude: Number,
        longitude: Number,
    },
    ticketPricing: String,
    rating: {
        type: Number,
        min: 0,
        max: 5,
        set: (v) => (v === "N/A" ? null : v), // Convert "N/A" to null
    },
    timeTravel: String,
});
const dayItinerarySchema = new Schema({
    theme: { type: String, required: true },
    bestTimeToVisit: String,
    places: [placeSchema],
});
const hotelSchema = new Schema({
    hotelName: { type: String, required: true },
    hotelAddress: { type: String, required: true },
    price: { type: String, required: true },
    hotelImageUrl: String,
    geoCoordinates: {
        latitude: Number,
        longitude: Number,
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        set: (rating) => (rating === "N/A" ? null : rating), // Convert "N/A" to null
    },
    description: String,
});
const tripDetailSchema = new Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    location: { type: String, required: true },
    duration: { type: String, required: true },
    budget: { type: String, required: true },
    travelers: { type: String, required: true },
});
const tripSchema = new Schema({
    tripDetails: { type: tripDetailSchema, required: true },
    hotelOptions: [hotelSchema],
    itinerary: { type: Map, of: dayItinerarySchema },
}, { timestamps: true });
exports.default = mongoose_1.default.model("Trip", tripSchema);
