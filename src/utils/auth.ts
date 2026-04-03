import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "lotus_blanc_secret_2026";

export const authUtils = {
  // Encrypt password before saving to DB
  hashPassword: async (password: string) => {
    return await bcrypt.hash(password, 10);
  },

  // Compare login password with DB hash
  comparePassword: async (password: string, hash: string) => {
    return await bcrypt.compare(password, hash);
  },

  // Create a token for the dashboard
  generateToken: (adminId: number) => {
    return jwt.sign({ id: adminId, role: "admin" }, JWT_SECRET, {
      expiresIn: "1d",
    });
  },
};
