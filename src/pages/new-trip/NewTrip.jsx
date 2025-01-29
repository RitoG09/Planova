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

function NewTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // useEffect(() => {
  //   console.log(formData);
  // }, [formData]);

  const onGenerateTrip = async () => {
    if (
      (formData?.noOfDays > 10 && !formData?.location) ||
      !formData?.budget ||
      !formData?.people
    ) {
      console.log("maximum 10 days trip can be planned");
      toast.error("Provide all preferences.", {
        duration: 4000,
      });

      return;
    }
    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.location?.label
    )
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{traveller}", formData?.people)
      .replace("{budget}", formData?.budget);

    console.log(FINAL_PROMPT);

    const result = await chatSession.sendMessage(FINAL_PROMPT);

    console.log(result?.response?.text());
  }; 

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <Toaster
        toastOptions={{
          className: "",
          style: {
            border: "1px solid #713200",
            padding: "14px",
            color: "#713200",
          },
        }}
      />
      <h2 className="text-4xl text-center font-extrabold">
        Brief your Trip Preferences
      </h2>
      <p className="text-lg text-center mt-4 text-transparent bg-clip-text bg-gradient-to-l from-blue-600 to-yellow-700">
        "Every great journey begins with a plan! Share your preferences, and let
        us craft the perfect adventure for you."
      </p>
      <div className="mt-20 flex flex-col gap-10">
        <div>
          <h2 className="text-2xl my-3 font-medium">
            What is your destination of choice?
          </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (value) => {
                setPlace(value);
                handleInputChange("location", value);
              },
            }}
          />
        </div>

        <div>
          <h2 className="text-2xl my-3 font-medium">
            Select the duration of your days:
          </h2>
          <input
            type="number"
            className="border-2 rounded-sm px-5 py-1"
            max={14}
            min={2}
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </div>

        <div>
          <h2 className="text-2xl my-3 font-medium">What is your Budget?</h2>
          <div className="grid grid-cols-3 gap-5">
            {selectBudgetOption.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("budget", item.title)}
                className={`p-4 border rounded-lg hover:shadow-lg 
                cursor-pointer ${
                  formData.budget == item.title && "shadow-lg border-yellow-600"
                } `}
              >
                <h2 className="text-2xl">{item.icon}</h2>
                <h2 className="text-2xl font-bold">{item.title}</h2>
                <h2 className="text-lg text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl my-3 font-medium">
            Who do you plan to travel with?
          </h2>
          <div className="grid grid-cols-3 gap-5">
            {selectTravelesList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("people", item.people)}
                className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer  ${
                  formData.people == item.people &&
                  "shadow-lg border-yellow-600"
                }`}
              >
                <h2 className="text-2xl">{item.icon}</h2>
                <h2 className="text-2xl font-bold">{item.title}</h2>
                <h2 className="text-lg text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="my-20  justify-end flex">
        <Button variant="destructive" onClick={onGenerateTrip}>
          Generate Trip
        </Button>
      </div>
    </div>
  );
}

export default NewTrip;
