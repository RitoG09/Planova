import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import newRequest from "../../../utils/newRequest";
import { Button } from "../../../components/ui/button";
import { GetPlaceDetails, PHOTO_REF_URL } from "../../../service/GlobalApi";
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
  const [imageLoadingStatus, setImageLoadingStatus] = useState({});
  const [photoLoadTimeout, setPhotoLoadTimeout] = useState({});

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
    if (!trip) return;

    const GetPlacePhoto = async () => {
      try {
        console.log("Fetching location photo for:", trip.tripDetails.location);
        const data = {
          textQuery: trip.tripDetails.location,
        };

        const response = await GetPlaceDetails(data);
        console.log("Location photo API response:", response.data);

        // Check if photos exist
        if (response.data?.places?.[0]?.photos?.length > 0) {
          // Get photos from the response
          const photos = response.data.places[0].photos;
          // Try to select a good photo (use index 0 if only one is available)
          const photoIndex = photos.length > 1 ? 0 : 0;
          const photoRef = photos[photoIndex].name;
          const photoUrl = PHOTO_REF_URL.replace("{NAME}", photoRef);
          console.log("Setting location photo URL:", photoUrl);
          setPhotoUrl(photoUrl);

          // Only set a timeout if the image hasn't loaded yet
          const timeoutId = setTimeout(() => {
            console.log("Location photo timed out");
            setImageLoadingStatus((prev) => {
              // Only set to error if it hasn't loaded yet
              if (prev["locationPhoto"] !== "loaded") {
                return { ...prev, locationPhoto: "error" };
              }
              return prev;
            });
          }, 15000); // Extended to 15 seconds for more loading time

          setPhotoLoadTimeout((prev) => ({
            ...prev,
            locationPhoto: timeoutId,
          }));
        } else {
          console.log(
            "No photos available for location:",
            trip.tripDetails.location
          );
          // Try a more specific search if the general location search failed
          try {
            const specificData = {
              textQuery: `${trip.tripDetails.location} tourist attractions`,
            };
            const specificResponse = await GetPlaceDetails(specificData);

            if (specificResponse.data?.places?.[0]?.photos?.length > 0) {
              const photoRef = specificResponse.data.places[0].photos[0].name;
              const photoUrl = PHOTO_REF_URL.replace("{NAME}", photoRef);
              console.log("Setting alternative location photo URL:", photoUrl);
              setPhotoUrl(photoUrl);

              const timeoutId = setTimeout(() => {
                setImageLoadingStatus((prev) => ({
                  ...prev,
                  locationPhoto: "error",
                }));
              }, 10000);

              setPhotoLoadTimeout((prev) => ({
                ...prev,
                locationPhoto: timeoutId,
              }));
            } else {
              setPhotoUrl(null);
            }
          } catch (fallbackError) {
            console.error("Error in fallback photo fetch:", fallbackError);
            setPhotoUrl(null);
          }
        }
      } catch (error) {
        console.error("Error fetching place photo:", error);
        // Try a different approach if the first one fails
        try {
          const fallbackData = {
            textQuery: `${trip.tripDetails.location} landmark`,
          };
          const fallbackResponse = await GetPlaceDetails(fallbackData);

          if (fallbackResponse.data?.places?.[0]?.photos?.length > 0) {
            const photoRef = fallbackResponse.data.places[0].photos[0].name;
            const photoUrl = PHOTO_REF_URL.replace("{NAME}", photoRef);
            console.log("Setting fallback location photo URL:", photoUrl);
            setPhotoUrl(photoUrl);

            const timeoutId = setTimeout(() => {
              setImageLoadingStatus((prev) => ({
                ...prev,
                locationPhoto: "error",
              }));
            }, 10000);

            setPhotoLoadTimeout((prev) => ({
              ...prev,
              locationPhoto: timeoutId,
            }));
          } else {
            setPhotoUrl(null);
          }
        } catch (fallbackError) {
          console.error("Error in fallback photo fetch:", fallbackError);
          setPhotoUrl(null);
        }
      }
    };

    GetPlacePhoto();

    // Cleanup timeouts when component unmounts
    return () => {
      if (photoLoadTimeout["locationPhoto"]) {
        clearTimeout(photoLoadTimeout["locationPhoto"]);
      }
    };
  }, [trip]);

  // FetchHotelPhotos
  useEffect(() => {
    if (!trip || !trip.hotelOptions) return;

    const fetchHotelPhotos = async () => {
      try {
        const hotelPhotos = {};

        for (const hotel of trip.hotelOptions) {
          try {
            console.log("Fetching hotel photo for:", hotel.hotelName);
            const response = await GetPlaceDetails({
              textQuery: hotel.hotelName,
            });
            console.log(
              `Hotel ${hotel.hotelName} API response:`,
              response.data
            );

            // Check if photos exist
            if (response.data?.places?.[0]?.photos?.length > 0) {
              const photoRef = response.data.places[0].photos[0].name;
              hotelPhotos[hotel.hotelName] = PHOTO_REF_URL.replace(
                "{NAME}",
                photoRef
              );
              console.log(
                `Set photo for ${hotel.hotelName}:`,
                hotelPhotos[hotel.hotelName]
              );

              //only set a timeout if the image hasn't added yet
              const hotelId = `hotel-${hotel.hotelName}`;
              const timeoutId = setTimeout(() => {
                console.log("Location photo timed out");
                setImageLoadingStatus((prev) => {
                  // Only set to error if it hasn't loaded yet
                  if (prev["hotelPhoto"] !== "loaded") {
                    return { ...prev, hotelPhoto: "error" };
                  }
                  return prev;
                });
              }, 15000); // 15 seconds timeout

              setPhotoLoadTimeout((prev) => ({
                ...prev,
                [hotelId]: timeoutId,
              }));
            } else {
              console.log(`No photos available for hotel: ${hotel.hotelName}`);
            }
          } catch (hotelError) {
            console.error(
              `Error fetching photo for hotel ${hotel.hotelName}:`,
              hotelError
            );
          }
        }

        setHotelPhotoUrl(hotelPhotos);
      } catch (error) {
        console.error("Error in hotel photos fetch process:", error);
      }

      // Cleanup timeouts when component unmounts
      return () => {
        Object.keys(photoLoadTimeout).forEach((key) => {
          if (key.startsWith("hotel-") && photoLoadTimeout[key]) {
            clearTimeout(photoLoadTimeout[key]);
          }
        });
      };
    };

    fetchHotelPhotos();
  }, [trip]);

  // FetchItinerary
  useEffect(() => {
    if (!trip || !trip.itinerary) return;

    const fetchItineraryPhotos = async () => {
      try {
        const itineraryPhotos = {};

        for (const [day, dayPlan] of Object.entries(trip.itinerary)) {
          for (const place of dayPlan.places) {
            try {
              console.log(
                `Fetching photo for place: ${place.placeName} on ${day}`
              );
              const response = await GetPlaceDetails({
                textQuery: place.placeName,
              });
              console.log(
                `Place ${place.placeName} API response:`,
                response.data
              );

              // Check if photos exist
              if (response.data?.places?.[0]?.photos?.length > 0) {
                const photoRef = response.data.places[0].photos[0].name;
                itineraryPhotos[place.placeName] = PHOTO_REF_URL.replace(
                  "{NAME}",
                  photoRef
                );
                console.log(
                  `Set photo for ${place.placeName}:`,
                  itineraryPhotos[place.placeName]
                );

                // Set a timeout for image loading
                const placeId = `place-${place.placeName}`;
                const timeoutId = setTimeout(() => {
                  console.log("Location photo timed out");
                  setImageLoadingStatus((prev) => {
                    // Only set to error if it hasn't loaded yet
                    if (prev["itineraryPhoto"] !== "loaded") {
                      return { ...prev, itineraryPhoto: "error" };
                    }
                    return prev;
                  });
                }, 15000); // Extended to 15 seconds for more loading time

                setPhotoLoadTimeout((prev) => ({
                  ...prev,
                  [placeId]: timeoutId,
                }));
              } else {
                console.log(
                  `No photos available for place: ${place.placeName}`
                );
                // Try a more specific search
                try {
                  const specificData = {
                    textQuery: `${place.placeName} attraction ${trip.tripDetails.location}`,
                  };
                  const specificResponse = await GetPlaceDetails(specificData);

                  if (specificResponse.data?.places?.[0]?.photos?.length > 0) {
                    const photoRef =
                      specificResponse.data.places[0].photos[0].name;
                    itineraryPhotos[place.placeName] = PHOTO_REF_URL.replace(
                      "{NAME}",
                      photoRef
                    );
                    console.log(
                      `Set alternative photo for ${place.placeName}:`,
                      itineraryPhotos[place.placeName]
                    );

                    const placeId = `place-${place.placeName}`;
                    const timeoutId = setTimeout(() => {
                      setImageLoadingStatus((prev) => ({
                        ...prev,
                        [placeId]: "error",
                      }));
                    }, 10000);

                    setPhotoLoadTimeout((prev) => ({
                      ...prev,
                      [placeId]: timeoutId,
                    }));
                  }
                } catch (fallbackError) {
                  console.error(
                    `Error in fallback photo fetch for ${place.placeName}:`,
                    fallbackError
                  );
                }
              }
            } catch (placeError) {
              console.error(
                `Error fetching photo for place ${place.placeName}:`,
                placeError
              );
              // Try a generic search as fallback
              try {
                const fallbackData = {
                  textQuery: `${place.placeName} ${trip.tripDetails.location}`,
                };
                const fallbackResponse = await GetPlaceDetails(fallbackData);

                if (fallbackResponse.data?.places?.[0]?.photos?.length > 0) {
                  const photoRef =
                    fallbackResponse.data.places[0].photos[0].name;
                  itineraryPhotos[place.placeName] = PHOTO_REF_URL.replace(
                    "{NAME}",
                    photoRef
                  );
                  console.log(
                    `Set fallback photo for ${place.placeName}:`,
                    itineraryPhotos[place.placeName]
                  );

                  const placeId = `place-${place.placeName}`;
                  const timeoutId = setTimeout(() => {
                    setImageLoadingStatus((prev) => ({
                      ...prev,
                      [placeId]: "error",
                    }));
                  }, 10000);

                  setPhotoLoadTimeout((prev) => ({
                    ...prev,
                    [placeId]: timeoutId,
                  }));
                }
              } catch (fallbackError) {
                console.error(
                  `Error in fallback photo fetch for ${place.placeName}:`,
                  fallbackError
                );
              }
            }
          }
        }

        setItineraryPhotoUrls(itineraryPhotos);
      } catch (error) {
        console.error("Error in itinerary photos fetch process:", error);
      }
    };

    fetchItineraryPhotos();

    // Cleanup timeouts when component unmounts
    return () => {
      Object.keys(photoLoadTimeout).forEach((key) => {
        if (key.startsWith("place-") && photoLoadTimeout[key]) {
          clearTimeout(photoLoadTimeout[key]);
        }
      });
    };
  }, [trip]);

  //download pdf
  const DownloadPdf = async () => {
    const element = itineraryRef.current;
    if (!element) return;

    try {
      // Show loading indicator
      const loadingDiv = document.createElement("div");
      loadingDiv.className =
        "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";
      loadingDiv.innerHTML = `
        <div class="bg-white p-5 rounded-lg shadow-lg text-center">
          <p class="mb-2 text-lg font-semibold">Generating PDF...</p>
          <p>This may take a few moments</p>
        </div>
      `;
      document.body.appendChild(loadingDiv);

      // Create a new PDF document
      const pdf = new jspdf("p", "mm", "a4");

      // Define the page dimensions
      const pageWidth = 210;
      const pageHeight = 297;
      const margin = 15;
      const contentWidth = pageWidth - margin * 2;

      // Add title page
      pdf.setFillColor(240, 240, 250);
      pdf.rect(0, 0, pageWidth, pageHeight, "F");

      // Add title
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(24);
      pdf.setTextColor(50, 50, 100);
      const title = `${trip.tripDetails.location} Trip Plan`;
      const titleWidth =
        (pdf.getStringUnitWidth(title) * 24) / pdf.internal.scaleFactor;
      const titleX = (pageWidth - titleWidth) / 2;
      pdf.text(title, titleX, 60);

      // Add trip details
      pdf.setFontSize(14);
      pdf.setTextColor(80, 80, 80);
      pdf.text(`Duration: ${trip.tripDetails.duration}`, margin, 90);
      pdf.text(`Budget: ${trip.tripDetails.budget}`, margin, 100);
      pdf.text(`Travelers: ${trip.tripDetails.travelers}`, margin, 110);

      // Add date generated
      pdf.setFontSize(10);
      pdf.setTextColor(120, 120, 120);
      const dateGenerated = new Date().toLocaleDateString();
      pdf.text(`Generated on: ${dateGenerated}`, margin, pageHeight - margin);

      // Add a new page for itinerary
      pdf.addPage();

      // Add itinerary title
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(18);
      pdf.setTextColor(50, 50, 100);
      pdf.text("Trip Itinerary", margin, margin + 5);

      // Add horizontal line
      pdf.setDrawColor(200, 200, 200);
      pdf.line(margin, margin + 10, pageWidth - margin, margin + 10);

      let yPosition = margin + 20;

      // Add itinerary content day by day
      Object.entries(trip.itinerary).forEach(
        ([dayNumber, dayPlan], dayIndex) => {
          // Check if we need a new page
          if (yPosition > pageHeight - 40) {
            pdf.addPage();
            yPosition = margin + 10;
          }

          // Add day header
          pdf.setFont("helvetica", "bold");
          pdf.setFontSize(16);
          pdf.setTextColor(60, 60, 100);
          pdf.text(
            `Day ${dayNumber.replace("day", "")} - ${dayPlan.theme}`,
            margin,
            yPosition
          );
          yPosition += 10;

          // Add day places
          dayPlan.places.forEach((place, placeIndex) => {
            // Check if we need a new page
            if (yPosition > pageHeight - 50) {
              pdf.addPage();
              yPosition = margin + 10;
            }

            // Add place details
            pdf.setFont("helvetica", "bold");
            pdf.setFontSize(12);
            pdf.setTextColor(0, 0, 0);
            pdf.text(`• ${place.placeName}`, margin, yPosition);
            yPosition += 6;

            pdf.setFont("helvetica", "normal");
            pdf.setFontSize(10);
            pdf.setTextColor(80, 80, 80);

            // Handle multiline details
            const splitDetails = pdf.splitTextToSize(
              place.placeDetails,
              contentWidth - 10
            );
            splitDetails.forEach((line) => {
              if (yPosition > pageHeight - 20) {
                pdf.addPage();
                yPosition = margin + 10;
              }
              pdf.text(line, margin + 5, yPosition);
              yPosition += 5;
            });

            // Add rating and pricing
            pdf.text(
              `Rating: ${place.rating}/5 • ${
                place.ticketPricing || "No pricing info"
              }`,
              margin + 5,
              yPosition
            );
            yPosition += 10;
          });

          // Add space between days
          yPosition += 10;

          // Add horizontal divider except for the last day
          if (dayIndex < Object.keys(trip.itinerary).length - 1) {
            pdf.setDrawColor(220, 220, 220);
            pdf.line(margin, yPosition - 5, pageWidth - margin, yPosition - 5);
          }
        }
      );

      // Add hotels page
      pdf.addPage();

      // Add hotels title
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(18);
      pdf.setTextColor(50, 50, 100);
      pdf.text("Recommended Hotels", margin, margin + 5);

      // Add horizontal line
      pdf.setDrawColor(200, 200, 200);
      pdf.line(margin, margin + 10, pageWidth - margin, margin + 10);

      yPosition = margin + 20;

      // Add hotel details
      trip.hotelOptions.forEach((hotel, index) => {
        // Check if we need a new page
        if (yPosition > pageHeight - 60) {
          pdf.addPage();
          yPosition = margin + 10;
        }

        // Add hotel name
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(14);
        pdf.setTextColor(0, 0, 0);
        pdf.text(hotel.hotelName, margin, yPosition);
        yPosition += 6;

        // Add hotel address
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(10);
        pdf.setTextColor(80, 80, 80);
        pdf.text(hotel.hotelAddress, margin + 5, yPosition);
        yPosition += 6;

        // Add price and rating
        pdf.text(
          `Price: ${hotel.price} • Rating: ${hotel.rating}`,
          margin + 5,
          yPosition
        );
        yPosition += 6;

        // Add hotel description with multiline support
        const splitDescription = pdf.splitTextToSize(
          hotel.description,
          contentWidth - 10
        );
        splitDescription.forEach((line) => {
          if (yPosition > pageHeight - 20) {
            pdf.addPage();
            yPosition = margin + 10;
          }
          pdf.text(line, margin + 5, yPosition);
          yPosition += 5;
        });

        // Add space between hotels
        yPosition += 10;

        // Add horizontal divider except for the last hotel
        if (index < trip.hotelOptions.length - 1) {
          pdf.setDrawColor(220, 220, 220);
          pdf.line(margin, yPosition - 5, pageWidth - margin, yPosition - 5);
        }
      });

      // Save the PDF
      pdf.save(`${trip.tripDetails.location}_Trip_Itinerary.pdf`);

      // Remove loading indicator
      document.body.removeChild(loadingDiv);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("There was an error generating the PDF. Please try again.");
    }
  };

  // Update the handleImageLoad function to properly clear timeouts and prevent images from disappearing
  const handleImageLoad = (id) => {
    console.log(`Image ${id} successfully loaded`);
    setImageLoadingStatus((prev) => ({ ...prev, [id]: "loaded" }));

    // Clear the timeout for this image
    if (photoLoadTimeout[id]) {
      clearTimeout(photoLoadTimeout[id]);
      setPhotoLoadTimeout((prev) => {
        const newTimeouts = { ...prev };
        delete newTimeouts[id]; // Remove the timeout completely
        return newTimeouts;
      });
    }
  };

  const handleImageError = (id) => {
    console.log(`Image ${id} failed to load`);
    setImageLoadingStatus((prev) => ({ ...prev, [id]: "error" }));

    // Clear the timeout for this image
    if (photoLoadTimeout[id]) {
      clearTimeout(photoLoadTimeout[id]);
      setPhotoLoadTimeout((prev) => {
        const newTimeouts = { ...prev };
        delete newTimeouts[id]; // Remove the timeout completely
        return newTimeouts;
      });
    }
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

        {PhotoUrl ? (
          <div className="h-[340px] w-full relative">
            {imageLoadingStatus["locationPhoto"] !== "loaded" && (
              <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Loading image...</span>
              </div>
            )}
            <img
              src={PhotoUrl}
              alt={trip.tripDetails.location}
              className={`h-[340px] w-full object-cover rounded-xl ${
                imageLoadingStatus["locationPhoto"] === "loaded"
                  ? "opacity-100"
                  : "opacity-0"
              }`}
              onLoad={() => handleImageLoad("locationPhoto")}
              onError={() => handleImageError("locationPhoto")}
            />
          </div>
        ) : (
          <div className="h-[340px] w-full bg-gray-200 flex items-center justify-center rounded-xl">
            <span className="text-gray-500">
              No Image Available for {trip.tripDetails.location}
            </span>
          </div>
        )}

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
                  {ItineraryPhotoUrls[place.placeName] &&
                  imageLoadingStatus[`place-${place.placeName}`] !== "error" ? (
                    <div className="w-full h-40 relative">
                      {imageLoadingStatus[`place-${place.placeName}`] !==
                        "loaded" && (
                        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-500 text-sm">
                            Loading image...
                          </span>
                        </div>
                      )}
                      <img
                        src={ItineraryPhotoUrls[place.placeName]}
                        alt={place.placeName}
                        className={`w-full h-40 object-cover rounded-md ${
                          imageLoadingStatus[`place-${place.placeName}`] ===
                          "loaded"
                            ? "opacity-100"
                            : "opacity-0"
                        }`}
                        onLoad={() =>
                          handleImageLoad(`place-${place.placeName}`)
                        }
                        onError={() =>
                          handleImageError(`place-${place.placeName}`)
                        }
                      />
                    </div>
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

              {HotelPhotoUrl?.[hotel.hotelName] &&
              imageLoadingStatus[`hotel-${hotel.hotelName}`] !== "error" ? (
                <div className="mt-3 w-full h-48 relative">
                  {imageLoadingStatus[`hotel-${hotel.hotelName}`] !==
                    "loaded" && (
                    <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500 text-sm">
                        Loading image...
                      </span>
                    </div>
                  )}
                  <img
                    src={HotelPhotoUrl[hotel.hotelName]}
                    alt={hotel.hotelName}
                    className={`w-full h-48 object-cover rounded-md ${
                      imageLoadingStatus[`hotel-${hotel.hotelName}`] ===
                      "loaded"
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                    onLoad={() => handleImageLoad(`hotel-${hotel.hotelName}`)}
                    onError={() => handleImageError(`hotel-${hotel.hotelName}`)}
                  />
                </div>
              ) : (
                <div className="mt-3 w-full h-48 bg-gray-200 flex items-center justify-center rounded-md">
                  <span className="text-gray-500 text-sm">
                    No Image Available
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ViewTrip;
