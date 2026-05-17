"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const trip_route_1 = __importDefault(require("./routes/trip.route"));
const messages_1 = require("@langchain/core/messages");
const graph_1 = require("./graph/graph");
dotenv_1.default.config();
const app = (0, express_1.default)();
mongoose_1.default.set("strictQuery", true);
const connect = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGO_URI || "");
        console.log("Database is connected..");
    }
    catch (error) {
        console.log(error);
    }
};
const allowedOrigins = [
    "https://planova-web.onrender.com",
    "http://localhost:5173",
];
app.post("/trip", async (req, res) => {
    try {
        const { query } = req.body;
        const result = await graph_1.graph.invoke({
            messages: [new messages_1.HumanMessage(query)],
        });
        res.json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: "Something went wrong",
        });
    }
});
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/auth", auth_route_1.default);
app.use("/trips", trip_route_1.default);
//Error Middleware
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong";
    return res.status(errorStatus).send(errorMessage);
});
app.listen(5050, () => {
    connect();
    console.log("backend is running..");
});
