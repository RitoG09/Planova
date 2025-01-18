import React, { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { useSearchParams } from "react-router-dom";

function NewTrip() {
  const [place, setPlace] = useState();
  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="text-4xl text-center font-extrabold">
        Brief your Trip Preferences
      </h2>
      <p className="text-lg text-center mt-4 text-transparent bg-clip-text bg-gradient-to-l from-blue-600 to-yellow-700">
        "Every great journey begins with a plan! Share your preferences, and let
        us craft the perfect adventure for you."
      </p>

      <div>
        <div className="mt-20">
          <h2 className="text-xl my-3 font-medium">
            What is your destination of choice?
          </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (value) => {
                setPlace(value);
                console.log(value);
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default NewTrip;
