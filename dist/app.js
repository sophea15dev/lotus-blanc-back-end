"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = __importDefault(require("./config/swagger"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const reservation_1 = __importDefault(require("./routes/reservation"));
const order_1 = __importDefault(require("./routes/order"));
// --- NEW IMPORTS ---
const auth_1 = __importDefault(require("./routes/auth"));
const dashboard_1 = __importDefault(require("./routes/dashboard"));
const auth_2 = require("./middlewares/auth");
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Swagger
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
// Root Route
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to Lotus Blanc API",
        documentation: "/api-docs",
    });
});
// API Routes
app.use("/api/auth", auth_1.default); // Login endpoint
app.use("/api/users", user_routes_1.default);
app.use("/api/reservations", reservation_1.default);
app.use("/api/orders", order_1.default);
// Protected Dashboard Route
// The 'authenticateAdmin' middleware ensures only logged-in users reach this
app.use("/api/dashboard", auth_2.authenticateAdmin, dashboard_1.default);
exports.default = app;
