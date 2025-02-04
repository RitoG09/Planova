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

export const savedTrip = async (req, res) => {
  try {
    console.log("Received request body:", req.body);
    const { tripDetails, hotelOptions, itinerary, user } = req.body;

    // Temporary validation
    if (!tripDetails?.location) throw new Error("Location is required");
    if (!hotelOptions?.length) throw new Error("Hotel options missing");

    const newTrip = new Trip({
      tripDetails,
      hotelOptions,
      itinerary,
      // user: req.user.id, // Update this based on your auth system
    });
    validateHotelOptions(hotelOptions);
    const savedTrip = await newTrip.save();
    console.log("Saved trip:", savedTrip);

    res.status(201).json(savedTrip);
  } catch (error) {
    console.error("Error saving trip:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

export const getTripById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid trip ID format" });
    }

    if (mongoose.connection.readyState !== 1) {
      return res.status(500).json({ message: "Database connection error" });
    }

    const trip = await Trip.findById(id);

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    res.status(200).json(trip);
  } catch (error) {
    console.error("Error fetching trip by ID:", error); // Log full error
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getTripHistory = async (req, res) => {
  try {
    const userId = req.user?.id; // ✅ Extract user ID from decoded token

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const trips = await Trip.find({ user: userId }).sort({ createdAt: -1 }); // ✅ Fetch trips of logged-in user

    res.status(200).json(trips);
  } catch (error) {
    console.error("Error fetching trip history:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
