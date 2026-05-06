import { GraphNode } from "@langchain/langgraph";
import { llm } from "../services/llm";
import { getHotels } from "../tools/hotels.tool";
import { SystemMessage } from "@langchain/core/messages";

const tools = [getHotels];
const toolsByName = { getHotels };

const modelWithTools = llm.bindTools(tools);

export const hotelNodes: GraphNode<any> = async (state: any) => {
  const plan = state.plan;
  const response = await modelWithTools.invoke([
    new SystemMessage(`
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

  const results: any[] = [];

  for (const toolCall of response.tool_calls || []) {
    const tool = toolsByName[toolCall.name as keyof typeof toolsByName];
    const observation = await tool.invoke(toolCall);
    const hotelsArray = Array.isArray(observation)
      ? observation
      : (observation?.content ?? []);
    results.push(...hotelsArray);
  }

  return { hotels: results };
};
