import axios from "axios";

const BASE_URL = "https://places.googleapis.com/v1/places:searchText";

const config = {
  headers: {
    "Content-Type": "application/json", // Fixed typo
    "X-Goog-Api-Key": import.meta.env.VITE_GOOGLE_PLACE_API_KEY,
    "X-Goog-FieldMask": "places.photos,places.displayName,places.id", // Comma-separated string
  },
};

export const GetPlaceDetails = (data) => {
  return axios.post(BASE_URL, data, config); // Return the Axios promise
};

export const PHOTO_REF_URL =
  "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=900&maxWidthPx=900&key=" +
  import.meta.env.VITE_GOOGLE_PLACE_API_KEY;
