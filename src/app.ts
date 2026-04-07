import express, { Application, Request, Response } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

// Import Routes
import reservationRoutes from "./routes/reservation";
import orderRoutes from "./routes/order";
import authRoutes from "./routes/auth";
import dashboardRoutes from "./routes/dashboard";
import menuRoutes from "./routes/menu";

// Middleware
import { authenticateAdmin } from "./middlewares/auth";

// ✅ Swagger Configuration (FIXED WITH JWT)
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
        url: "http://localhost:8001",
        description: "Development server",
      },
    ],

    // 🔥 ADD THIS PART (VERY IMPORTANT)
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },

    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis: [
    "./src/routes/*.ts",
    "./src/controllers/*.ts",
    "./src/**/*.ts",
  ],
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

const app: Application = express();

// CORS Configuration
const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:8001"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
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
app.use("/api/reservations", reservationRoutes);
app.use("/api/orders", orderRoutes);

// ====================== ADMIN PROTECTED ROUTES ======================
app.use("/api/dashboard", authenticateAdmin, dashboardRoutes);
app.use("/api/admin/menu", authenticateAdmin, menuRoutes);

export default app;