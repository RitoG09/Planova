import Trip from "../models/trip.model.js";
import mongoose from "mongoose";

const validateHotelOptions = (hotels) => {
  if (!Array.isArray(hotels)) throw new Error("Invalid hotel options format");
  hotels.forEach((hotel) => {
    if (!hotel.hotelName || !hotel.hotelAddress || !hotel.price) {
      throw new Error("Missing required hotel fields");
    }
  });
};

export const getTripById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid trip ID" });
    }

    const trip = await Trip.findOne({
      _id: id,
      "tripDetails.userId": req.user._id, 
    });

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    res.status(200).json(trip);
  } catch (error) {
    console.error("Error fetching trip:", error);
    res.status(500).json({ message: "Failed to fetch trip" });
  }
};


export const savedTrip = async (req, res) => {
  try {
    if (!req.user?._id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    console.log("Received request body:", req.body);
    const { tripDetails, hotelOptions, itinerary } = req.body;

    // ---- VALIDATION ----
    if (!tripDetails?.location) {
      throw new Error("Location is required");
    }

    if (!tripDetails?.duration) {
      throw new Error("Duration is required");
    }

    if (!hotelOptions?.length) {
      throw new Error("Hotel options missing");
    }

    if (!itinerary || typeof itinerary !== "object") {
      throw new Error("Itinerary must be an object");
    }

    tripDetails.userId = req.user._id;

    // ---- ENSURE STRING TYPES (schema expects String) ----
    tripDetails.duration = String(tripDetails.duration);
    tripDetails.travelers = String(tripDetails.travelers);

    validateHotelOptions(hotelOptions);

    const newTrip = new Trip({
      tripDetails,
      hotelOptions,
      itinerary,
      // user: req.user.id, // Update this based on your auth system
    });

    const savedTrip = await newTrip.save();
    console.log("Saved trip:", savedTrip._id);

    res.status(201).json({
      success: true,
      trip: savedTrip,
    });
  } catch (error) {
    console.error("Error saving trip:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

export const getTripHistory = async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId) {
      return res.status(400).json({ message: "User ID not found in request." });
    }

    const trips = await Trip.find({ userId: userId }).sort({ createdAt: -1 });
    if (!trips || trips.length === 0) {
      return res.status(404).json({ message: "No trips found for this user" });
    }

    res.status(200).json(trips);
  } catch (error) {
    console.error("Error fetching trip history:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
