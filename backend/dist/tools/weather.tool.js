"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWeather = void 0;
const axios_1 = __importDefault(require("axios"));
const tools_1 = require("@langchain/core/tools");
const zod_1 = require("zod");
const location_tool_1 = require("./location.tool");
const apiKey = process.env.OPEN_WEATHER_MAP_API_KEY;
exports.getWeather = (0, tools_1.tool)(async ({ location }) => {
    try {
        const coordinates = await (0, location_tool_1.resolveLocation)(location);
        const response = await axios_1.default.get("https://api.openweathermap.org/data/3.0/onecall", {
            params: {
                lat: coordinates.latitude,
                lon: coordinates.longitude,
                exclude: "minutely,alerts",
                units: "metric",
                appid: apiKey,
            },
        });
        const data = response.data;
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
            daily: data.daily.slice(0, 5).map((day) => ({
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
    }
    catch (err) {
        console.error(err.response?.data || err);
        throw err;
    }
}, {
    name: "getWeather",
    description: "Get current and forecast weather for a location",
    schema: zod_1.z.object({
        location: zod_1.z.string(),
    }),
});
