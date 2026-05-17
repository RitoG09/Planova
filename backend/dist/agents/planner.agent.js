"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.plannerNode = void 0;
const messages_1 = require("@langchain/core/messages");
const llm_1 = require("../services/llm");
const schema_1 = require("../schemas/schema");
const structureLLM = llm_1.llm.withStructuredOutput(schema_1.PlanSchema);
const plannerNode = async (state) => {
    const messages = Array.isArray(state.messages) ? state.messages : [];
    if (messages.length === 0) {
        throw new Error("No messages found in state");
    }
    const response = await structureLLM.invoke([
        new messages_1.SystemMessage(`
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
exports.plannerNode = plannerNode;
