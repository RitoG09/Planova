"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlaces = void 0;
const tools_1 = require("@langchain/core/tools");
const zod_1 = __importDefault(require("zod"));
const axios_1 = __importDefault(require("axios"));
const apiKey = process.env.GOOGLE_PLACES_API_KEY;
exports.getPlaces = (0, tools_1.tool)(async ({ location, preferences, }) => {
    if (!apiKey) {
        throw new Error("Missing GOOGLE_PLACES_API_KEY");
    }
    const textQuery = preferences?.length
        ? `${preferences.join(" ")} places in ${location}`
        : `tourist places in ${location}`;
    const url = `https://places.googleapis.com/v1/places:searchText`;
    const response = await axios_1.default.post(url, {
        textQuery,
        pageSize: 10,
    }, {
        headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": apiKey,
            "X-Goog-FieldMask": "places.displayName,places.formattedAddress,places.location,places.rating,places.types,places.photos",
        },
    });
    const results = response.data.places || [];
    // Normalize
    const places = results.map((place) => {
        const photoRef = place.photos?.[0]?.name;
        return {
            name: place.displayName?.text,
            address: place.formattedAddress,
            rating: place.rating,
            types: place.types,
            location: place.location,
            photoUrl: photoRef
                ? `https://places.googleapis.com/v1/${photoRef}/media?maxWidthPx=400&key=${apiKey}`
                : null,
        };
    });
    return places;
}, {
    name: "getPlaces",
    description: "Get tourist places for a location",
    schema: zod_1.default.object({
        location: zod_1.default.string(),
        preferences: zod_1.default.array(zod_1.default.string()).optional(),
    }),
});
