import express, { Application, Request, Response } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";

// Corrected import path based on your folder structure
import swaggerSpec from "./config/swagger";
import userRoutes from "./routes/user.routes";
import reservationRoutes from "./routes/reservation";
import orderRoutes from "./routes/order";

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());

// Swagger Documentation - Serve this BEFORE the routes
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Root Route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to Lotus Blanc API",
    documentation: "/api-docs",
  });
});

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/orders", orderRoutes);
export default app;
