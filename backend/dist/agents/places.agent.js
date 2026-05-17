"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.placesNode = void 0;
const messages_1 = require("@langchain/core/messages");
const llm_1 = require("../services/llm");
const places_tool_1 = require("../tools/places.tool");
const tools = [places_tool_1.getPlaces];
const toolsByName = { getPlaces: places_tool_1.getPlaces };
const modelWithTools = llm_1.llm.bindTools(tools);
const placesNode = async (state) => {
    const plan = state.plan;
    const response = await modelWithTools.invoke([
        new messages_1.SystemMessage(`
        You are a travel assistant.
        Call the getPlaces tool using the given location.`),
        {
            role: "human",
            content: JSON.stringify({
                location: plan.location,
                preferences: plan.preferences,
            }),
        },
    ]);
    // if tool calling exists, call the tool
    if (messages_1.AIMessage.isInstance(response) && response.tool_calls?.length) {
        const result = [];
        for (const toolCall of response.tool_calls) {
            const tool = toolsByName[toolCall.name];
            const observation = await tool.invoke(toolCall);
            const placesArray = Array.isArray(observation)
                ? observation
                : (observation?.content ?? []);
            // normalize + compress
            const cleaned = placesArray.map((place) => ({
                name: place.name,
                rating: place.rating ?? null,
            }));
            result.push(...cleaned);
        }
        return {
            places: result,
        };
    }
    return { places: [] };
};
exports.placesNode = placesNode;
