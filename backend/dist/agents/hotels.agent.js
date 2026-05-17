"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hotelNode = void 0;
const llm_1 = require("../services/llm");
const hotels_tool_1 = require("../tools/hotels.tool");
const messages_1 = require("@langchain/core/messages");
const tools = [hotels_tool_1.getHotels];
const toolsByName = { getHotels: hotels_tool_1.getHotels };
const modelWithTools = llm_1.llm.bindTools(tools);
const hotelNode = async (state) => {
    const plan = state.plan;
    const response = await modelWithTools.invoke([
        new messages_1.SystemMessage(`
You are a hotel assistant.

You MUST call getHotels tool.
`),
        {
            role: "user",
            content: JSON.stringify({
                location: plan.location,
            }),
        },
    ]);
    const results = [];
    for (const toolCall of response.tool_calls || []) {
        const tool = toolsByName[toolCall.name];
        const observation = await tool.invoke(toolCall);
        const hotelsArray = Array.isArray(observation)
            ? observation
            : (observation?.content ?? []);
        // normalize + compress
        const cleaned = hotelsArray.map((hotel) => ({
            name: hotel.name,
            rating: hotel.rating ?? null,
            address: hotel.address ?? "",
        }));
        results.push(...cleaned);
    }
    return { hotels: results };
};
exports.hotelNode = hotelNode;
