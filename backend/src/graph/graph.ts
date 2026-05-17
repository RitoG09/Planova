import { StateGraph, START, END } from "@langchain/langgraph";
import { GraphState } from "./state";
import { plannerNode } from "../agents/planner.agent";
import { placesNode } from "../agents/places.agent";
import { HumanMessage } from "@langchain/core/messages";
import { hotelNode } from "../agents/hotels.agent";
import { weatherNode } from "../agents/weather.agent";
import { aggregatorNode } from "../agents/aggregator.agent";
import { MemorySaver } from "@langchain/langgraph-checkpoint";

const checkpointer = new MemorySaver();

export const graph = new StateGraph(GraphState)
  // nodes
  .addNode("planner_node", plannerNode)
  .addNode("places_node", placesNode)
  .addNode("hotels_node", hotelNode)
  .addNode("weather_node", weatherNode)
  .addNode("aggregator_node", aggregatorNode)
  //start
  .addEdge(START, "planner_node")
  // edges (parallel)
  .addEdge("planner_node", "places_node")
  .addEdge("planner_node", "hotels_node")
  .addEdge("planner_node", "weather_node")
  // edges (sequential)
  .addEdge("places_node", "aggregator_node")
  .addEdge("hotels_node", "aggregator_node")
  .addEdge("weather_node", "aggregator_node")
  //end
  .addEdge("aggregator_node", END)
  .compile({ checkpointer }) as any;

async function test() {
  const result = await graph.invoke(
    {
      messages: [
        new HumanMessage("make it luxury"),
      ],
    },
    {
      configurable: {
        thread_id: "user-1",
      },
    },
  );
  console.log(result);
}

test();
