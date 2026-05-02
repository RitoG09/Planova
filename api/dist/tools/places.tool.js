"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlaces = void 0;
const tools_1 = require("@langchain/core/tools");
const zod_1 = __importDefault(require("zod"));
exports.getPlaces = (0, tools_1.tool)(async ({ location }) => {
    // mock for now
    return [
        { name: "Hidimba Temple" },
        { name: "Solang Valley" },
        { name: "Old Manali" },
    ];
}, {
    name: "getPlaces",
    description: "Get tourist places for a location",
    schema: zod_1.default.object({
        location: zod_1.default.string(),
    }),
});
