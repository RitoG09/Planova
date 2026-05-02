"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphState = void 0;
const langgraph_1 = require("@langchain/langgraph");
exports.GraphState = langgraph_1.Annotation.Root({
    ...langgraph_1.MessagesAnnotation.spec,
    plan: (0, langgraph_1.Annotation)({
        reducer: (state, update) => update ?? state,
        default: () => null,
    }),
    places: (0, langgraph_1.Annotation)({
        reducer: (state, update) => update ?? state,
        default: () => [],
    }),
});
