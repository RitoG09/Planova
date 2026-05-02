import { GraphNode } from "@langchain/langgraph";
import { SystemMessage } from "@langchain/core/messages";
import { llm } from "../services/llm";
import { PlanSchema } from "../schemas/plan.schema";

export const plannerNode: GraphNode<any> = async (state) => {
  const messages = Array.isArray(state.messages) ? state.messages : [];

  if (messages.length === 0) {
    throw new Error("No messages found in state");
  }

  const userMessage = messages[messages.length - 1];
  const response = await llm.invoke([
    new SystemMessage(`
        You are a travel planner.
        Extract structured travel details:
            - location
            - number of days
            - number of people
            - budget (low, medium, high)
            - preferences
        Return ONLY JSON.`),
    userMessage,
  ]);

  const raw = response.content as string;
  const match = raw.match(/\{[\s\S]*\}/);

  if (!match) {
    console.error("RAW:", raw);
    throw new Error("No JSON found");
  }

  let parsed;

  try {
    const json = JSON.parse(match[0]);

    const normalized = {
      location: json.location,
      days: json.days ?? json.number_of_days ?? 3,
      travelers: json.travelers ?? json.number_of_people ?? 1,
      budget:
        json.budget === "low" || json.budget === "cheap"
          ? "cheap"
          : json.budget === "medium" || json.budget === "mid"
            ? "mid"
            : "luxury",
      preferences: [
        ...(json.preferences?.activities ?? []),
        ...(json.preferences?.accommodation
          ? [json.preferences.accommodation]
          : []),
        ...(json.preferences?.transportation
          ? [json.preferences.transportation]
          : []),
      ],
    };

    parsed = PlanSchema.parse(normalized);
  } catch (e) {
    console.error("FAILED JSON:", match[0]);
    throw new Error("Invalid planner output");
  }

  return { plan: parsed };
};
