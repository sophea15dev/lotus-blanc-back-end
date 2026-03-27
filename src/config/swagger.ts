import swaggerJsdoc from "swagger-jsdoc";

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
      },
    ],
  },
  // CRITICAL: Point this to where your routes are located
  apis: ["./src/routes/*.ts", "./dist/routes/*.js"], 
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;