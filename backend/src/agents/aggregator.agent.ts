import { SystemMessage, HumanMessage } from "@langchain/core/messages";
import { llm } from "../services/llm";
import { ItinerarySchema } from "../schemas/schema";

const structuredLLM = llm.withStructuredOutput(ItinerarySchema);

export const aggregatorNode = async (state: any) => {
  const { plan, places, hotels, weather } = state;

  const systemMsg = new SystemMessage(`
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
    new HumanMessage(
      JSON.stringify({
        tripPlan: plan,
        places,
        hotels,
        weather,
      }),
    ),
  ]);

  console.log("AGGREGATOR RUNNING");
  return { itineraryResult: response };
};
