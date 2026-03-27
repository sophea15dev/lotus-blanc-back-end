import express, { Application, Request, Response } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";

import swaggerSpec from "../src/config/swagger";
import userRoutes from "./routes/user.routes";

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root Route - Updated to show new admin endpoints
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    documentation: "/api-docs",
    endpoints: {
      users: "/api/users",
      admin: "/api/admin" // 2. Add to your status map
    }
  });
});

// Swagger Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API Routes
app.use("/api/users", userRoutes);

export default app;