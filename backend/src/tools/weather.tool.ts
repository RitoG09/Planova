import axios from "axios";
import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { resolveLocation } from "./location.tool";

const apiKey = process.env.OPEN_WEATHER_MAP_API_KEY!;

export const getWeather = tool(
  async ({ location }: { location: string }) => {
    try {
      const coordinates = await resolveLocation(location);
      const response = await axios.get(
        "https://api.openweathermap.org/data/3.0/onecall",
        {
          params: {
            lat: coordinates.latitude,
            lon: coordinates.longitude,
            exclude: "minutely,alerts",
            units: "metric",
            appid: apiKey,
          },
        },
      );
      const data: any = response.data;
      return {
        current: {
          temperature: data?.current?.temp,
          feelsLike: data?.current?.feels_like,
          humidity: data?.current?.humidity,
          windSpeed: data?.current?.wind_speed,

          condition: data?.current?.weather?.[0]?.main,
          description: data.current.weather?.[0]?.description,

          icon: data.current.weather?.[0]?.icon,
        },

        daily: data.daily.slice(0, 5).map((day: any) => ({
          date: day.dt,

          temperature: {
            min: day.temp.min,
            max: day.temp.max,
          },

          condition: day.weather?.[0]?.main,
          description: day.weather?.[0]?.description,

          humidity: day.humidity,
          windSpeed: day.wind_speed,
        })),
      };
    } catch (err: any) {
      console.error(err.response?.data || err);
      throw err;
    }
  },
  {
    name: "getWeather",
    description: "Get current and forecast weather for a location",
    schema: z.object({
      location: z.string(),
    }),
  },
);
