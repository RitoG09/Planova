"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveLocation = resolveLocation;
const axios_1 = __importDefault(require("axios"));
const apiKey = process.env.GOOGLE_PLACES_API_KEY;
async function resolveLocation(location) {
    try {
        const response = await axios_1.default.post("https://places.googleapis.com/v1/places:searchText", {
            textQuery: location,
            maxResultCount: 1,
        }, {
            headers: {
                "Content-Type": "application/json",
                "X-Goog-Api-Key": apiKey,
                "X-Goog-FieldMask": "places.displayName,places.formattedAddress,places.location,places.rating,places.photos",
            },
        });
        const place = response.data.places?.[0];
        if (!place) {
            throw new Error("Location not found");
        }
        return {
            latitude: place.location.latitude,
            longitude: place.location.longitude,
        };
    }
    catch (err) {
        console.error(err.response?.data || err);
        throw err;
    }
}
