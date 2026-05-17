"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.weatherNode = void 0;
const llm_1 = require("../services/llm");
const weather_tool_1 = require("../tools/weather.tool");
const messages_1 = require("@langchain/core/messages");
const tools = [weather_tool_1.getWeather];
const toolsByName = {
    getWeather: weather_tool_1.getWeather,
};
const modelWithTools = llm_1.llm.bindTools(tools);
const weatherNode = async (state) => {
    const plan = state.plan;
    const response = await modelWithTools.invoke([
        new messages_1.SystemMessage(`
You are a weather assistant.

You MUST call getWeather tool.
`),
        {
            role: "user",
            content: JSON.stringify({
                location: plan.location,
            }),
        },
    ]);
    let result = null;
    for (const toolCall of response.tool_calls || []) {
        const tool = toolsByName[toolCall.name];
        const observation = await tool.invoke(toolCall);
        const raw = typeof observation.content === "string"
            ? JSON.parse(observation.content)
            : (observation.content ?? observation);
        result = {
            current: {
                temperature: raw.current?.temperature,
                condition: raw.current?.condition,
                description: raw.current?.description,
            },
            daily: raw.daily?.map((day) => ({
                date: day.date,
                minTemp: day.temperature?.min,
                maxTemp: day.temperature?.max,
                condition: day.condition,
                description: day.description,
            })) ?? [],
        };
    }
    return {
        weather: result,
    };
};
exports.weatherNode = weatherNode;
