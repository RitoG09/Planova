import React, { useEffect, useState } from "react";
import newRequest from "../../utils/newRequest";
import { Link } from "react-router-dom";

function TripHistory() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found!");
          setError("Authentication error. Please log in again.");
          return;
        }
        console.log("🔹 Sending token:", token);

        const response = await newRequest.get("/trips/history", {
          headers: {
            Authorization: `Bearer ${token}`, // Send JWT token
          },
        });
        setTrips(response.data);
      } catch (error) {
        console.error("Trip history error:", error);
        setError(
          error.response?.data?.message || "Failed to load trip history"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Trip History</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trips.length > 0
          ? trips.map((trip) => (
              <div key={trip._id} className="bg-white rounded-lg shadow-md p-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {trip.tripDetails.location}
                </h2>
                <p className="text-gray-600 text-sm">
                  Date: {new Date(trip.createdAt).toDateString()}
                </p>
                <p className="text-gray-600 text-sm">
                  Days: {trip.tripDetails.duration}
                </p>
                <Link
                  to={`/trip/${trip._id}`}
                  className="text-blue-500 mt-2 inline-block"
                >
                  View Trip →
                </Link>
              </div>
            ))
          : !error && <div className="text-gray-600">No trips found.</div>}
      </div>
    </div>
  );
}

export default TripHistory;
