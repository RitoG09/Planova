import { GraphNode } from "@langchain/langgraph";
import {
  SystemMessage,
  AIMessage,
  ToolMessage,
} from "@langchain/core/messages";
import { llm } from "../services/llm";
import { getPlaces } from "../tools/places.tool";

const tools = [getPlaces];
const toolsByName = { getPlaces };

const modelWithTools = llm.bindTools(tools);

export const placesNode: GraphNode<any> = async (state) => {
  const plan = state.plan;
  const response = await modelWithTools.invoke([
    new SystemMessage(`
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
  if (AIMessage.isInstance(response) && response.tool_calls?.length) {
    const result = [];
    for (const toolCall of response.tool_calls) {
      const tool = toolsByName[toolCall.name as keyof typeof toolsByName];
      const observation = await tool.invoke(toolCall);
      result.push(observation);
    }
    return { places: result };
  }

  return { places: [] };
};
