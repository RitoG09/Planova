import axios from "axios";
import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { resolveLocation } from "./location.tool";

const apiKey = process.env.GOOGLE_PLACES_API_KEY!;

export const getHotels = tool(
  async ({ location }: { location: string }) => {
    const coordinates = await resolveLocation(location);
    const response = await axios.post(
      "https://places.googleapis.com/v1/places:searchNearby",
      {
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
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask":
            "places.displayName,places.formattedAddress,places.location,places.rating,places.photos",
        },
      },
    );
    const hotels = (response as any).data.places || [];

    return hotels.map((hotel: any) => {
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
  },
  {
    name: "getHotels",
    description: "Get Hotels recommendation for a location",
    schema: z.object({ location: z.string() }),
  },
);
