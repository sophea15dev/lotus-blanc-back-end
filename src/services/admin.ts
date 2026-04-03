import jwt from "jsonwebtoken";
import { authUtils } from "../utils/auth";

const mockAdmins = [
  {
    admin_id: 1,
    email: "lotusblanc@email.com",
    password: "$2b$10$NhczuX4bRgRRRvh9Ob/1sOVZbnG010AikmHmcAgjMB90/zD23VItm", // '123123'
  },
];

export const adminService = {
  login: async (email: string, pass: string) => {
    const admin = mockAdmins.find((a) => a.email === email);
    if (!admin) return null;

    const isMatch = await authUtils.comparePassword(pass, admin.password);
    if (!isMatch) return null;

    // Create token with explicit admin role
    const token = jwt.sign(
      { id: admin.admin_id, role: "admin" },
      process.env.JWT_SECRET || "lotus_blanc_secret_2026",
      { expiresIn: "1d" },
    );

    return {
      token,
      user: { id: admin.admin_id, email: admin.email, role: "admin" },
    };
  },
};
