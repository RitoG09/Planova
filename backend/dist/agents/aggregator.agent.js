"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aggregatorNode = void 0;
const messages_1 = require("@langchain/core/messages");
const llm_1 = require("../services/llm");
const schema_1 = require("../schemas/schema");
const structuredLLM = llm_1.llm.withStructuredOutput(schema_1.ItinerarySchema);
const aggregatorNode = async (state) => {
    const { plan, places, hotels, weather } = state;
    const systemMsg = new messages_1.SystemMessage(`
You are an expert AI travel planner.

STRICT RULES:

1. itinerary MUST be an array of day objects only
2. recommendedHotel MUST be top-level
3. summary MUST be top-level
4. travelTips MUST be top-level
5. NEVER place recommendedHotel inside itinerary
6. NEVER repeat fields
7. Return valid JSON matching the schema exactly
`);
    const response = await structuredLLM.invoke([
        systemMsg,
        new messages_1.HumanMessage(JSON.stringify({
            tripPlan: plan,
            places,
            hotels,
            weather,
        })),
    ]);
    console.log("AGGREGATOR RUNNING");
    return { itineraryResult: response };
};
exports.aggregatorNode = aggregatorNode;
