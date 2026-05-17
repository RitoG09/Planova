import { Annotation, messagesStateReducer } from "@langchain/langgraph";
import { BaseMessage } from "@langchain/core/messages";

export const GraphState = Annotation.Root({
  messages: Annotation<BaseMessage[]>({
    reducer: messagesStateReducer,
    default: () => [],
  }),
  plan: Annotation<any>({
    reducer: (state: any, update: any) => update,
    default: () => null,
  }),
  places: Annotation<any[]>({
    reducer: (state: any[], update: any[]) => update ?? [],
    default: () => [],
  }),
  hotels: Annotation<any[]>({
    reducer: (state: any[], update: any[]) => update ?? [],
    default: () => [],
  }),
  weather: Annotation<any[]>({
    reducer: (state: any[], update: any[]) => update ?? [],
    default: () => [],
  }),
  itineraryResult: Annotation<any>({
    reducer: (state: any, update: any) => update ?? null,
    default: () => null,
  }),
});
