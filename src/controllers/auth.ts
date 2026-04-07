import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const adminLogin = (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  if (
    email === process.env.PGADMIN_EMAIL &&
    password === process.env.PGADMIN_PASSWORD
  ) {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error("JWT_SECRET is not defined in .env");
      return res.status(500).json({ message: "Server configuration error" });
    }

    const token = jwt.sign(
      { email, role: "admin" },
      secret,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
    );

    return res.status(200).json({ message: "Admin login successful", token });
  } else {
    return res.status(401).json({ message: "Invalid admin credentials" });
  }
};