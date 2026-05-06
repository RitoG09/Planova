import { llm } from "../services/llm";
import { getWeather } from "../tools/weather.tool";
import { SystemMessage } from "@langchain/core/messages";

const tools = [getWeather];

const toolsByName: Record<string, any> = {
  getWeather,
};

const modelWithTools = llm.bindTools(tools);

export const weatherNode = async (state: any) => {
  const plan = state.plan;

  const response = await modelWithTools.invoke([
    new SystemMessage(`
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

  const results: any[] = [];

  for (const toolCall of response.tool_calls || []) {
    const tool = toolsByName[toolCall.name];

    const observation = await tool.invoke(toolCall);

    results.push(observation);
  }

  return {
    weather: results[0],
  };
};
