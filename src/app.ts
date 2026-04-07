import express, { Application, Request, Response } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

// Import Routes
import userRoutes from "./routes/user.routes";
import reservationRoutes from "./routes/reservation";
import orderRoutes from "./routes/order";
import authRoutes from "./routes/auth";
import dashboardRoutes from "./routes/dashboard";
import menuRoutes from "./routes/menu";        // ← NEW: Add this line

import { authenticateAdmin } from "./middlewares/auth";

// ✅ IMPROVED Swagger Configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Lotus Blanc API",
      version: "1.0.0",
      description: "Lotus Restaurant Backend API",
    },
    servers: [
      {
        url: "http://localhost:8000",
        description: "Development server",
      },
    ],
  },
  apis: [
    "./src/routes/*.ts",
    "./src/routes/**/*.ts",
    "./src/**/*.ts",        // This will also scan menu.controller.ts for comments later
  ],
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

const app: Application = express();

// CORS Configuration
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Root Route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to Lotus Blanc API",
    documentation: "/api-docs",
  });
});

// ====================== PUBLIC ROUTES ======================
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/orders", orderRoutes);

// ====================== ADMIN PROTECTED ROUTES ======================
app.use("/api/dashboard", authenticateAdmin, dashboardRoutes);

// ✅ NEW: Menu Routes (Protected by authenticateAdmin)
app.use("/api/admin/menu", authenticateAdmin, menuRoutes);   // ← Added here

export default app;