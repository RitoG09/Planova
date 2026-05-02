"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.plannerNode = void 0;
const messages_1 = require("@langchain/core/messages");
const llm_1 = require("../services/llm");
const plan_schema_1 = require("../schemas/plan.schema");
const plannerNode = async (state) => {
    const userMessage = state.message.at(-1);
    const response = await llm_1.llm.invoke([
        new messages_1.SystemMessage(`
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
    let parsed;
    try {
        parsed = plan_schema_1.PlanSchema.parse(JSON.parse(response.content));
    }
    catch (error) {
        throw new Error("Invalid planner output");
    }
    return { plan: parsed };
};
exports.plannerNode = plannerNode;
