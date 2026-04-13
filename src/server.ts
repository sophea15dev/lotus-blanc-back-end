import express, { Request, Response } from "express";
import cors from "cors";

const app = express();

// 1. MIDDLEWARE
app.use(cors()); // Allows React (5173) to talk to Node (8000)
app.use(express.json());

// 2. DATA
const bookings = [
  {
    id: 1,
    name: "Jean Dupont",
    date: "2026-04-02",
    time: "19:30",
    adults: 2,
    children: 2,
    status: "Arrived",
    table: "Table 12",
    isPreOrder: true,
  },
];

// 3. ROUTE
app.get("/api/bookings", (req, res) => {
  res.json([
    {
      id: 1,
      name: "Jean Dupont",
      time: "19:30",
      adults: 4,
      children: 0,
      status: "Arrived",
      table: "T1",
      isPreOrder: true,
    },
  ]);
});

// 4. START
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`✅ Backend TS running at http://localhost:${PORT}`);
});
