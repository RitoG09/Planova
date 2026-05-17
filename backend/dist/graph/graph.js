"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.graph = void 0;
const langgraph_1 = require("@langchain/langgraph");
const state_1 = require("./state");
const planner_agent_1 = require("../agents/planner.agent");
const places_agent_1 = require("../agents/places.agent");
const messages_1 = require("@langchain/core/messages");
const hotels_agent_1 = require("../agents/hotels.agent");
const weather_agent_1 = require("../agents/weather.agent");
const aggregator_agent_1 = require("../agents/aggregator.agent");
const langgraph_checkpoint_1 = require("@langchain/langgraph-checkpoint");
const checkpointer = new langgraph_checkpoint_1.MemorySaver();
exports.graph = new langgraph_1.StateGraph(state_1.GraphState)
    // nodes
    .addNode("planner_node", planner_agent_1.plannerNode)
    .addNode("places_node", places_agent_1.placesNode)
    .addNode("hotels_node", hotels_agent_1.hotelNode)
    .addNode("weather_node", weather_agent_1.weatherNode)
    .addNode("aggregator_node", aggregator_agent_1.aggregatorNode)
    //start
    .addEdge(langgraph_1.START, "planner_node")
    // edges (parallel)
    .addEdge("planner_node", "places_node")
    .addEdge("planner_node", "hotels_node")
    .addEdge("planner_node", "weather_node")
    // edges (sequential)
    .addEdge("places_node", "aggregator_node")
    .addEdge("hotels_node", "aggregator_node")
    .addEdge("weather_node", "aggregator_node")
    //end
    .addEdge("aggregator_node", langgraph_1.END)
    .compile({ checkpointer });
async function test() {
    const result = await exports.graph.invoke({
        messages: [
            new messages_1.HumanMessage("make it luxury"),
        ],
    }, {
        configurable: {
            thread_id: "user-1",
        },
    });
    console.log(result);
}
test();
