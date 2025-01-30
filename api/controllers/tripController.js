import Trip from "../models/trip.model.js";

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
      // user: req.userId, // Update this based on your auth system
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
