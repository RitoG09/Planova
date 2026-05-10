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

  let result = null;

  for (const toolCall of response.tool_calls || []) {
    const tool = toolsByName[toolCall.name];

    const observation = await tool.invoke(toolCall);
    const raw =
      typeof observation.content === "string"
        ? JSON.parse(observation.content)
        : (observation.content ?? observation);

    result = {
      current: {
        temperature: raw.current?.temperature,

        condition: raw.current?.condition,

        description: raw.current?.description,
      },

      daily:
        raw.daily?.map((day: any) => ({
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
