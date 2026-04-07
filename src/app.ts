import express, { Application, Request, Response } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

import reservationRoutes from "./routes/reservation";
import orderRoutes from "./routes/order";
import authRoutes from "./routes/auth";
import dashboardRoutes from "./routes/dashboard";
import menuRoutes from "./routes/menu";
import { authenticateAdmin } from "./middlewares/auth";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Lotus Blanc API",
      version: "1.0.0",
      description: "Lotus Restaurant Backend API",
    },
    servers: [{ url: "http://localhost:8001", description: "Development server" }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  // Ensure this ONLY points to files with correct swagger comments
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts"],
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);
const app: Application = express();

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:8001"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Public
app.use("/api/auth", authRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/orders", orderRoutes);

// Protected
app.use("/api/dashboard", authenticateAdmin, dashboardRoutes);
app.use("/api/admin/menu", authenticateAdmin, menuRoutes);

export default app;