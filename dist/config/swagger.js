"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Lotus Blanc API",
            version: "1.0.0",
            description: "Restaurant Management API documentation",
        },
        servers: [
            {
                url: "http://localhost:8000",
                description: "Development server",
            },
        ],
    },
    // Ensure these paths point correctly to your src folder
    apis: ["./src/routes/*.ts", "./src/routes/**/*.ts"],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
exports.default = swaggerSpec;
