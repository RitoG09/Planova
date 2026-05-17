"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHotels = void 0;
const axios_1 = __importDefault(require("axios"));
const tools_1 = require("@langchain/core/tools");
const zod_1 = require("zod");
const location_tool_1 = require("./location.tool");
const apiKey = process.env.GOOGLE_PLACES_API_KEY;
exports.getHotels = (0, tools_1.tool)(async ({ location }) => {
    const coordinates = await (0, location_tool_1.resolveLocation)(location);
    const response = await axios_1.default.post("https://places.googleapis.com/v1/places:searchNearby", {
        includedTypes: ["lodging"],
        maxResultCount: 10,
        locationRestriction: {
            circle: {
                center: {
                    latitude: coordinates.latitude,
                    longitude: coordinates.longitude,
                },
                radius: 6000,
            },
        },
    }, {
        headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": apiKey,
            "X-Goog-FieldMask": "places.displayName,places.formattedAddress,places.location,places.rating,places.photos",
        },
    });
    const hotels = response.data.places || [];
    return hotels.map((hotel) => {
        const photoName = hotel.photos?.[0]?.name;
        return {
            name: hotel.displayName.text,
            address: hotel.formattedAddress,
            rating: hotel.rating,
            location: hotel.location,
            photoUrl: photoName
                ? `https://places.googleapis.com/v1/${photoName}/media?key=${apiKey}&maxHeightPx=900&maxWidthPx=900`
                : null,
        };
    });
}, {
    name: "getHotels",
    description: "Get Hotels recommendation for a location",
    schema: zod_1.z.object({ location: zod_1.z.string() }),
});
