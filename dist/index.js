"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const BASE_PORT = Number(process.env.PORT || 8000);
const startServer = (port) => {
    const server = app_1.default.listen(port, () => {
        console.log(`🚀 Server running on http://localhost:${port}`);
        console.log(`📖 Docs available at http://localhost:${port}/api-docs`);
    });
    server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.warn(`⚠️ Port ${port} in use, trying ${port + 1}...`);
            startServer(port + 1);
        }
        else {
            console.error('Server error:', err);
            process.exit(1);
        }
    });
};
startServer(BASE_PORT);
