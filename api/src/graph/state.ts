// /graph/state.ts
import { StateSchema, MessagesValue, ReducedValue } from "@langchain/langgraph";
import { z } from "zod";

export const GraphState = new StateSchema({
  messages: MessagesValue, // this is correct
  plan: new ReducedValue(z.any().nullable(), {
    reducer: (_, update) => update,
  }),
  places: new ReducedValue(z.array(z.any()), {
    reducer: (_, update) => update ?? [],
  }),
});
