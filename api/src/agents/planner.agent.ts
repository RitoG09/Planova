import { GraphNode } from "@langchain/langgraph";
import { SystemMessage } from "@langchain/core/messages";
import { llm } from "../services/llm";
import { PlanSchema } from "../schemas/schema";

const structureLLM = llm.withStructuredOutput(PlanSchema);

export const plannerNode: GraphNode<any> = async (state) => {
  const messages = Array.isArray(state.messages) ? state.messages : [];

  if (messages.length === 0) {
    throw new Error("No messages found in state");
  }

  const response = await structureLLM.invoke([
    new SystemMessage(`
You are an AI travel planner.

Extract structured travel details from the full conversation.

Rules:
- infer missing values from previous conversation
- preserve previous trip context
- update values only if user changes them
- budget must be:
  cheap | mid | luxury

Return valid structured output only.`),
    ...messages,
  ]);

  console.log("PLANNER NODE", response);
  return { plan: response };
};
