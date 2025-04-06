# Planova - AI Trip Planner

## Overview
Planova is an AI-powered trip planner that helps users create customized travel itineraries based on their preferences. The app integrates AI features with real-time location data to provide tailored recommendations for destinations, accommodations, and activities.

## Features
- **AI-Powered Trip Planning:** Uses AI to generate personalized itineraries.
- **Google Places & Photo API Integration:** Fetches real-time information on locations.
- **Hotel Recommendations:** Provides suggestions based on the user's budget.
- **Trip Customization:** Allows users to modify their itinerary.
- **Budget Customization:** Helps users plan trips within their financial limits.
- **Itinerary PDF Download:** Users can export and download their plans.

## Tech Stack
- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **APIs Used:** Google Places API, Gemini AI API

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/RitoG09/Planova.git
   cd ai-trip-planner
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables (`.env` file):
   ```sh
   VITE_GOOGLE_PLACE_API_KEY=your_google_api_key
   VITE_GOOGLE_GEMINI_AI_API_KEY=your_gemini_api_key
   MONGO_URI=your_database_url
   JWT_KEY=yout_jwt_key
   ```
4. Run the application:
   ```sh
   npm start
   ```

## Usage
1. Enter your travel details such as location, number of days, number of travelers, and budget.
2. Planova generates an AI-powered itinerary with places to visit, hotel options, and budget breakdowns.
3. Customize the itinerary as needed.
4. Download the final itinerary as a PDF for offline use.

## Future Enhancements
- Add multi-user support.
- Adding google map for hotel and itinerary location.
- Implement real-time weather updates.
- Improve AI recommendations based on past user preferences.

## License
This project is licensed under the MIT License.

