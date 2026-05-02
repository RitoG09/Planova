import { StateGraph, START, END } from "@langchain/langgraph";
import { GraphState } from "./state";
import { plannerNode } from "../agents/planner.agent";
import { placesNode } from "../agents/places.agent";
import { HumanMessage } from "@langchain/core/messages";

export const graph = new StateGraph(GraphState)
  .addNode("planner_node", plannerNode)
  .addNode("places_node", placesNode)
  .addEdge(START, "planner_node")
  .addEdge("planner_node", "places_node")
  .addEdge("places_node", END)
  .compile();

async function test() {
  const result = await graph.invoke({
    messages: [
      new HumanMessage("I want to go to Manali for 5 days with 5 people"),
    ],
  });
  console.log(result);
}

test();
