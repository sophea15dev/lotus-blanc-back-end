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
        description: "Development server",
      },
    ],
  },
  // Ensure these paths point correctly to your src folder
  apis: ["./src/routes/*.ts", "./src/routes/**/*.ts"], 
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;