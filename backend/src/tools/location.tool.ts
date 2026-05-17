import axios from "axios";

const apiKey = process.env.GOOGLE_PLACES_API_KEY!;

export async function resolveLocation(location: string) {
  try {
    const response = await axios.post(
      "https://places.googleapis.com/v1/places:searchText",
      {
        textQuery: location,
        maxResultCount: 1,
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

    const place = (response as any).data.places?.[0];

    if (!place) {
      throw new Error("Location not found");
    }

    return {
      latitude: place.location.latitude,
      longitude: place.location.longitude,
    };
  } catch (err: any) {
    console.error(err.response?.data || err);
    throw err;
  }
}
