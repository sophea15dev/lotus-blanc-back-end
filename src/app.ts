import express, { Application, Request, Response } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";

import swaggerSpec from "./config/swagger"; 
import userRoutes from "./routes/user.routes";
import reservationRoutes from "./routes/reservation"; 
import orderRoutes from "./routes/order"; 
// --- NEW IMPORTS ---
import authRoutes from "./routes/auth";
import dashboardRoutes from "./routes/dashboard";
import { authenticateAdmin } from "./middlewares/auth"; 

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Root Route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to Lotus Blanc API",
    documentation: "/api-docs",
  });
});

// API Routes
app.use("/api/auth", authRoutes); // Login endpoint
app.use("/api/users", userRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/orders", orderRoutes);

// Protected Dashboard Route
// The 'authenticateAdmin' middleware ensures only logged-in users reach this
app.use("/api/dashboard", authenticateAdmin, dashboardRoutes);

export default app;