"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphState = void 0;
const langgraph_1 = require("@langchain/langgraph");
exports.GraphState = langgraph_1.Annotation.Root({
    messages: (0, langgraph_1.Annotation)({
        reducer: langgraph_1.messagesStateReducer,
        default: () => [],
    }),
    plan: (0, langgraph_1.Annotation)({
        reducer: (state, update) => update,
        default: () => null,
    }),
    places: (0, langgraph_1.Annotation)({
        reducer: (state, update) => update ?? [],
        default: () => [],
    }),
    hotels: (0, langgraph_1.Annotation)({
        reducer: (state, update) => update ?? [],
        default: () => [],
    }),
    weather: (0, langgraph_1.Annotation)({
        reducer: (state, update) => update ?? [],
        default: () => [],
    }),
    itineraryResult: (0, langgraph_1.Annotation)({
        reducer: (state, update) => update ?? null,
        default: () => null,
    }),
});
