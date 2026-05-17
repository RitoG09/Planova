"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.llm = void 0;
const groq_1 = require("@langchain/groq");
exports.llm = new groq_1.ChatGroq({
    model: "llama-3.3-70b-versatile",
    temperature: 0,
    maxRetries: 2,
    apiKey: process.env.GROQ_API_KEY,
});
