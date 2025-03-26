import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import {
  AI_PROMPT,
  selectBudgetOption,
  selectTravelesList,
} from "../../constants/options";
import { Button } from "../../components/ui/button";
import toast, { Toaster } from "react-hot-toast";
import { chatSession } from "../../service/AiModal";
import newRequest from "../../utils/newRequest";
import User from "../../../api/models/user.model";
import { useNavigate } from "react-router-dom";
import {
  Plane,
  Clock,
  Wallet,
  Users,
  Palmtree,
  ArrowRight,
} from "lucide-react";

function NewTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onGenerateTrip = async () => {
    if (
      !formData?.location ||
      !formData?.noOfDays ||
      !formData?.budget ||
      !formData?.people
    ) {
      toast.error("Please provide all preferences.");
      return;
    }

    setIsLoading(true);
    try {
      const FINAL_PROMPT = AI_PROMPT.replace(
        "{location}",
        formData.location.label
      )
        .replace("{totalDays}", formData.noOfDays)
        .replace("{traveller}", formData.people)
        .replace("{budget}", formData.budget);

      // Get AI response
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const responseText = result?.response?.text();

      // Extract JSON from the response text
      const jsonStart = responseText.indexOf("{");
      const jsonEnd = responseText.lastIndexOf("}") + 1;
      const jsonString = responseText.slice(jsonStart, jsonEnd);
      const tripData = JSON.parse(jsonString);

      // Save trip data
      const response = await newRequest.post("/trips/savedtrip", {
        location: formData.location.label,
        days: formData.noOfDays,
        budget: formData.budget,
        people: formData.people,
        itinerary: tripData.itinerary,
        hotelOptions: tripData.hotelOptions,
        tripDetails: tripData.tripDetails,
      });

      const tripId = response.data._id; // Get the trip ID from the response
      toast.success("Trip generated and saved successfully!");
      console.log("Saved trip:", response.data);
      navigate("/view-trip/" + tripId); // Navigate to the new trip page with the trip ID
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "Failed to save trip");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="text-center p-8">Loading trip details...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
              <Palmtree className="text-yellow-600" size={32} />
              Dream Trip Planner
            </h1>
            <p className="text-lg text-center mt-4 text-transparent bg-clip-text bg-gradient-to-l from-blue-600 to-yellow-700">
              "Every great journey begins with a plan! Share your preferences,
              and let us craft the perfect adventure for you."
            </p>
          </div>

          {/* Main Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
            {/* Destination */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-gray-700 font-medium">
                <Plane className="text-yellow-600" size={20} />
                Where do you want to go?
              </label>
              <GooglePlacesAutocomplete
                apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                selectProps={{
                  place,
                  onChange: (value) => {
                    setPlace(value);
                    handleInputChange("location", value);
                  },
                }}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition"
              />
              {/* <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Enter destination"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              /> */}
            </div>

            {/* Duration */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-gray-700 font-medium">
                <Clock className="text-yellow-600" size={20} />
                Duration (days)
              </label>
              <input
                type="number"
                placeholder="0"
                min="1"
                max="14"
                onChange={(e) => handleInputChange("noOfDays", e.target.value)}
                className="border-2 rounded-sm px-5 py-1"
              />
            </div>

            {/* Budget */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-gray-700 font-medium">
                <Wallet className="text-yellow-600" size={20} />
                Budget
              </label>
              <div className="grid grid-cols-3 gap-4">
                {["cheap", "moderate", "luxury"].map((option) => (
                  <button
                    key={option}
                    onClick={() => handleInputChange("budget", option)}
                    className={`px-4 py-3 rounded-lg border ${
                      formData.budget === option
                        ? "bg-yellow-600 text-white border-yellow-600"
                        : "border-gray-300 text-gray-600 hover:border-yellow-600"
                    } transition duration-200 capitalize`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Accompany */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-gray-700 font-medium">
                <Users className="text-yellow-600" size={20} />
                Who's Coming?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {["solo", "couple", "family", "friends"].map((option) => (
                  <button
                    key={option}
                    onClick={() => handleInputChange("people", option)}
                    className={`px-4 py-3 rounded-lg border ${
                      formData.people === option
                        ? "bg-yellow-600 text-white border-yellow-600"
                        : "border-gray-300 text-gray-600 hover:border-yellow-600"
                    } transition duration-200 capitalize`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={onGenerateTrip}
              className="w-full bg-gradient-to-r from-yellow-900 to-yellow-400 text-white py-4 rounded-lg font-medium flex items-center justify-center gap-2 hover:from-yellow-400 hover:to-yellow-900 transition duration-200 shadow-lg"
            >
              Generate My Trip
              <ArrowRight size={20} />
            </button>
          </div>

          {/* Background Image
          <div
            className="fixed inset-0 -z-10 opacity-5"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1935&q=80")',
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div> */}
        </div>
      </div>
    </div>
  );
}

export default NewTrip;
