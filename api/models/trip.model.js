import mongoose from "mongoose";
const { Schema } = mongoose;

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
  location: { type: String, required: true },
  duration: { type: String, required: true },
  budget: { type: String, required: true },
  travelers: { type: String, required: true },
});

const tripSchema = new Schema(
  {
    tripDetails: { type: tripDetailSchema, required: true },
    hotelOptions: [hotelSchema],
    itinerary: { type: Map, of: dayItinerarySchema },
  },
  { timestamps: true }
);

export default mongoose.model("Trip", tripSchema);
