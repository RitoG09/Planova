"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.graph = void 0;
const langgraph_1 = require("@langchain/langgraph");
const state_1 = require("./state");
const planner_agent_1 = require("../agents/planner.agent");
const places_agent_1 = require("../agents/places.agent");
const messages_1 = require("@langchain/core/messages");
exports.graph = new langgraph_1.StateGraph(state_1.GraphState)
    .addNode("planner", planner_agent_1.plannerNode)
    .addNode("places", places_agent_1.placesNode)
    .addEdge(langgraph_1.START, "planner")
    .addEdge("planner", "places")
    .addEdge("places", langgraph_1.END)
    .compile();
async function test() {
    const result = await exports.graph.invoke({
        messages: [
            new messages_1.HumanMessage("I want to go to Manali for 5 days with 5 people"),
        ],
    });
    console.log(result);
}
test();
