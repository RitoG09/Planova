import { tool } from "@langchain/core/tools";
import z from "zod";
import axios from "axios";

const apiKey = process.env.GOOGLE_PLACES_API_KEY;

export const getPlaces = tool(
  async ({
    location,
    preferences,
  }: {
    location: string;
    preferences?: string[];
  }) => {
    if (!apiKey) {
      throw new Error("Missing GOOGLE_PLACES_API_KEY");
    }

    const textQuery = preferences?.length
      ? `${preferences.join(" ")} places in ${location}`
      : `tourist places in ${location}`;

    const url = `https://places.googleapis.com/v1/places:searchText`;
    const response = await axios.post<any>(
      url,
      {
        textQuery,
        pageSize: 10,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask":
            "places.displayName,places.formattedAddress,places.location,places.rating,places.types,places.photos",
        },
      },
    );
    const results = response.data.places || [];
    // Normalize
    const places = results.map((place: any) => {
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
  },
  {
    name: "getPlaces",
    description: "Get tourist places for a location",
    schema: z.object({
      location: z.string(),
      preferences: z.array(z.string()).optional(),
    }),
  },
);
