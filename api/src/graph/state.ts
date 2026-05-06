import { StateSchema, MessagesValue, ReducedValue, Annotation } from "@langchain/langgraph";
import { z } from "zod";

export const GraphState = new StateSchema({
  messages: MessagesValue,
  plan: new ReducedValue(z.any().nullable(), {
    reducer: (_, update) => update,
  }),
  places: new ReducedValue(z.array(z.any()), {
    reducer: (_, update) => update ?? [],
  }),
  hotels: new ReducedValue(z.array(z.any()), {
    reducer: (_, update) => update ?? [],
  }),
});
