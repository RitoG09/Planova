import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import newRequest from "../../../utils/newRequest";
import { Button } from "../../../components/ui/button";
import { GetPlaceDetails, PHOTO_REF_URL } from "../../../service/GlobalApi";
import html2canvas from "html2canvas";
import jspdf from "jspdf";

function ViewTrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [PhotoUrl, setPhotoUrl] = useState();
  const [HotelPhotoUrl, setHotelPhotoUrl] = useState();
  const [ItineraryPhotoUrls, setItineraryPhotoUrls] = useState({});
  const itineraryRef = useRef(null);

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

  //  GetPlacePhoto
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

  // FetchHotelPhotos
  useEffect(() => {
    if (!trip || !trip.hotelOptions) return; // Ensure trip and hotels exist

    const fetchHotelPhotos = async () => {
      try {
        const hotelPhotos = {}; // Store hotel photos with hotel names as keys

        for (const hotel of trip.hotelOptions) {
          const data = { textQuery: hotel.hotelName }; // Query for each hotel
          const res = await GetPlaceDetails(data);

          if (res.data?.places?.[0]?.photos?.[0]?.name) {
            hotelPhotos[hotel.hotelName] = PHOTO_REF_URL.replace(
              "{NAME}",
              res.data.places[0].photos[0].name
            );
          }
        }

        setHotelPhotoUrl(hotelPhotos); // Store as an object instead of single URL
      } catch (error) {
        console.error("Error fetching hotel photos:", error.message || error);
      }
    };

    fetchHotelPhotos();
  }, [trip]);

  //FetchItinerary
  useEffect(() => {
    if (!trip || !trip.itinerary) return;
    const fetchItineraryPhotos = async () => {
      try {
        const itineraryPhotos = {};
        for (const [day, dayPlan] of Object.entries(trip.itinerary)) {
          for (const place of dayPlan.places) {
            const res = await GetPlaceDetails({ textQuery: place.placeName });
            if (res.data?.places?.[0]?.photos?.[0]?.name) {
              itineraryPhotos[place.placeName] = PHOTO_REF_URL.replace(
                "{NAME}",
                res.data.places[0].photos[0].name
              );
            }
          }
        }
        setItineraryPhotoUrls(itineraryPhotos);
      } catch (error) {
        console.error("Error fetching itinerary photos:", error);
      }
    };
    fetchItineraryPhotos();
  }, [trip]);

  const DownloadPdf = async () => {
    const element = itineraryRef.current;
    if (!element) return;

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: true,
    });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jspdf("p", "mm", "a4");
    const imgWidth = 210;
    const pageHeight = 297;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    pdf.save("Itinerary.pdf");
  };

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

        <Button className="mb-6 bg-black" onClick={DownloadPdf}>
          Download PDF Itinerary
        </Button>
      </div>

      {/* Itinerary Section */}
      <div
        ref={itineraryRef}
        className="bg-white rounded-lg shadow-md p-6 mb-8"
      >
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
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
                >
                  <h4 className="font-semibold text-gray-800 mb-2">
                    {place.placeName}
                  </h4>
                  <p className="text-gray-600 text-sm mb-2">
                    {place.placeDetails}
                  </p>
                  {ItineraryPhotoUrls[place.placeName] ? (
                    <img
                      src={ItineraryPhotoUrls[place.placeName]}
                      alt={place.placeName}
                      className="w-full h-40 object-cover rounded-md"
                    />
                  ) : (
                    <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded-md">
                      <span className="text-gray-500 text-sm">
                        No Image Available
                      </span>
                    </div>
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

              {HotelPhotoUrl?.[hotel.hotelName] && (
                <img
                  src={HotelPhotoUrl[hotel.hotelName]}
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
