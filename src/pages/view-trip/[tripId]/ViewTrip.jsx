import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import newRequest from "../../../utils/newRequest";
import { Button } from "../../../components/ui/button";
import { GetPlaceDetails, PHOTO_REF_URL } from "../../../service/GlobalApi";

function ViewTrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [PhotoUrl, setPhotoUrl] = useState();
  const [HotelPhotoUrl, setHotelPhotoUrl] = useState();

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const response = await newRequest.get(`/trips/${tripId}`);
        setTrip(response.data);
      } catch (err) {
        if (err.response) {
          // Server responded with a status other than 200 range
          setError(
            `Failed to load trip details: ${err.response.status} ${err.response.statusText}`
          );
        } else if (err.request) {
          // Request was made but no response received
          setError("Failed to load trip details: No response from server");
        } else {
          // Something else happened while setting up the request
          setError(`Failed to load trip details: ${err.message}`);
        }
        console.error("Fetch trip error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrip();
  }, [tripId]);

  // ✅ Run GetPlacePhoto only when trip is available
  useEffect(() => {
    if (!trip) return; // Ensure trip is available before calling the API

    const GetPlacePhoto = async () => {
      try {
        const data = {
          textQuery: trip.tripDetails.location, // Ensure this exists
        };

        const res = await GetPlaceDetails(data).then((resp) => {
          console.log(resp.data.places[0].photos[3].name);
          const PhotoUrl = PHOTO_REF_URL.replace(
            "{NAME}",
            resp.data.places[0].photos[3].name
          );
          setPhotoUrl(PhotoUrl);
        });

        if (!res || !res.data) {
          throw new Error("Invalid response from Google Place API");
        }
      } catch (error) {
        console.error("Error fetching place details:", error.message || error);
      }
    };

    GetPlacePhoto();
  }, [trip]); // ✅ Runs only when trip is set

  useEffect(() => {
    if (!trip) return; // Ensure trip is available before calling the API

    const GetHotelPhoto = async () => {
      try {
        const data = {
          textQuery: hotel.hotelName, // Ensure this exists
        };

        const res = await GetPlaceDetails(data).then((resp) => {
          console.log(resp.data.places[0].photos[3].name);
          const HotelPhotoUrl = PHOTO_REF_URL.replace(
            "{NAME}",
            resp.data.places[0].photos[3].name
          );
          setHotelPhotoUrl(HotelPhotoUrl);
        });

        if (!res || !res.data) {
          throw new Error("Invalid response from Google Place API");
        }
      } catch (error) {
        console.error("Error fetching place details:", error.message || error);
      }
    };

    GetHotelPhoto();
  }, [trip]); // ✅ Runs only when trip is set

  if (loading)
    return <div className="text-center p-8">Loading trip details...</div>;
  if (error) return <div className="text-red-500 text-center p-8">{error}</div>;
  if (!trip) return <div className="text-center p-8">Trip not found</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Trip Overview */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8 flex flex-col gap-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {trip.tripDetails.location} Trip Plan
        </h1>
        <img
          src={PhotoUrl}
          className="h-[340px] w-full object-cover rounded-xl"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-sm font-semibold text-blue-600">Duration</h3>
            <p className="text-lg text-gray-700">{trip.tripDetails.duration}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-sm font-semibold text-green-600">Budget</h3>
            <p className="text-lg text-gray-700">{trip.tripDetails.budget}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="text-sm font-semibold text-purple-600">Travelers</h3>
            <p className="text-lg text-gray-700">
              {trip.tripDetails.travelers}
            </p>
          </div>
        </div>

        <Button className="mb-6 bg-black">Download PDF Itinerary</Button>
      </div>

      {/* Itinerary Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Daily Itinerary
        </h2>

        {Object.entries(trip.itinerary).map(([dayNumber, dayPlan]) => (
          <div key={dayNumber} className="mb-8 border-b pb-6 last:border-b-0">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center">
                {dayNumber.replace("day", "")}
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                {dayPlan.theme}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {dayPlan.places.map((place, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    {place.placeName}
                  </h4>
                  <p className="text-gray-600 text-sm mb-2">
                    {place.placeDetails}
                  </p>
                  {place.placeImageUrl && (
                    <img
                      src={place.placeImageUrl}
                      alt={place.placeName}
                      className="w-full h-40 object-cover rounded-md"
                    />
                  )}
                  <div className="mt-2 text-sm text-gray-500">
                    <p>Rating: {place.rating}/5</p>
                    <p>{place.ticketPricing}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Hotel Options */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Recommended Hotels
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trip.hotelOptions.map((hotel, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {hotel.hotelName}
              </h3>
              <p className="text-gray-600 text-sm mb-2">{hotel.hotelAddress}</p>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-blue-600 font-medium">{hotel.price}</span>
                <span className="text-yellow-500">★ {hotel.rating}</span>
              </div>
              <p className="text-gray-600 text-sm">{hotel.description}</p>
              {hotel.hotelImageUrl && (
                <img
                  src={HotelPhotoUrl}
                  alt={hotel.hotelName}
                  className="mt-3 w-full h-48 object-cover rounded-md"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ViewTrip;
